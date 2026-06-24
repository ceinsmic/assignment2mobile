import AsyncStorage from '@react-native-async-storage/async-storage'

export function setInStorage(key: string, value: any)
{
    const jsonVal= JSON.stringify(value);
    return AsyncStorage.setItem(key, jsonVal)
}
export function RemovefromStorage(key:string)
{
    return AsyncStorage.removeItem(key)
}



export async function getfromStorage<T>(key: string):Promise<T>{
    let returnval= null
    const json = await AsyncStorage.getItem(key);
    if(json != null )
    {
        returnval = Promise.resolve(JSON.parse(json))
    }
    else
    {
        returnval = Promise.reject(`key ${key} is not in cache`)
    }
    return await returnval; 
}

export async function getFromNetworkFirst<T>(key: string, request: Promise<T>): Promise<T>{
    try{
    const response = await request;
    setInStorage(key,response);
    return response;
    }catch(e){
    return getfromStorage<T>(key)
    }
}
