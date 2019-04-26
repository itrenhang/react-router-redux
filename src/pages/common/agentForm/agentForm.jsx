import React from 'react';
import './agentForm.scss';
import Addinvoice from './addinvoice/addinvoice'
import Addcontact from './addcontact/addcontact'
import Addregion from './addregion/addregion';
import {
  Form, Input,  Icon,  Select, Checkbox, Button,  Table, Divider,  
} from 'antd';
import { countryList, SaleList, productCategory,addCustomer } from '../../../api/api.js'
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

class AgentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 地区选择框数据
      provinceData: [], // 省级数据
      cityData: [],//城市数据
      regionData: [],//地区数据
      confirmDirty: false, // 确认表单是否符合限制规定
      autoCompleteResult: [],
      invoiceForm: [],//发票信息
      regionForm1: [],//展示地区信息
      saleList: [],//销售人员列表
      productList: [],//代理产品列表
      selectProduct:[],//选中的代理产品
      /*------------------------------*/
      /*-------上传的表单数据----------*/ 
      /*------------------------------*/
      name: '123', // 代理商名称
      productCategory: '', // 代理产品类型：1-虚拟实验系列(预存款) 2-虚拟实验系(线下分账) 3-加试系列(线上分账) 4-学生端(线上分账)
      rank: '1',//代理等级
      saleId:'',//销售员id
      saleName:'',//销售员名字
      provinceid: '',//所属省份id
      cityid: '',//所属城市id
      areaid: '',//所属地区id
      provinceName: '',//所属省份name
      cityName: '',//所属城市name
      areaName: '',//所属地区name
      regionForm: [],//代理地区信息

    }
    this.getChildData = this.getChildData.bind(this)
    this.getProvince();
    this.getSaleList();
    this.getProduct();
  }
  // 获取省份数据
  getProvince = () => {
    countryList({ level: '1' }).then(res => {
      // debugger
      if (res.code == 0) {
        this.setState({
          provinceData: res.data
        })
        // console.log(this.state)
      }
    })
  }
  //选择省份后获取城市数据
  handleProvinceChange = (value, option) => {
    // console.log(1);
    // console.log(option)
    this.setState({
      provinceid: option.key,
      provinceName: option.props.value,
    })
    countryList({ parentId: option.key }).then(res => {
      if (res.code == 0) {
        this.setState({
          cityData: res.data
        })
      }

    })
  }
  //选择城市后获取地区数据
  handleCityChange = (value, option) => {
    console.log(1)
    this.setState({
      cityid: option.key,
      cityName: option.props.value
    })
    countryList({ parentId: option.key }).then(res => {
      console.log(res)
      if (res.code == 0) {
        this.setState({
          regionData: res.data
        })
      }

    })
  }
  //选择地区后将数据保存
  handleRegionChange = (value, option) => {
    this.setState({
      areaid: option.key,
      areaName: option.props.value
    })
  }
  // 获取销售人员列表
  getSaleList = () => {
    SaleList().then(res => {
      if (res.code == 0) {
        if (res.data) {
          let _data = [];
          let _obj = {};
          res.data.forEach((item, index) => {
            _obj = { value: index + 1, label: item.realName }
            _data.push(_obj)
          });
          this.setState({
            saleList: _data
          }, () => { console.log(this.state); })
        }
      }
    })
  }

  // 获取产品类型列表
  getProduct = ()=>{
    productCategory({category:1}).then(res=>{
      if(res.code == 0){
        let pList = []
        let _obj = {}
        for(let i in res.data){
          if(i==1){
            _obj = {
              label:res.data[i],
              value:i,
              disabled:true
            }
          }else{
            _obj = {
            label:res.data[i],
            value:i,
          }
          }
          pList.push(_obj);
        }
        this.setState({
          productList:pList
        })
      }
    })
  }

  //获取子组件开票信息的数据
  getChildData = (res) => {
    let key = { key: this.state.invoiceForm.length }
    let obj = Object.assign(res, key)
    this.state.invoiceForm.push(obj)
    this.setState({
      invoiceForm: this.state.invoiceForm
    })
  }
  //获取子组件代理地区的数据
  getChildDataRegion = (res) => {
    this.state.regionForm.push(res)
    let key = { key: this.state.regionForm.length }
    let obj = Object.assign(res, key)
    this.state.regionForm1.push(obj)
    this.setState({
      regionForm: this.state.regionForm,
      regionForm1: this.state.regionForm1,

    })
  }
  //获取子组件联系人的数据
  getChildDataContact = (res)=>{
    console.log(res)
  }


  //提交按钮
  handleSubmit = (e) => {
    let data = {
      name: this.state.name, 
      productCategory: this.state.productCategory, 
      rank: this.state.rank,
      saleId:this.state.saleId,
      saleName:this.state.saleName,
      provinceid: this.state.provinceid,
      cityid: this.state.cityid,
      areaid: this.state.areaid,
      provinceName: this.state.provinceName,
      cityName: this.state.cityName,
      areaName: this.state.areaName,
      agentArea: this.state.regionForm,
    };

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        addCustomer(data).then(res=>{
          if(res.code == 0){
            console.log('成功了')
          }
        })
      }else{
        
        
      }
    });
  }
  formDataChange = (e) => {
    console.log(e);
    // this.setState({
    //   formData:{
    //     name:e.target.value
    //   }
    // })
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
    const regionColumns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: '地区',
        dataIndex: 'packer',
        key: 'packer',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => (
          <span>
            <a href="javascript:;"><Icon type="delete" /></a>
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
    const regionData = [
      {
        key: 1,
        index: '01',
        province: '北京市',
        city: '东城区',
        county: '去去去'

      }
    ]

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="agent-form" labelAlign="right"  >
        <p className="title">代理商信息</p>

        <Form.Item
          label="代理商名称"
        >
          {getFieldDecorator('agentName', {
            rules: [
              {
                required: true, message: '请输入代理商名称'
              }
            ],
            getValueFromEvent: e => {

              this.setState({
                name: e.target.value
              })
              return e.target.value
            },


          })(
            <Input />
          )}
        </Form.Item>

        <Form.Item
          label="所属地区"
        >

          <Select
            placeholder='请选择'
            style={{ width: 120 }}
            onChange={this.handleProvinceChange}
            ref='province'
          >
            {this.state.provinceData.map(province => <Option key={province.id} value={province.name}>{province.name}</Option>)}
          </Select>

          <Select
            style={{ width: 120,marginLeft: 10 }}
            placeholder='请选择'
            onChange={this.handleCityChange}
            ref='city'
          >
            {this.state.cityData.map(city => <Option key={city.id} value={city.name}>{city.name}</Option>)}
          </Select>
{getFieldDecorator('province',{
          rules:[{
            required: true, message: '请选择地区'
          }]


        })(<Select
          style={{ width: 120,marginLeft: 10 }}
          placeholder='请选择'
          onChange={this.handleRegionChange}
        >
          {this.state.regionData.map(region => <Option key={region.id} value={region.name}>{region.name}</Option>)}
        </Select>)}
          
        </Form.Item>

        <Form.Item
          label="代理等级"
        >
          {getFieldDecorator('agentLevel', {
            initialValue: ['1'],
            rules: [{ required: true, message: '请选择代理等级!' }],
            getValueFromEvent: e => {
              // console.log(e)
              this.setState({
                rank: e
              })
              return e
            },

          })(
            <Select style={{ width: '120px' }}>
              <Option value="1">市级代理</Option>
              <Option value="2">区级代理</Option>
              <Option value="3">县级代理</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="代理地区"
        >

          <Table columns={regionColumns} dataSource={this.state.regionForm1} pagination={{ hideOnSinglePage: true }} showHeader={true} />
          <Addregion getChildDataRegion={this.getChildDataRegion} ></Addregion>

        </Form.Item>



        <Form.Item
          label="开票信息"
        >
          <Table columns={invoiceColumns} dataSource={this.state.invoiceForm} pagination={{ hideOnSinglePage: true }} />

          <Addinvoice getChildData={this.getChildData} ref='invoiceForm'></Addinvoice>
        </Form.Item>

        <Form.Item
          label="联系人"
        >
          <Table columns={contactColumns} dataSource={contactData} pagination={{ hideOnSinglePage: true }} />

          <Addcontact getChildDataContact={this.getChildDataContact}></Addcontact>
        </Form.Item>

        <Form.Item
          label="所属销售"
        >
          {getFieldDecorator('sale', {
            rules: [{required: true, message: '请选择所属销售!' }],
            getValueFromEvent:(e,i) => {
              console.log(i)
              this.setState({
                saleId:e,
                saleName:i.props.children
              })
              return e
            }
          })(
            <Select
            style={{ width: 150 }}
            placeholder='请选择所属销售'
            // onChange={this.handleSaleChange}
          >
            {this.state.saleList.map(sale => <Option key={sale.value} value={sale.value}>{sale.label}</Option>)}
          </Select>
          )} 
        </Form.Item>
        <Form.Item
          label="代理产品"
        >
        {getFieldDecorator('productCategory',{
          initialValue:['1'],
          getValueFromEvent:e=>{
            console.log(e)
            this.setState({
              productCategory:e
            })
            return e
          }
        })(<CheckboxGroup
          options={this.state.productList}
          />)}
          

        </Form.Item>


        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    );
  }
  componentDidMount() {
    // console.log(this.state);


  }
  componentDidUpdate() {
    // console.log(this.state)
    // this.getChildData();
  }
}
AgentForm = Form.create({ name: 'register' })(AgentForm);

export default AgentForm;