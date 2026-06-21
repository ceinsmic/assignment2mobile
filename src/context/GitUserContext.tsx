import React, { createContext, useContext, useState, ReactNode } from 'react';
import { userprofile } from '../types/user';

type gitusercontext= {
    usergit:userprofile | null;
    setUsergit: (user:userprofile | null) => void;
}

const GitUserContext = createContext<gitusercontext>(
    {
        usergit:null,
        setUsergit: () => {}
    }
);


export const GitUserProvider = ({ children }: { children: ReactNode }) => {
    const [usergit, setUsergit] = useState<userprofile | null>(null);
    
    return (
        <GitUserContext.Provider value={{ usergit   , setUsergit     }}>
            {children}
        </GitUserContext.Provider>
    );
};

export const useGitUser = () => useContext(GitUserContext);
