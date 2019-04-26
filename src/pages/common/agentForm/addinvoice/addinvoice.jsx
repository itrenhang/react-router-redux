import React from 'react';
import { Modal, Button, Icon, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, AutoComplete, Radio, message, Upload } from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const uploadImg = {
  name: 'Content-Type',// 发到后台的文件参数名
  action: 'http//admin.nobook.cc/v1/upload/img',//上传的地址
  accept:'.png,.jpg',
  headers: {
    'Content-Type': 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


class Addinvoice extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      visible: false,
      confirmDirty: false,
      autoCompleteResult: [],
      taxpayerType: '1', // 纳税人类型 1是一般纳税人 2是小规模纳税人
      institutionalCode: '', // 统一机构代码
      invoiceTitle: '', // 开票抬头
      bank: '', // 开户银行
      name: '', // 开户姓名
      bankAccount: '', // 银行账户
    }

  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  //确定
  handleOk = (e) => {
    let invoiceForm = {
      taxpayerType: this.state.taxpayerType,
      institutionalCode: this.state.institutionalCode,
      invoiceTitle: this.state.invoiceTitle,
      bank: this.state.bank,
      name: this.state.name,
      bankAccount: this.state.bankAccount,
    };
    e.preventDefault();
    

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({ loading: true });
    this.props.getChildData(invoiceForm)
    this.setState({ loading: false ,visible:false });
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


  handleSubmit = (e) => {
    console.log(2)
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    console.log(1)
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }



  // 纳税人规模选择
  radioChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
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
          title="开票信息添加"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
                </Button>,
          ]}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className="agent-form" labelAlign="left" style={{ paddingTop: '0' }}>

            <Form.Item>
              {getFieldDecorator('taxpayerSize', {
                initialValue: '1',
                getValueFromEvent: e => {
                  this.setState({

                    taxpayerType: e.target.value

                  })
                  return e.target.value
                }
              })(
                <Radio.Group>
                  <Radio value='1'>一般纳税人</Radio>
                  <Radio value='2'>小型纳税人</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item
              label="统一机构代码"
            >
              {getFieldDecorator('institutionalCode', {
                rules: [
                  {
                    required: true, message: '请输入统一机构代码', len: 9
                  }],
                getValueFromEvent: e => {
                  this.setState({
                    institutionalCode: e.target.value

                  })
                  return e.target.value
                }
              })(
                <Input placeholder="统一机构代码" />
              )}
            </Form.Item>

            <Form.Item
              label="开票抬头"
            >
              {getFieldDecorator('invoiceTitle', {
                rules: [
                  {
                    required: true, message: '请输入发票抬头',
                  }],
                getValueFromEvent: e => {
                  this.setState({
                    invoiceTitle: e.target.value
                  })
                  return e.target.value
                }
              })(
                <Input placeholder="开票抬头" />
              )}
            </Form.Item>
            <Form.Item
              label="开户银行"
            >
              {getFieldDecorator('bank', {
                rules: [
                  {
                    required: true, message: '请输入银行名称',
                  }],
                getValueFromEvent: e => {
                  this.setState({
                    bank: e.target.value
                  })
                  return e.target.value
                }
              })(
                <Input placeholder="开户银行" />
              )}
            </Form.Item>
            <Form.Item
              label="开户名称"
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true, message: '请输入开户名称', max: 16, min: 2
                  }],
                getValueFromEvent: e => {
                  this.setState({
                    name: e.target.value
                  })
                  return e.target.value
                }
              })(
                <Input placeholder="开户名称" />
              )}
            </Form.Item>
            <Form.Item
              label="银行账户"
            >
              {getFieldDecorator('bankAccount', {
                rules: [
                  {
                    required: true, message: '请输入银行账户',
                  }],
                getValueFromEvent: e => {
                  console.log(111)
                  this.setState({
                    bankAccount: e.target.value
                  })
                  console.log(this.state.bankAccount)
                  return e.target.value
                }

              })(
                <Input placeholder="银行账户" />
              )}
            </Form.Item>
            <Form.Item
              label="纳税人证明"
            >
              <Upload {...uploadImg}>
                <Button>
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
            </Form.Item>

          </Form>
        </Modal>
      </div>
    );
  }

  componentDidUpdate() {
    // console.log(this.state);
  }


}
Addinvoice = Form.create({ name: 'register' })(Addinvoice)

export default Addinvoice;