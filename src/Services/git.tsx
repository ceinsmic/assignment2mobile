import axios from 'axios'
import {Alert} from 'react-native'

const api = axios.create(
    {baseURL:'https://api.github.com/'}
)

export function getuserinfo(username:string){
    return api.get(`users/${username}`).then(({data})=>data);
}