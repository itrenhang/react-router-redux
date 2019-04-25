import React from 'react';
import { Modal, Button, Icon, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, AutoComplete,Radio,message  } from 'antd';
import { number } from 'prop-types';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;



class Addcontact extends React.Component {

  constructor() {
    super()
  }
  state = {
    loading: false,
    visible: false,
    confirmDirty: false,
    autoCompleteResult: [],
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  //确定
  handleOk = (e) => {
    console.log(4)
    e.preventDefault();
    this.setState({ loading: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
          message.success('添加成功')
        }, 1000);
      }else{
        this.setState({ loading: false });
      }
    });
  }
  // 退出
  handleCancel = () => {
    console.log(3)
    this.setState({ visible: false });
  }




  handleConfirmBlur = (e) => {
    console.log(1)
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }



  render() {
    const { visible, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
      },
    };

    return (
      <div>
        <div className='ant-form-item-control-wrapper ant-col-xs-20 ant-col-sm-24 addinvoice' type="primary" onClick={this.showModal}>
          <Icon type="plus" /><span>添加</span>


        </div>

        <Modal
          visible={visible}
          title="添加联系人"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
                </Button>,
          ]}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className="agent-form" labelAlign="left" style={{paddingTop:'0'}}>

            <Form.Item
              label="姓名"
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: '请输入姓名', max:16,min:2
                  }],
              })(
                <Input placeholder="姓名" />
              )}
            </Form.Item>
            <Form.Item
              label="职位"
            >
              {getFieldDecorator('position', {
                rules: [
                  {
                    required: true, message: '请输入职位', 
                  }],
              })(
                <Input placeholder="职位" />
              )}
            </Form.Item>
            <Form.Item
              label="手机号"
            >
              {getFieldDecorator('phone', {
                rules: [
                  {
                    type:'number',required: true, message: '请输入正确手机号码', len: 11
                  }],
              })(
                <Input placeholder="手机号" />
              )}
            </Form.Item>

            

          </Form>
        </Modal>
      </div>
    );
  }




}
Addcontact = Form.create({ name: 'register' })(Addcontact)

export default Addcontact;