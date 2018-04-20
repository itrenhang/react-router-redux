import React from 'react';
import Bundle from './bundle.js';
// page
import IndexContainer from '../pages/index/index.jsx';
import LoginContainer from '../pages/login/login.jsx';
import ModifyContainer from '../pages/modify/modify.jsx';
// 按需加载 包装
const Index = () => (<Bundle load={IndexContainer}>{(Index) => <Index />}</Bundle>)
const Login = () => (<Bundle load={LoginContainer}>{(Login) => <Login />}</Bundle>)
const Modify = () => (<Bundle load={ModifyContainer}>{(Modify) => <Modify />}</Bundle>)

export default {
    Index:Index,
    Login:Login,
    Modify:Modify
}
