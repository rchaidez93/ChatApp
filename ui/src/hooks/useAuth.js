import axios from 'axios';
import { useRouter } from './useRouter';
import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

function useAuth() {

    const router = useRouter();
    const context = useContext(AuthContext);
    const { dispatch } = context;
    
    const login = (username, password) => {

        axios.post("/users/authenticate", {
            username: username,
            password: password
        }).then(response => {
            const { data } = response;
            if(data.authenticated) {
                localStorage.setItem("user", username);
                dispatch({type: "USER", payload: data.user})
                router.push("/callback");
            }
    
        }).catch(err=> console.log(err));
    }
    
    const handleAuth = () => {
    
        if(localStorage.getItem("user") !== null){
            let expiresAt = JSON.stringify((3600 * 1000 + new Date().getTime()));
            localStorage.setItem('expiresAt', expiresAt);
            router.push('/authcheck');
        }
        else{
            console.log("error");
        }
    }
    
    const isAuthenticated = () => {
        let expiresAt = JSON.parse(localStorage.getItem('expiresAt'))
        if(expiresAt != null){
            return new Date().getTime() < expiresAt;    
        }
        return false;
    }
    
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('expiresAt');
        router.push('/authcheck');
    }

    return {
        login,
        handleAuth,
        isAuthenticated,
        logout
    }
}

export default useAuth;

