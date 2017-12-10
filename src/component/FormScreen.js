/*global getFieldDecorator:true*/
/* eslint no-undef: "error" */
import React, {Component} from 'react';
import {Button, Checkbox, Divider, Form, Icon, Input, Table} from 'antd'

const FormItem = Form.Item;
export default class FormScreen extends Component {
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
        // this.getData({current: 1}, {}, {})
    }

    getInitState(props) {
        return {}
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return <Form onSubmit={this.handleSubmit} className="login-form" style={{width: 600}}>
            <FormItem>
                {getFieldDecorator('userName', {
                    rules: [{required: true, message: 'Please input your username!'}],
                })(
                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                    rules: [{required: true, message: 'Please input your Password!'}],
                })(
                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                           placeholder="Password"/>
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(
                    <Checkbox>Remember me</Checkbox>
                )}
                <a className="login-form-forgot" href="">Forgot password</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <a href="">register now!</a>
            </FormItem>
        </Form>
    }
}