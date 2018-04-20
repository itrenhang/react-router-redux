import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootRedux from './src/store'
import { HashRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import './src/css/app.css';
import routerList from './src/utils/routerList.js';

//创建状态树和设置

//生成状态树对象
const store = createStore(rootRedux);

class Main extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={routerList.Index} />
                    <Route path='/index' component={routerList.Index} />
                    <Route path='/login' component={routerList.Login} />
                    <Route path='/modify' component={routerList.Modify} />
                </Switch>
            </Router>
        )
    }
};

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>
    , document.getElementById("app"));

if (module.hot) {
    module.hot.accept();
}