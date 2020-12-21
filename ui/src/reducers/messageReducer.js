
export default function messageReducer(state=[], action) {
    switch(action.type){
        case 'ADD_MESSAGE':
            return [...state, action.payload];
        case 'LOAD_MESSAGES':
            return [...action.payload];
        default:
            return state;
    }
}