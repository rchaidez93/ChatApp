import React from 'react';
import {
    Router,
    Switch,
    Route,
  } from "react-router-dom";
import Login from './pages/Login';
import ChatRoom from './pages/ChatRoom';
import History from './utils/History';

const Routes = () => {
    return (
        <Router history={History}>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/chatroom" component={ChatRoom}/>
            </Switch>
        </Router>
    )
};

export default Routes;