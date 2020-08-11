import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
  } from "react-router-dom";
import Login from './pages/Login';
import ChatRoom from './pages/ChatRoom';
import Welcome from './pages/Welcome';
import AuthCheck from './utils/AuthCheck';
import Callback from './utils/CallBack';
import { AuthContext } from './context/auth-context';
import { Button } from '@material-ui/core';

const PrivateRoute = ({component: Component, auth }) => (
    <Route 
    render={props => auth === true
      ? <Component auth={auth} {...props} />
      : <Redirect to={{pathname:'/authcheck'}} />
    }
    />
)

const Routes = () => {
    const context = useContext(AuthContext);
    return (
        <Router>
            <Link to="/login">
                <Button>Login</Button>
            </Link>
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/login" component={Login} />
                <Route path='/authcheck' component={AuthCheck} />
                <PrivateRoute 
                    path="/chatroom"
                    auth={context.state.authenticated}
                    component={ChatRoom}
                />             
                <Route path='/callback' component={Callback} />
            </Switch>
        </Router>
    );
}

export default Routes;