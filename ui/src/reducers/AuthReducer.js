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
        case 'USER':
            return{
                ...state,
                user: action.payload
            }
        default:
            return state;

    }
};

export default userReducer;