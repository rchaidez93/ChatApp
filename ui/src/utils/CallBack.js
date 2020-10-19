import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const Callback = () => {

    const auth = useAuth();

    useEffect(() => {
        auth.handleAuth();
    },[auth]);
    return (
        null
    );
}

export default Callback;