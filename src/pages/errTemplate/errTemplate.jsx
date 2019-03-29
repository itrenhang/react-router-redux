import React from 'react';
import './errTemplate.css';
import { Spin } from 'antd';
class ErrTemplate extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render(){
        return (
            <div className="err_container">
                页面未找到
            </div>
        );
    }
}
export default ErrTemplate;
