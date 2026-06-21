import React from 'react';
import { View, Text } from 'react-native';
import { Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, LatLng, Region } from 'react-native-maps';
import { useGitUser } from '../context/GitUserContext';
import { useNavigation } from '@react-navigation/native';
import devs from '../types/user';
import { StackScreenProps } from '@react-navigation/stack';
import { DEFAULT_LOCATION, tryGetCurrentPosition } from '../utils/location'
import { useEffect, useState, useRef } from 'react';
import { getUserByLogin,getUsers, deleteUser } from '../services/users'
import {getFromNetworkFirst, getFromStorage} from '../services/storage';
import UserMarker from '../components/UserMarker';

const style = {
    container: {
        flex: 1,}
};

export default function MapScreen({navigation} : StackScreenProps<any>){
    const { usergit, setUsergit } = useGitUser();
    const [users, setUsers] = useState<devs[]>([]); //list of users to be shown on the map
    const [region,setregion] = useState<Region>(); //current region of the map
    const [coordsuser, setcoordsuser] = useState<LatLng>(); //current coordinates of the user

    useEffect(() => {
        getFromNetworkFirst<devs[]>('usergit', getUsers())
            .then(setUsers)
            .catch((err) => Alert.alert('Error fetching users', err.message));

        tryGetCurrentPosition().catch(()=> DEFAULT_LOCATION).then((position) => {setcoordsuser(position); setregion({...position, latitudeDelta: 0.0922, longitudeDelta: 0.0421})
            });}, []);

    function logout(){

        if(usergit){getUserByLogin(usergit.githubUsername).then((user) => {if(user){return deleteUser(user.id)}}).then(()=> setUsergit(null)).catch((err) => Alert.alert('Error logging out', err.message))}
    }
    return(
        <View testID="mapscreen" style={style.container}>
            <MapView
                initialRegion={region}
                onRegionChange={setregion}
                showsUserLocation={true}
                showsMyLocationButton={false}
                moveOnMarkerPress={false}
                toolbarEnabled={false}
                showsIndoors={false}>
            {users.map((user) => (
                <UserMarker
                    data={user}
                    handleCalloutPress={(username) => navigation.navigate('Profile', { githubUsername: username })}
                />
            ))}
            </MapView>
            <TouchableOpacity style={{position: 'absolute', bottom: 20, right: 20, backgroundColor: '#021A62', padding: 10, borderRadius: 5}} onPress={logout}>
                <Text style={{color: 'white'}}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}