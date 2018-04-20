
export default function(state=[],action){
    switch (action.type){
        case 'MODIFY_GETDATA':
            let data = [1,2,3];
            return data
        default:
            return state;
    }
}