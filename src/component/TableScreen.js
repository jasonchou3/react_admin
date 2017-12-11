import React, {Component} from 'react';
import {Alert, Button, Col, Divider, Modal, Row, Table} from 'antd'
import {rootPath} from "../menu";

export default class TableScreen extends Component {
    constructor(props) {
        super(...arguments)
        this.state = {
            list: [],
            total: 0,
            current: 1,
            loading: false,
            toDeleteRecord: null,
            deleteErrMsg: null,
            deleteLoading: false,
            ...this.getInitState(props)
        };
    }

    async componentDidMount() {
        await this.getInitData()
    }

    getInitState(props) {
        return {}
    }

    render() {
        return <div>
            <Row>
                <Col span={20}>{this.createAction() &&
                <Button type="primary"  {...this.createAction()}>新增</Button>}
                </Col>
                <Col span={4} style={{textAlign: 'right'}}>共有{this.state.total}条数据</Col>
            </Row>
            <Row>
                <Table columns={this.getColumns()} dataSource={this.state.list} loading={this.state.loading}
                       pagination={this.getPagination()}
                       onChange={this.onChange}/>
            </Row>

            <Modal title="确定删除"
                   visible={!!this.state.toDeleteRecord}
                   onOk={this.handleDeleteRecordModalOk}
                   confirmLoading={this.state.deleteLoading}
                   okText={'删除'}
                   cancelText={'取消'}
                   onCancel={() => this.setState({toDeleteRecord: null})}>
                <p>{this.state.toDeleteRecord ? '正在删除： ' + this.getDeleteRecordMsg(this.state.toDeleteRecord) + '，本操作不可逆，是否删除？' : null}</p>
                {this.state.deleteErrMsg && <Alert message={this.state.deleteErrMsg} type="error"/>}
            </Modal>
        </div>
    }

    onChange = async (pagination, filters, sorter) => {
        await this.getData(pagination, filters, sorter)
    };

    async getInitData() {
        await this.getData({current: this.state.current}, {}, {})
    }

    async getData(pagination, filters, sorter) {
        this.setState({loading: true});
        const res = await this.listDataApi(pagination, filters, sorter)
        if (res.isOk) {

            this.setState({
                loading: false,
                list: res.data.data.list,
                current: pagination.current,
                total: res.data.data.count
            })
        } else {
            this.setState({loading: false})
        }
    }

    listDataApi(pagination, filters, sorter) {
        return {
            isOk: true, data: {
                errcode: 0,
                data: {
                    list: [],
                    count: 0
                }
            }
        }
    }

    getPagination() {
        return {
            defaultCurrent: 1,
            total: this.state.total
        }
    }

    getColumns() {
        return [this.getIdColumn()].concat(this.getCustomColumns().concat(this.getActionsColumn()))
    }

    getCustomColumns() {
        return []
    }

    getActionsColumn() {
        return {
            title: '操作',
            key: 'action',
            width: 100,
            render: (text, record) => {
                const removeSetting = this.removeAction(record);
                return <span>
                    {removeSetting &&
                    <a {...this.removeAction(record)} onClick={() => this.setState({toDeleteRecord: record})}>删除</a>}
                    <Divider type="vertical"/>
                    {this.updateAction(record) && <a {...this.updateAction(record)}>编辑</a>}
            </span>
            }
        }
    }

    handleDeleteRecordModalOk = async () => {
        this.setState({deleteLoading: true});

        const res = await this.removeApi(this.state.toDeleteRecord);

        if (res.isOk) {
            this.setState({toDeleteRecord: null, deleteLoading: false});
            await this.getInitData()
        } else {
            this.setState({deleteLoading: false, deleteErrMsg: res.data.msg})
        }
    };

    removeApi(record) {
        return {isOk: true}
    }

    getDeleteRecordMsg(record) {
        return record.name
    }

    getIdColumn() {
        return {
            title: 'id',
            dataIndex: 'id',
            width: 100
        }
    }

    createAction() {
        return {
            href: '#create',
        }
    }

    removeAction(record) {
        return true
    }

    updateAction(record) {
        return {
            href: '#update/' + record.id,
        }
    }
}

export const maker = (path, {list, update, create, remove, request}) => {
    const {columns, title} = list;

    return class extends TableScreen {
        static title = title;

        getCustomColumns() {
            return columns
        }

        listDataApi(pagination, filters, sorter) {
            return request.list()
        }

        removeApi(record) {
            return request.remove(record.id)
        }

        removeAction(record) {
            return remove && remove(record)
        }

        updateAction(record) {
            if (update)
                return {
                    href: '#' + rootPath + path + '/update/' + record.id,
                }
        }

        createAction() {
            if (create)
                return {
                    href: '#' + rootPath + path + '/create',
                }
        }
    }
};