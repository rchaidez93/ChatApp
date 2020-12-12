const initState = {
    data: []
};

export default function messageReducer(state=initState, action) {
    switch(action.type){
        case 'ADD_MESSAGE':
            return {...state, data: [...state.data, action.message]};
        case 'RECEIVE_MESSAGE':
            return {...state, data: [...state.data, action.message]};
        case 'LOAD_MESSAGES':
            return {...state, data: [...state.data.filter(message => message.channelID !== action.channel), ...action.json]};
        default:
            return state;
    }
}