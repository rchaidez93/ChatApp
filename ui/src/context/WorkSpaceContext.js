import React, { createContext } from 'react';

const WorkSpaceContext = createContext();

const WorkSpaceProvider = ({children, user}) => {
    
    //fetch workspace info: public channels and direct channels. 
    //hook: useWorkspace: userInfo, workspaceInfo?
    console.log(user);

    return (
        <WorkSpaceContext.Provider
        value={{
            testing:1
        }}
        >
            {children}
        </WorkSpaceContext.Provider>
    );
}

export { WorkSpaceProvider };