import React, {Component} from 'react';
import {ins_users} from '../../api/user'

export const request = ins_users;
export const list = {
    title: 'ins用户管理',
    columns: [{
        title: '昵称',
        dataIndex: 'username',
        width: 150,
        render: text => <a href="#">{text}</a>,
    }, {
        title: 'insId',
        dataIndex: 'insId',
        width: 70,
    }, {
        title: '最后爬取时间',
        dataIndex: 'lastCrawlAt',
        width: 90,
        sorter: true,
    }]
};

export const update = {
    fields: [{
        name: 'username',
        label: '用户名',
        component: 'input',
    }, {
        name: 'insId',
        label: 'insId',
        component: 'input',
        required: true
    },
    ]
};

export const create = update;

export const remove = () => {
    return true
};