import React from 'react';
import loadable from './loadable';

let routers = [
    {
        path:'login',
        exact:true,
        component:loadable(()=>import('../pages/login/login')),
        icon:'user',
        name:'首页',
        closable:false,
    },
    {
        path:'modify',
        component:loadable(()=>import('../pages/modify/modify')),
        icon:'video-camera',
        name:'第一页',
        children:[
            {
                path:'aa',
                exact:true,
                component:loadable(()=>import('../pages/modify/modify')),
                icon:'user',
                name:'aa'
            },
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
