
export default function messageReducer(state=[], action) {
    switch(action.type){
        case 'ADD_MESSAGE':
            return {...state, data: [...state.data, action.payload]};
        case 'RECEIVE_MESSAGE':
            return {...state, data: [...state.data, action.payload]};
        case 'LOAD_MESSAGES':
            return [...action.payload];
        default:
            return state;
    }
}