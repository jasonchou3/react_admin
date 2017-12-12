/*global getFieldDecorator history:true*/
/* eslint no-undef: "error" */
/*eslint no-restricted-globals: ["error", "event", "fdescribe"]*/

import React, {Component} from 'react';
import {Alert, Button, Checkbox, Divider, Form, Icon, Select, Input, Modal, Spin, Table} from 'antd'

const Option = Select.Option;
const FormItem = Form.Item;
export default class FormScreen extends Component {
    constructor(props) {
        super(...arguments)
        this.state = {
            data: {},
            errMsg: null,
            initErrMsg: null,
            loading: false,
            errMsgLoading: false,
            ...this.getInitState(props)
        };
    }

    componentDidMount() {
        if (this.isEditMode())
            this.getInitData('loading')
    }

    getInitState(props) {
        return {}
    }

    isEditMode() {
        return this.props.match.params && this.props.match.params.id
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({loading: true, errMsg: null});
                const res = await this.submitApi(values);
                if (res.isOk) {
                    history.back()
                } else {
                    this.setState({loading: false, errMsg: res.data.msg})
                }
            }
        });
    };

    async getInitData(loadingPropName) {
        this.setState({[loadingPropName]: true});
        const res = await this.getInitDataApi(this.props.match.params.id);
        if (res.isOk) {
            this.setState({[loadingPropName]: false, data: res.data.data, initErrMsg: null})
        } else {
            this.setState({[loadingPropName]: false, initErrMsg: res.data.msg})
        }
    }

    getInitDataApi(id) {
        return {
            isOk: true, data: {
                errcode: 0,
                data: {}
            }
        }
    }

    submitApi(values) {
        return {
            isOk: true
        }
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };

        return <Spin spinning={this.state.loading}>
            <Form onSubmit={this.handleSubmit} className="form-screen">

                {
                    this.getFields().map(field => {
                        let Component;
                        let props = field.props || {};
                        let options = field.options || {
                            rules: []
                        };

                        if (field.type) {
                            if (field.type === 'phone') {
                                field.component = 'input';
                                props = Object.assign({
                                    type: 'phone',
                                    maxLength: '11'
                                }, props);

                                options = Object.assign({
                                    rules: [
                                        {len: 11, message: '手机号长度必须为11位！'}
                                    ]
                                }, options.rules)
                            } else if (field.type === 'password') {
                                field.component = 'input';
                                props = Object.assign({
                                    type: 'password',
                                    maxLength: '20'
                                }, props);

                                options = Object.assign({
                                    rules: [
                                        {min: 7, message: '密码必须大于7位！'},
                                        {max: 20, message: '密码必须小于20位！'},
                                    ]
                                }, options.rules)
                            }
                        }

                        if (field.component === 'input') {
                            Component = Input;
                            if (field.required) {
                                options.rules.push({
                                    required: true, message: '请填写' + field.label + '!',
                                });
                            }

                            options.initialValue = this.state.data[field.name]
                        } else if (field.component === 'select') {
                            Component = Select;

                            //todo select required 未实现
                            if (field.required) {
                                options.rules.push({
                                    required: true, message: '请选择' + field.label + '!',
                                });
                            }

                            options.initialValue = this.state.data[field.name] != null ? this.state.data[field.name] + '' : field.selDefOpt + '';

                            props.children = [Object.keys(field.selOpts || {}).map(value => <Option
                                value={value}>{field.selOpts[value]}</Option>)]
                        }

                        return <FormItem
                            key={field.name}
                            {...formItemLayout}
                            label={field.label}>
                            {getFieldDecorator(field.name, options)(
                                <Component {...props}/>
                            )}

                        </FormItem>
                    })
                }
                {this.state.errMsg && <FormItem wrapperCol={{span: 18, offset: 6}}>
                    <Alert message={this.state.errMsg} type="error"/>
                </FormItem>}
                <FormItem wrapperCol={{span: 18, offset: 6}}>
                    <Button onClick={this.handleCancel}>取消</Button>
                    <Button type="primary" htmlType="submit">{this.isEditMode() ? '保存' : '新增'}</Button>
                </FormItem>
            </Form>

            <Modal title="数据请求失败"
                   visible={!!this.state.initErrMsg}
                   onOk={this.handleInitErrMsgModalOk}
                   confirmLoading={this.state.errMsgLoading}
                   okText={'重试'}
                   cancelText={'返回'}
                   onCancel={this.handleInitErrMsgModalCancel}>
                <p>{this.state.initErrMsg}</p>
            </Modal>
        </Spin>
    }

    handleInitErrMsgModalOk = async () => {
        await this.getInitData('errMsgLoading')
    };

    handleInitErrMsgModalCancel = async () => {
        history.back()
    };

    handleCancel = () => {
        history.back()
    };

    getFields() {
        return []
    }
}

export const maker = (path, {list, update, create, remove, request}) => {

    return Form.create()(class extends FormScreen {
        getFields() {
            return this.isEditMode() ? update.fields : create.fields
        }

        getInitDataApi(id) {
            return request.info(id)
        }

        submitApi(values) {
            if (this.isEditMode())
                return request.update(this.props.match.params.id, values);
            return request.create(values)
        }
    })
};