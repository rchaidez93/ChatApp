import { useContext, useMemo } from "react";
import { WorkSpaceContext } from "../context/WorkSpaceContext";


const useWorkspace = () => {

    const workspace = useContext(WorkSpaceContext);
    const {username, messageState} = workspace;

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
        messages
    }
}
export default useWorkspace;