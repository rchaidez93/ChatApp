import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import useAuth from '../hooks/useAuth';
import { useRouter } from '../hooks/useRouter';

const AuthCheck = () => {

    const context = useContext(AuthContext);
    const { dispatch } = context;
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(auth.isAuthenticated()) {
            dispatch({type:"AUTHENTICATE_SUCCESS"});
            router.push('/chatroom');
        }
        else {
            dispatch({type:"AUTHENTICATE_FAIL"});
            router.push('/login');
        }
    }, [auth, dispatch, router]);

    return (
        null
    );
};

export default AuthCheck;