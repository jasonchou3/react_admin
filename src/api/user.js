import {http} from '../util/http'


export const getUsers = async () => {
    const res = await http.get('/api/admin/users');
    if (res.isOk) {
        res.data.data.list.map((item, i) => item.key = item.id)
    }

    return res
};