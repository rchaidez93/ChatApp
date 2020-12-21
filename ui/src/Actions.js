import axios from 'axios';

export function addMessage(dispatch, data){
    axios.post("http://127.0.0.1:8080/messages/add_message",
    {
        channelId: data.channelID,
        text: data.text,
        user: {
            user_id: data.user.userID,
            username: data.user.username,
        }
    }).then(res => {
        if(res.data.success)
            dispatch({type: "ADD_MESSAGE", payload: res.data.message[0]})
    }).catch(e => console.log(e));
}