import history from './history';
import axios from 'axios';


export default class Authorize{

    login = (username, password) => {

        axios.post("/users/authenticate", {
            username: username,
            password: password
        }).then(response => {
            const { data } = response;
            if(data.authenticated) {
                localStorage.setItem("user", username);
                history.push("/callback");
            }

        }).catch(err=> console.log(err));
    }

    handleAuth = () => {

        if(localStorage.getItem("user") !== null){
            let expiresAt = JSON.stringify((3600 * 1000 + new Date().getTime()));
            localStorage.setItem('expiresAt', expiresAt);
            history.push('/authcheck');
        }
        else{
            console.log("error");
        }
    }

    isAuthenticated = () => {
        let expiresAt = JSON.parse(localStorage.getItem('expiresAt'))
        if(expiresAt != null){
            return new Date().getTime() < expiresAt;    
        }
        return false;
    }

    logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('expiresAt');
        history.push('/authcheck');
    }
}