import React from 'react';
import './loading.css';
import { Spin } from 'antd';
class Loading extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render(){
        return (
            <div className="loading_container">
                <Spin tip="Loading..."></Spin>
            </div>
        );
    }
}
export default Loading;
