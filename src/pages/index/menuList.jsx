import React from 'react';
import { Menu, Icon } from 'antd';
import routers from '../../router/routerList.js';
import { getRouterHash } from '../../utils/getRouterHash';
const SubMenu = Menu.SubMenu;
class NbMenuList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.selectMenu({ key: routers[0].path });
    }
    state = {
        routerHash: getRouterHash(routers)
    }
    // menu导航选中状态
    selectMenu(item, isInfo) {
        let key = item.key;
        this.props.selectMenu(key, { [key]: this.state.routerHash[key] });
    }
    // 获取menu导航菜单列表
    getList() {
        if (!routers) return false;
        return routers.map((route, index) => {
            if (route.children) {
                return (<SubMenu
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
                return (<Menu.Item key={route.path}>
                    <Icon type={route.icon} />
                    <span className="nav-text">{route.name}</span>
                </Menu.Item>)
            }
        })
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