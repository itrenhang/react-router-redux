var listData = {}

function indexRedux(state = listData, action) {
	switch (action.type) {
		case 'REMOVETABS':
			if(!listData.closable && listData.closable != undefined){
				return state;
			}
			delete state[action.key];
			return Object.assign({},state);
		case 'ADDTABS':
			return Object.assign({},state, action.item)
		default:
		  	return state
	}
}


export default indexRedux