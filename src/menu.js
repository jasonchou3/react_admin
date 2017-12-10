import UserList from './screen/user/UserList'
import EditUser from './screen/user/EditUser'

const menus = [
    {
        children: [{
            title: '注册用户管理',
            screens: [
                {
                    path: '/users',
                    exact: true,
                    component: UserList
                },
                {
                    path: '/users/edit/:id',
                    exact: true,
                    component: EditUser
                }
            ]
        }],
        title: '用户管理',

    }, {
        title: '注册用户2',
        screens: [
            {
                path: '/users2',
                exact: true,
                component: UserList
            }
        ]
    }
];

export default menus

export const rootPath = '/dashboard';
export const defaultPath = rootPath + '/users';