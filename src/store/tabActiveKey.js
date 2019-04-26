import { Router } from 'react-router-dom';
let tabActiveKey = {};
function tabActiveKeyReducer(state = tabActiveKey, action) {
	switch (action.type) {
		case 'SETTABKEY':
			action.history.push(action.path)
			return Object.assign({},state,action);
		default:
		  	return state
	}
	
}

export default tabActiveKeyReducer;