import {http} from './http'
import {maker as tableMaker} from "../component/TableScreen";
import {maker as editMaker} from "../component/FormScreen";

export class RestModel {
    constructor(resource, delegate = {}, rootPath = '/api/admin') {
        this.path = rootPath + '/' + resource;
        this.delegate = delegate;
    }

    async list(params) {
        if (this.delegate.getBefore)
            params = this.delegate.getBefore(params);

        let res = await http.get(this.path, {params});

        if (res.isOk) {
            res.data.data.list.map((item, i) => item.key = item.id)
        }

        if (this.delegate.getAfter)
            res = this.delegate.getAfter(res);

        return res
    }

    async info(id, params) {
        if (this.delegate.infoBefore)
            params = this.delegate.infoBefore(params);

        let res = await http.get(this.path + '/' + id, {params});
        if (this.delegate.infoAfter)
            res = this.delegate.infoAfter(res);
        return res
    }

    async create(data) {
        if (this.delegate.postBefore)
            data = this.delegate.postBefore(data);
        let res = await http.post(this.path, {data});
        if (this.delegate.postAfter)
            res = this.delegate.postAfter(res);
        return res
    }

    async update(id, data) {
        if (this.delegate.putBefore)
            data = this.delegate.putBefore(...arguments);

        let res = await http.put(this.path + '/' + id, {data});
        if (this.delegate.putAfter)
            res = this.delegate.putAfter(res);
        return res
    }

    async remove(id, params) {
        if (this.delegate.removeBefore)
            params = this.delegate.removeBefore(params);

        let res = await http.delete(this.path + '/' + id, {params});
        if (this.delegate.removeAfter)
            res = this.delegate.removeAfter(res);
        return res
    }
}


export function resource(path, ListScreen, EditScreen, CreateScreen) {
    const screens = [];

    if (ListScreen) {
        screens.push({
            path,
            exact: true,
            component: ListScreen
        })
    }

    if (EditScreen) {
        screens.push({
            path: path + '/update/:id',
            exact: true,
            component: EditScreen
        })
    }
    if (CreateScreen) {
        screens.push({
            path: path + '/create',
            exact: true,
            component: CreateScreen
        })
    }

    return {
        screens,
        title: screens[0].component.title
    }
}

export function resourceMaker(path, setting) {
    let tableComponent, updateComponent, createComponent;
    if (setting.list)
        tableComponent = tableMaker(path, setting);

    if (setting.update)
        updateComponent = editMaker(path, setting);

    if (setting.create)
        createComponent = editMaker(path, setting);

    return resource(path, tableComponent, updateComponent, createComponent)
}