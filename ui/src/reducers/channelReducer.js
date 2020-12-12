const initState = {
    data: []
};

export default function channelReducer(state=initState, action) {
    switch(action.type){
        case 'ADD_CHANNEL':
            return {...state, data: [...state.data, action.channel]};
        case 'RECIEVE_CHANNEL':
            return {...state, data: [...state.data, action.channel]};
        case 'LOAD_CHANNELs':
            return {...state, data: [...state.data, ...action.json]};
        case 'DELETE_CHANNEL':
            return state;
        default:
            return state;
    }
}