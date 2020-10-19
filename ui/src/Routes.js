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
import {WorkSpaceProvider} from './context/WorkSpaceContext';

const PrivateRoute = ({component: Component, auth, user }) => (
    <Route 
    render={props => auth === true
      ? (
        <WorkSpaceProvider user={user}>
            <Component auth={auth} {...props} />
        </WorkSpaceProvider>
      )
      : <Redirect to={{pathname:'/authcheck'}} />
    }
    />
)

const Routes = () => {
    const context = useContext(AuthContext);
    console.log(context);
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
                    user={context.state.user}
                    component={ChatRoom}
                />             
                <Route path='/callback' component={Callback} />
            </Switch>
        </Router>
    );
}

export default Routes;