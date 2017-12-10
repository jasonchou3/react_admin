import React, {Component} from 'react';
import {Divider, Table} from 'antd'

export default class TableScreen extends Component {
    constructor(props) {
        super(...arguments)
        this.state = {
            list: [],
            total: 0,
            loading: false,
            ...this.getInitState(props)
        };
    }

    componentDidMount() {
        this.getData({current: 1}, {}, {})
    }

    getInitState(props) {
        return {}
    }

    render() {
        return <Table columns={this.getColumns()} dataSource={this.state.list} loading={this.state.loading}
                      pagination={this.getPagination()}
                      onChange={this.onChange}/>
    }

    onChange = (pagination, filters, sorter) => {
        this.getData(pagination, filters, sorter)
    };


    async getData(pagination, filters, sorter) {
        this.setState({loading: true});
        const res = await this.getDataApi(pagination, filters, sorter)
        if (res.isOk) {

            this.setState({loading: false, list: res.data.data.list, count: res.data.data.count})
        } else {
            this.setState({loading: false})
        }
    }

    getDataApi(pagination, filters, sorter) {
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
            render: (text, record) => (
                <span>
                    {this.deleteAction(record) && <a {...this.deleteAction(record)}>删除</a>}
                    <Divider type="vertical"/>
                    {this.editAction(record) && <a {...this.editAction(record)}>编辑</a>}
            </span>)
        }
    }

    getIdColumn() {
        return {
            title: 'id',
            dataIndex: 'id',
            width: 100
        }
    }

    // deleteAction(record) {
    //     return {
    //         href: '#delete/' + record.id,
    //     }
    // }

    // editAction(record) {
    //     return {
    //         href: '#edit/' + record.id,
    //     }
    // }
}