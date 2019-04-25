import axios from 'axios';
const path = 'http://agent.nobook.cc/api/';

//获取城市列表
export const countryList  = params => { return axios.get(`${ path }country/list`,{params:params}).then(res => res.data); };
