export default function channelReducer(state, action) {
    switch(action.type){
        case 'CHANGE_CHANNEL':
            return {
                name: action.payload.name,
                id: action.payload.id
            };
        default:
            return state;
    }
}