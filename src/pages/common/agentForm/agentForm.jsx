import React from 'react';
import './agentForm.scss';
import Addinvoice from './addinvoice/addinvoice'
import Addcontact from './addcontact/addcontact'
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Table, Divider, Tag, message
} from 'antd';
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

// 地区选择框数据
const provinceData = ['Zhejiang', 'Jiangsu']; // 省级
const cityData = {  //城市
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

//代理等级数据
const agentLevel = [{ value: 'city', label: '市级代理' }, { value: 'district', label: '区级代理' }, { value: 'county', label: '县级代理' }];

class AgentForm extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    confirmDirty: false, // 确认表单是否符合限制规定
    autoCompleteResult: [],
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
  };


  handleProvinceChange = (value) => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  }

  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
    });
  }


  //提交按钮
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  //所属销售下拉框
  saleSelectChange = (value) => {
    console.log(value)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { cities } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    //开票信息表格

    const invoiceColumns = [{
      title: '统一机构代码',
      dataIndex: 'institutionalCode',// key
      key: 'institutionalCode',// key
      // key: 'name', //如果dataIndex唯一则不需要此属性
    }, {
      title: '开票抬头',
      dataIndex: 'invoiceTitle',
      key: 'invoiceTitle',
    }, {
      title: '开户银行',
      dataIndex: 'bank',
      key: 'bank',

    }, {
      title: '开户名称',
      dataIndex: 'name',
      key: 'name',

    }, {
      title: '银行账户',
      dataIndex: 'bankAccount',
      key: 'bankAccount',
    },
    {
      title: '纳税人类型',
      dataIndex: 'taxpayerType',
      key: 'taxpayerType'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <span>
          <a href="javascript:;">上传</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      ),
    }
    ];
    const contactColumns = [
      {
        title: '姓名',
        dataIndex: 'name',// key
        key: 'name',// key
        // key: 'name', //如果dataIndex唯一则不需要此属性
      }, {
        title: '职位',
        dataIndex: 'position',
        key: 'position',
      }, {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',

      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => (
          <span>
            <a href="javascript:;">修改</a>
            <Divider type="vertical" />
            <a href="javascript:;">主要联系人</a>
          </span>
        ),

      }
    ];


    // 暂时信息
    const invoiceData = [
      {
        key: 1,
        institutionalCode: '56494421DFD',
        invoiceTitle: '北京天堂有限公司',
        bank: '工商银行',
        name: '大东',
        bankAccount: 'CD456454',
        taxpayerType: '一般纳税人'
      },
      {
        key: 2,
        institutionalCode: '56494421DFD',
        invoiceTitle: '北京天堂有限公司',
        bank: '工商银行',
        name: '大东',
        bankAccount: 'CD456454',
        taxpayerType: '一般纳税人'
      },
    ];
    const contactData = [
      {
        key: 1,
        name: '张三',
        position: '经理',
        phone: '15555555555',

      }
    ]

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="agent-form" labelAlign="left" >
        <p className="title">代理商信息</p>

        <Form.Item
          label="代理商名称"
        >
          {getFieldDecorator('agentName', {
            rules: [
              {
                required: true, message: '请输入代理商名称',
              }],
          })(
            <Input placeholder="公司全称" />
          )}
        </Form.Item>

        <Form.Item
          label="所属地区"
        >
          <Select
            defaultValue={provinceData[0]}
            style={{ width: 120 }}
            onChange={this.handleProvinceChange}
          >
            {provinceData.map(province => <Option key={province}>{province}</Option>)}
          </Select>

          <Select
            style={{ width: 120 }}
            value={this.state.secondCity}
            onChange={this.onSecondCityChange}
          >
            {cities.map(city => <Option key={city}>{city}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="代理等级"
        >
          {getFieldDecorator('agentLevel', {
            initialValue: ['city'],
            rules: [{ type: 'array', required: true, message: '请选择代理等级!' }],
          })(
            <Cascader options={agentLevel} />
          )}
        </Form.Item>
        <Form.Item
          label="开票信息"
        >
          <Table columns={invoiceColumns} dataSource={invoiceData} pagination={{ hideOnSinglePage: true }} />

          <Addinvoice></Addinvoice>
        </Form.Item>

        <Form.Item
          label="联系人"
        >
          <Table columns={contactColumns} dataSource={contactData} pagination={{ hideOnSinglePage: true }} />

          <Addcontact></Addcontact>
        </Form.Item>
        <Form.Item
          label="所属销售"
        >
          <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.saleSelectChange}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>


        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    );
  }
}
AgentForm = Form.create({ name: 'register' })(AgentForm);

export default AgentForm;