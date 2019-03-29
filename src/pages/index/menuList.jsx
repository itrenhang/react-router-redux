import React from 'react';
import { Menu, Icon } from 'antd';
import routers from '../../router/routerList.js';
import { getRouterHash } from '../../utils/getRouterHash';
const SubMenu = Menu.SubMenu;
const HashRouters = getRouterHash(routers)
class NbMenuList extends React.Component {
    constructor(props, context) {
        super(props, context);
        let pathKey = props.pathTo ? HashRouters[props.pathTo] ? props.pathTo : '404' : routers[0].path;
        this.selectMenu({ key: routers[0].path });
        this.selectMenu({ key: pathKey });
    }
    state = {
        routerHash: HashRouters
    }
    // menu导航选中状态
    selectMenu(item, isInfo) {
        let key = item.key;
        this.props.selectMenu(key, { [key]: this.state.routerHash[key] });
    }
    // 获取menu导航菜单列表
    getList() {
        if (!routers) return false;
        let menuList = [];
        for (let route of routers) {
            if(route.hidden){
                continue;
            }
            if (route.children) {
                menuList.push(<SubMenu
                    key={route.path}
                    title={<span><Icon type={route.icon} /><span>{route.name}</span></span>}
                >
                    {route.children.map((childrenRoute, childrenIndex) => {

                        return (<Menu.Item key={childrenRoute.path}>
                            <Icon type={childrenRoute.icon} />
                            <span className="nav-text">{childrenRoute.name}</span>
                        </Menu.Item>)
                    })}
                </SubMenu>)
            } else {
                menuList.push(<Menu.Item key={route.path}>
                    <Icon type={route.icon} />
                    <span className="nav-text">{route.name}</span>
                </Menu.Item>)
            }
        }
        return menuList;
    }
    render() {
        return (
            <Menu
                theme="dark"
                mode="inline"
                onSelect={this.selectMenu.bind(this)}
                selectedKeys={[this.props.tabActiveKey]}
            >
                {this.getList()}
            </Menu>
        )
    }
}
export default NbMenuList;