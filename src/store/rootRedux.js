var isLogin=false;

function indexRedux(state = isLogin, action) {
	switch (action.type) {
		case "GO_LOGIN":
			//登录
			return true
		case "OUT_LOGIN":
			//退出登录
			return false
		default:
		  	return state
	}
}


export default indexRedux