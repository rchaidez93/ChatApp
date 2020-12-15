import axios from 'axios';
import React, { createContext, useEffect, useReducer } from 'react';
import channelReducer from '../reducers/channelReducer';
import messageReducer from '../reducers/messageReducer';

export const WorkSpaceContext = createContext();

const channelInitState = {
    name: 'Public',
    id: "0"
}
const WorkSpaceProvider = ({children, user}) => {
    const [messageState, messageDispatch] = useReducer(messageReducer, []);
    const [channelState, channelDispatch] = useReducer(channelReducer, channelInitState)

    useEffect(() => {
        axios.get("http://127.0.0.1:8080/messages/get_messages",
        {
            params: {channelID: channelState.id} // getting Public channel messages by default
        }).then(res => {
            messageDispatch({type: 'LOAD_MESSAGES', payload: res.data});
        });
    }, [channelState]);
    return (
        <WorkSpaceContext.Provider
        value={{
            ...user,
            messageState: messageState? messageState : [],
            messageDispatch,
            channelState,
            channelDispatch
        }}
        >
            {children}
        </WorkSpaceContext.Provider>
    );
}

export { WorkSpaceProvider };