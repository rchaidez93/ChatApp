const initState = {
    data: []
};

export default function messageReducer(state=initState, action) {
    switch(action.type){
        case 'ADD_MESSAGE':
            return {...state, data: [...state.data, action.payload]};
        case 'RECEIVE_MESSAGE':
            return {...state, data: [...state.data, action.payload]};
        case 'LOAD_MESSAGES':
            return {
                data: [action.payload]
                }; 
        default:
            return state;
    }
}