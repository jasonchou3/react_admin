import React, {Component} from 'react';
import TableScreen from "../../component/TableScreen";
import {getUsers} from '../../api/user'

export default class UserList extends TableScreen {
    getCustomColumns() {
        return [{
            title: '昵称',
            dataIndex: 'username',
            width: 150,
            render: text => <a href="#">{text}</a>,
        }, {
            title: '手机',
            dataIndex: 'phone',
            width: 70,
        }, {
            title: '性别',
            dataIndex: 'gender',
            width: 70,
        }]
    }

    getDataApi(pagination, filters, sorter) {
        return getUsers()
    }

    deleteAction(record) {
        return {
            href: '#delete/' + record.id,
        }
    }

    editAction(record) {
        return {
            href: '#/dashboard/users/edit/' + record.id,
        }
    }
}