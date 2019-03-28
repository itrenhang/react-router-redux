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
                component:loadable(()=>import('../pages/loading/loading')),
                icon:'user',
                name:'首页'
            }
        ]
    }
];
export default routers;
