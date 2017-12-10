import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Icon, Menu} from "antd";
import {withRouter} from 'react-router'
import menus, {rootPath} from '../menu'
import {matchPath} from 'react-router'

const SubMenu = Menu.SubMenu;


export default withRouter(class LeftMenu extends Component {
    state = {
        collapsed: false,
        selectedKeys: [],
        openKeys: [],
    };

    componentWillReceiveProps(nextProps) {
        const {openKeys, selectedKeys = []} = this.getSelected(nextProps)

        const newOpenKeys = [...this.state.openKeys];
        if (openKeys && openKeys.length) {
            const index = this.state.openKeys.findIndex(key => key === openKeys[0]);

            if (index === -1) {
                newOpenKeys.push(openKeys[0])
            }
        }

        this.setState({selectedKeys, openKeys: newOpenKeys})
    }


    onOpenChange = (openKeys) => {
        this.setState({openKeys})
    };

    render() {
        return <Menu
            mode="inline"
            style={{height: '100%', borderRight: 0}}
            inlineCollapsed={this.state.collapsed}
            selectedKeys={this.state.selectedKeys}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
        >
            {menus.map((menu, i) => {
                if (menu.children) {
                    return <SubMenu key={i}
                                    title={<span><Icon type="mail"/><span>{menu.title}</span></span>}>
                        {menu.children.map((menu, j) =>
                            <Menu.Item key={i + '_' + j}>
                                <Link to={this.getMenuPath(menu)}>
                                    {menu.title}
                                </Link>
                            </Menu.Item>
                        )}
                    </SubMenu>
                }

                return <Menu.Item key={i}>
                    <Link to={this.getMenuPath(menu)}>
                        <Icon type="desktop"/>
                        <span>{menu.title}</span>
                    </Link>
                </Menu.Item>
            })}
        </Menu>
    }

    getMenuPath(menu) {
        if (menu.screens && menu.screens.length)
            return rootPath + menu.screens[0].path
    }

    isSelected(menu, path) {
        return menu.screens.find(screen => {
            return matchPath(path, {
                path: rootPath + screen.path,
                exact: screen.exact
            })
        })
    }

    getSelected(nextProps) {
        for (let i = 0; i < menus.length; i++) {
            let menu = menus[i];
            if (menu.children) {
                for (let j = 0; j < menu.children.length; j++) {
                    const childMenu = menu.children[j];
                    if (this.isSelected(childMenu, nextProps.location.pathname)) {
                        return {
                            selectedKeys: [i + '_' + j],
                            openKeys: [i + '']
                        }
                    }
                }
            } else {
                if (this.isSelected(menu, nextProps.location.pathname)) {
                    return {
                        selectedKeys: [i + ''],
                        openKeys: []
                    }
                }
            }
        }

        return {}
    }
})
