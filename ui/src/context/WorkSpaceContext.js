import React, { createContext } from 'react';

const WorkSpaceContext = createContext();

const WorkSpaceProvider = ({children, user}) => {
    
    
    console.log(user);

    return (
        <WorkSpaceContext.Provider
        value={{
            ...user
        }}
        >
            {children}
        </WorkSpaceContext.Provider>
    );
}

export { WorkSpaceProvider };
export default WorkSpaceContext;