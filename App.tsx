import React, { useEffect, useState } from 'react';
import Routes from './src/routes';
import { gitusercontext,gitusercontexttype } from './src/CONTEXT/gitusercontext';
import { getfromStorage,RemovefromStorage,setInStorage } from './src/Services/storage';

export default function App() {

    const[username,setusername] = useState<string|null>(null);
    const[initialr,setinitalr] = useState<string>();
    const gitusercontextapp:gitusercontexttype ={
        user:username,
        setuser:(username)=>{
            if(username)
            {
                setInStorage('currentuser',username);
            }
            else
            {
                RemovefromStorage('currentuser');
            }
        }
    }
    useEffect(()=>{getfromStorage<string>('currentuser').then((user)=>{setusername(user);setinitalr('Main')}).catch(()=>setinitalr('Setup'))})

    return(
        <gitusercontext.Provider value={gitusercontextapp}>
            {initialr && <Routes initialRouteName={initialr}/>}
        </gitusercontext.Provider>
    );
}
