import React, {Component} from 'react';
import {Breadcrumb, Icon, Layout, Menu} from "antd";

const SubMenu = Menu.SubMenu;
const {Header, Content, Sider} = Layout;

export default class Dashboard extends Component {
    state = {
        collapsed: false,
    }

    onSelect = ({item, key, selectedKeys}) => {
        console.log(item, key, selectedKeys)
    }

    render() {
        return <Layout>
            <Header className="header" style={{position: 'fixed', width: '100%'}}>
                1231
            </Header>
            <Layout style={{marginTop: 64}}>
                <Sider width={200}
                       style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0, background: '#fff'}}>

                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        style={{height: '100%', borderRight: 0}}
                        inlineCollapsed={this.state.collapsed}
                        onSelect={this.onSelect}
                    >

                        <Menu.Item key="1">
                            <Icon type="pie-chart"/>
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop"/>
                            <span>Option 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="inbox"/>
                            <span>Option 3</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="mail"/><span>Navigation One</span></span>}>
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore"/><span>Navigation Two</span></span>}>
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px', marginLeft: 200}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                        <div style={{height: 10000}}></div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    }
}