import gituser from '../types/user';
import react, { Children } from 'react';
import {createContext,useContext,useState,useEffect,useRef, ReactNode} from 'react';

export type gitusercontexttype ={
    user:string | null;
    setuser:(newValue: string | null) => void;
}

export const gitusercontext = createContext<gitusercontexttype | null>(null)


