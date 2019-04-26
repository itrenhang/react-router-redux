import React from 'react';
import loadable from './loadable';

let routers = [
    {
        path:'index',
        exact:true,
        component:loadable(()=>import('../pages/login/login')),
        icon:'user',
        name:'首页',
        closable:false,
    },
    {
        path:'modify',
        component:loadable(()=>import('../pages/addingAgents/addingAgents')),
        icon:'video-camera',
        name:'代理商',
        children:[
            {
                path:'addingAgents',
                exact:true,
                component:loadable(()=>import('../pages/addingAgents/addingAgents')),
                icon:'user',
                name:'添加代理商'

            }
        ]
    },
    {
        path:'404',
        exact:true,
        component:loadable(()=>import('../pages/errTemplate/errTemplate')),
        icon:'user',
        name:'404',
        hidden:true,
    }
];
export default routers;
