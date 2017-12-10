import React, {Component} from 'react';
import {Breadcrumb, Icon, Layout, Menu} from "antd";
import {Link, Redirect, Route} from "react-router-dom";
import LeftMenu from '../component/LeftMenu'
import menus, {rootPath, defaultPath} from '../menu'

const {Header, Content, Sider} = Layout;

export default class Dashboard extends Component {
    render() {
        return <Layout>
            <Header className="header" style={{position: 'fixed', width: '100%'}}>
            </Header>
            <Layout style={{marginTop: 64}}>
                <Sider width={200}
                       style={{
                           overflow: 'auto',
                           height: '100vh',
                           position: 'fixed',
                           left: 0,
                           background: '#fff'
                       }}>
                    <LeftMenu/>
                </Sider>
                <Layout style={{padding: '0 24px 24px', marginLeft: 200, background: '#f0f0f0'}}>
                    <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 680, marginTop: 24}}>
                        {
                            menus.map((menu, i) => {
                                if (menu.children) {
                                    return menu.children.map((childMenu, j) => {
                                        return childMenu.screens.map((screen, k) => <Route key={i + '_' + j + '_' + k}
                                                                                           path={rootPath + screen.path}
                                                                                           exact={screen.exact == null ? true : screen.exact}
                                                                                           component={screen.component}/>)
                                    })
                                } else {
                                    return menu.screens.map((screen, j) => <Route key={i + '_' + j}
                                                                                  path={rootPath + screen.path}
                                                                                  exact={screen.exact == null ? true : screen.exact}
                                                                                  component={screen.component}/>)
                                }
                            })
                        }
                        <Route exact path={rootPath} render={() =>
                            <Redirect exact from={rootPath} to={defaultPath}/>}/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    }
}