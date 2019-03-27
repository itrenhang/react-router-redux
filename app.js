import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootRedux from './src/store'
import { HashRouter,Route,Switch,Redirect} from "react-router-dom";
// import { HashRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import './src/static/css/app.css';
import IndexContainer from './src/pages/index/index.jsx';
 // LocaleProvider  国际化
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
//创建状态树和设置

//生成状态树对象
const store = createStore(rootRedux);

class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route  path='/index' component={IndexContainer} />
                <Redirect to="/index" />
            </Switch>
        )
    }
};

ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <Provider store={store}>
            <HashRouter>
                <Main />
            </HashRouter>
        </Provider>
    </LocaleProvider>
    , document.getElementById("app"));

if (module.hot) {
    module.hot.accept();
}