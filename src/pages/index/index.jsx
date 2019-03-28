import React from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import './index.css'
import { Icon, Button, Layout } from 'antd';
import NbTabList from './tabList.jsx';
import NbMenuList from './menuList.jsx';
import img1 from '../../static/images/logo.png';
const {
    Header, Content, Footer, Sider,
} = Layout;
class Index extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.selectTab = this.selectTab.bind(this);
        this.selectMenu = this.selectMenu.bind(this);
    }
    state = {
        collapsed: false,
        listData: {},
        tabActiveKey: null
    };
    // 切换menu导航收起展开状态
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    // menu导航选中状态
    selectMenu(key, item) {
        this.setState({
            listData: Object.assign(this.state.listData, item),
            tabActiveKey: key
        });
    }
    // 子组件tab选择
    selectTab(type, activeKey) {
        switch (type) {
            case 'switch':
                this.setState({
                    tabActiveKey: activeKey
                });
                break;
            case 'remove':
                let listDate = this.state.listData;
                delete listDate[activeKey];
                let keyList = Object.keys(listDate);
                this.setState({
                    listData: listDate,
                    tabActiveKey: keyList[keyList.length - 1]
                });
                break;
            default:
                break;
        }
    }
    render() {
        return (
            <div className="back">
                <Layout>
                    <Sider style={{
                        overflow: 'auto', height: '100vh', position: 'fixed', left: 0,zIndex:100
                    }}
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo" style={{ width: this.state.collapsed ? 80 : 200 }}>
                            <Link to="/">
                                <img src={img1} alt="" style={{ width: '100px' }} />
                            </Link>
                        </div>
                        <div className="logoSeize" />
                        <NbMenuList selectMenu={this.selectMenu} tabActiveKey={this.state.tabActiveKey}></NbMenuList>
                    </Sider>
                    <Layout style={{ marginLeft: this.state.collapsed ? 80 : 200 }}>
                        <Header className="con_Header" style={{ paddingLeft: this.state.collapsed ? 80 : 200 }}>
                            <div className="NBHeaderFlex lrflex">
                                <div className="NBHeaderFlex">
                                    <Icon
                                        className="trigger"
                                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.toggle}
                                    />
                                    <div className="NBHeaderFlex">
                                        <p>姓名：刘丽</p>
                                        <p>职位：销售</p>
                                    </div>
                                </div>
                                <div className="NBHeaderFlex">
                                    <p>修改密码</p>
                                    <p>退出</p>
                                </div>
                            </div>
                        </Header>
                        <div style={{ height: "40px" }}></div>
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
                                <NbTabList
                                    listData={this.state.listData}
                                    tabActiveKey={this.state.tabActiveKey}
                                    onChange={this.selectTab}
                                >
                                </NbTabList>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            nobook
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        isLogin: state.isLogin
    };
}
// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {};
}
// 封装传递state和dispatch
var IndexReactRedux = connect(mapStateToProps, mapDispatchToProps)(Index);
//导出组件
export default IndexReactRedux;
