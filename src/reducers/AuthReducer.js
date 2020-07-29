const userReducer = (state, action) => {
    switch(action.type){
        case 'AUTHENTICATE_SUCCESS':
            return {
                ...state,
                authenticated: true,
            };
        case 'AUTHENTICATE_FAIL':
            return {
                ...state,
                authenticated: false,
            }
        default:
            return state;

    }
};

export default userReducer;