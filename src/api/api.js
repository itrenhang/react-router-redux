import axios from 'axios';
const path = 'http://admin.nobook.cc/api/';
const path2 = 'http://admin.nobook.cc/'
//获取城市列表
export const countryList  = params => { return axios.get(`${ path }country/list`,{params:params}).then(res => res.data); };
//获取销售人员列表
export const SaleList  = params => { return axios.get(`${path2}v1/order/sale/getSaleList`,params).then(res => res.data); };
//获取客户产品类型列表
export const productCategory  = params => { return axios.get(`${path2}v1/customer/productCategory`,{params:params}).then(res => res.data); };
//添加客户
export const addCustomer  = params => { return axios.get(`${path2}v1/customer/add`,{params:params}).then(res => res.data); };
