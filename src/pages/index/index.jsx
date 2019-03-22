import React from 'react';
import {Switch, Link,withRouter} from "react-router-dom"
import { connect } from 'react-redux';
import './index.css'

class Index extends React.Component {
    constructor(props,context){
        super(props,context)
    }
    lishFn(){
        let data = this.state.list;
        const arr = [];
        data.map((item,index)=>{
            arr.push(
                <div>
                    {item}
                </div>
            )
        })
        return arr
    }
    render() {
        return (
            <div className="back">
                <h1 className="title">react+react-router Example</h1>
                {!this.props.isLogin?
                <Link to={'/login'}>登录</Link>
                :
                <span>登录成功</span>
                }
                <br/>
                <Link to={'/modify'}>设置</Link>
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
var IndexReactRedux = connect(mapStateToProps,mapDispatchToProps)(Index);


//导出组件
export default IndexReactRedux;
