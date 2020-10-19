import React, { useReducer } from 'react';
import userReducer from '../reducers/AuthReducer';

export const AuthContext = React.createContext();

const initUser = {
    authenticated: false,
    user: {}
}

function AuthProvider(props) {
    const {children} = props;
    const [state, dispatch] = useReducer(userReducer, initUser);

    return(
        <AuthContext.Provider 
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };