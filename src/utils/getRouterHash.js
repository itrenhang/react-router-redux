
function getRouterHash(routers){
    let routerHash = {};
    for(let route of routers){
        routerHash[route.path] = route;
        if(route.children){
            routerHash = {...routerHash,...(getRouterHash(route.children))}
        }
    }
    return routerHash;
}
export {
    getRouterHash
}