import {resourceMaker} from "./lib/rest";

const menus = [
    {
        children: [
            resourceMaker('/users', require('./menu/user/user')),
            resourceMaker('/ins/users', require('./menu/user/ins_user'))
        ],
        title: '用户管理',

    }
];

export default menus

export const rootPath = '/dashboard';
export const defaultPath = rootPath + '/users';
