import React from 'react';
import './addingAgents.scss';
import { Spin,Steps } from 'antd';
import AgentForm from '../common/agentForm/agentForm.jsx'
const Step = Steps.Step;
// const AgentForm = AgentForm;
class AddingAgents extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                <Steps size="small" current={0}>
                    <Step title="1.填写信息" />
                    <Step title="2.成功添加" />
                </Steps>
                <AgentForm>
                    
                </AgentForm>
            </div>
        );
    }
}
export default AddingAgents;
