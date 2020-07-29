import React, { useReducer } from 'react';
import userReducer from '../reducers/AuthReducer';

export const AuthContext = React.createContext();

function AuthProvider(props) {
    const {children} = props;
    const [state, dispatch] = useReducer(userReducer, {authenticated: false});

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