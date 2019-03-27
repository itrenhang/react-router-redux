import React from 'react';
import { Route, Switch, Link } from "react-router-dom"
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
class NbTabList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    onChange = (activeKey) => {
        this.props.onChange('switch',activeKey)
    }

    onEdit = (targetKey, action) => {
        this.props.onChange(action,targetKey)
    }

    getTabList() {
        let list = [];
        let listData = this.props.listData;
        for (let key in listData) {
            const TabCon = listData[key].component;
            list.push(<TabPane tab={listData[key].name} key={listData[key].path} closable={listData[key].closable}>
                {<TabCon />}
            </TabPane>)
        }
        return list;
    }
    render() {
        return (
            <Tabs
                hideAdd
                onChange={this.onChange}
                activeKey={this.props.tabActiveKey}
                type="editable-card"
                onEdit={this.onEdit}
            >
                {
                    this.getTabList()
                }
            </Tabs>
        );
    }
}
export default NbTabList;