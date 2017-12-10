import React, {Component} from 'react';
import {getUsers} from '../../api/user'
import FormScreen from "../../component/FormScreen";
import {Form} from "antd";

class EditUser extends FormScreen {

}

export default Form.create()(EditUser)