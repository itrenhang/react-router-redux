import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from "react-router-dom";
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
class NbTabList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    onChange = (activeKey) => {
        this.props.onChange('switch', activeKey)
    }

    onEdit = (targetKey, action) => {
        this.props.onChange(action, targetKey)
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

function mapStateToProps(state) {
    return {
        listData: state.listData
    }
}
function mapDispatchToProps(dispatch) {
    return {
       
    }
}

//封装传递state和dispatch
var NbTabListRedux = connect(mapStateToProps, mapDispatchToProps)(NbTabList);

//导出组件
export default withRouter(NbTabListRedux);