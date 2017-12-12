import React, {Component} from 'react';
import {users} from '../../api/user'

const genderOpts = {
    1: '男',
    0: '女',
    '-1': '未知',
};

const roleOpts = {
    0: '用户',
    10: '员工',
    1000: '管理员',
    10000: '超级管理员',
};

export const request = users;
export const list = {
    title: '注册用户管理',
    columns: [{
        title: '昵称',
        dataIndex: 'username',
        width: 150,
        render: text => <a href="#">{text}</a>,
    }, {
        title: '手机',
        dataIndex: 'phone',
        width: 70,
        sorter: true
    }, {
        title: '性别',
        dataIndex: 'gender',
        width: 70,
        sorter: true,
        render: v => {
            return genderOpts[v]
        }
    }, {
        title: '身份',
        dataIndex: 'role',
        width: 70,
        sorter: true,
        render: v => {
            return roleOpts[v]
        }
    }]
};

export const update = {
    fields: [{
        name: 'username',
        label: '用户名',
        component: 'input',
        required: true
    }, {
        name: 'phone',
        label: '手机号',
        type: 'phone',
        required: true
    }, {
        name: 'role',
        label: '身份',
        component: 'select',
        required: true,
        selOpts: roleOpts,
        selDefOpt: 0
    },{
        name: 'password',
        label: '密码',
        type: 'password',
    },
    ]
};

export const create = update;

export const remove = () => {
    return true
};