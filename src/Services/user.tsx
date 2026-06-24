import axios from 'axios';
import user from '../types/user'

const api =axios.create({baseURL:'https://my-json.server.typicode.com/ceinsmic/assignment3mobile'});
export function getUsers(){
    
    return(
        api.get<user[]>('/uses/').then(({data})=>data)
    );
}

export function getusers()
{
    return(
        api.get<user[]>('/users/').then(({data})=>data)
    )
}

export function getuserbyusername(username:string)
{
    return(
        api.get<user[]>(`/users/?login=${username}`).then((res)=>res.data[0])
    )
}

export function postUser(user: Omit<user,'id'>)
{
    return(
        api.post<user>('/users/',user).then(({data})=>data)
    )
}

export function deleteUser(id:number)
{
    return api.delete(`/users/${id}`).then(({data})=>data)
}