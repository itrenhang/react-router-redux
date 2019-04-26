import React from 'react';
import { Modal, Button, Icon, Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, AutoComplete,Radio,message  } from 'antd';
import {countryList} from '../../../../api/api'
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;



class Addregion extends React.Component {

  constructor(props) {
    super(props)
    this.getProvince();
    this.state = {
      loading: false,
      visible: false,
      confirmDirty: false,
      provinceData:[], // 省级数据
      cityData :[],//城市数据
      regionData : [],//地区数据
      provinceName:'',//省份名字
      cityName:'',//城市名字
      areaName:'',//地区名字
    }

  }
  // 获取省份数据
  getProvince=()=>{
    countryList({level:'1'}).then(res=>{
      if(res.code==0){
        this.setState({
          provinceData:res.data
        })
        // console.log(this.state)
      }
    })
  }
  //选择省份后获取城市数据
  handleProvinceChange = (value,option) => {
    
    if(option){
      this.setState({
        provinceName:option.props.value,
      })
    
    
    countryList({parentId:option.key}).then(res=>{
      if(res.code == 0){
        this.setState({
          cityData:res.data
        })
      }
      
    })}
  }
  //选择城市后获取地区数据
  handleCityChange = (value,option) => {
    // console.log(1)
    console.log(option)
    
    if(option){
      this.setState({
        cityName:option.props.value
      })
    
    
    countryList({parentId:option.key}).then(res=>{
      console.log(res)
      if(res.code == 0){
        this.setState({
          regionData:res.data
        })
      }
      
    })}
  }
  //选择地区后将数据保存
  handleRegionChange = (value,option) => {
    if(option){
      this.setState({
        areaName:option.props.value
      })
    }
    
    
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  //确定
  handleOk = (e) => {

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        e.preventDefault();
        let type = '区县';
        if(!this.state.cityData){
          type = '省份'
        }
        if(!this.state.areaName){
          type = '城市'
        }
        let _packer = `${this.state.provinceName}-${this.state.cityName}-${this.state.areaName}`;
        if(!this.state.cityName && !this.state.areaName){
          _packer=`${this.state.provinceName}`
        }
        if(this.state.cityName && !this.state.areaName){
          _packer=`${this.state.provinceName}-${this.state.cityName}`
        }
        let regionForm = {
          location_a:this.state.areaName,
          location_c:this.state.cityName,
          location_p:this.state.provinceName,
          packer:_packer,
          type:type
        }
        this.setState({ loading: true });
        this.props.getChildDataRegion(regionForm)
        this.setState({ loading: false, visible: false });   
      }else{
        
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



  render() {
    const { visible, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
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

    return (
      <div>
        <div className='ant-form-item-control-wrapper ant-col-xs-20 ant-col-sm-24 addinvoice' type="primary" onClick={this.showModal}>
          <Icon type="plus" /><span>添加</span>


        </div>

        <Modal
          visible={visible}
          title="代理地区添加"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              确定
            </Button>,
          ]}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className="agent-form" labelAlign="left" style={{paddingTop:'0'}}
          >
          <Form.Item
          label="所属地区"
        >
        {getFieldDecorator('province',{
          rules:[{
            required: true, message: '请选择省份'
          }]


        })(<Select
          placeholder='请选择'
          style={{ width: 120 }}
          onChange={this.handleProvinceChange}
        >
          {this.state.provinceData.map(province => <Option key={province.id} value={province.name}>{province.name}</Option>)}
        </Select>)}
          
          

          <Select
            style={{ width: 120 , marginLeft:10 }}
            placeholder='请选择'
            onChange={this.handleCityChange}
            ref='city'
          >
            {this.state.cityData.map(city => <Option key={city.id} value={city.name}>{city.name}</Option>)}
          </Select>

          <Select
            style={{ width: 120 , marginLeft:10 }}
            placeholder='请选择'
            ref='region'
            onChange={this.handleRegionChange}
          >
            {this.state.regionData.map(region => <Option key={region.id} value={region.name}>{region.name}</Option>)}
          </Select>
        </Form.Item>
          
          </Form>
        </Modal>
      </div>
    );
  }



componentWillUnmount(){
  
}
}
Addregion = Form.create({ name: 'register' })(Addregion)

export default Addregion;