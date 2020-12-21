import { useContext, useMemo } from "react";
import { WorkSpaceContext } from "../context/WorkSpaceContext";


const useWorkspace = () => {

    const workspace = useContext(WorkSpaceContext);
    const {username, user_id, direct_channels, public_channels, messageState, messageDispatch, channel, channelDispatch} = workspace;
    const messages = useMemo(() => {
        return messageState.map(msg => {
            return {
                primary: `${msg.user.username} (${new Date(msg.createdAt).toLocaleString()})`,
                secondary: msg.text
            }
        })
    }, [messageState]);

    return {
        username,
        user_id,
        messages,
        direct_channels, 
        public_channels,
        messageDispatch,
        channel, 
        channelDispatch
    }
}
export default useWorkspace;