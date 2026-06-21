import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useGitUser } from '../context/GitUserContext';
import { deleteUser, getUserByLogin } from '../services/users';
import { Alert } from 'react-native';
import { ActivityIndicator, KeyboardAvoidingView,Modal,TextInput } from 'react-native';
import MapView, { Marker, LatLng, Region, MapPressEvent, PoiClickEvent } from 'react-native-maps';
import axios from 'axios';
import { DEFAULT_LOCATION, tryGetCurrentPosition } from '../utils/location';
import { useState,useRef, useEffect} from 'react';
import Bbutton from '../components/BigButton';
import { useNavigation } from '@react-navigation/native';
import {getUserInfo} from '../services/github';


export default function signupscreen({navigation} : StackScreenProps<any>){
    const {setUsergit} = useGitUser();
    const [githubUsername, setGithubUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [isloggedin, setIsloggedin] = useState(false);
    const [markerlocation, setMarkerLocation] = useState<LatLng | null>(DEFAULT_LOCATION);
    const mapRef = useRef<MapView>(null);
    const [currentuserregion, setcurrentuserregion] = useState<Region>({...DEFAULT_LOCATION, latitudeDelta: 0.0922, longitudeDelta: 0.0421}); //DO NOT DO NULL BREAKS SETTING
    
    useEffect(() => {
        tryGetCurrentPosition().then((position: LatLng) => {
            setMarkerLocation(position);
            setcurrentuserregion((regio) => ({...regio, ...position}));
        }).catch(() => {setMarkerLocation(DEFAULT_LOCATION)});
    }, []);

    function usercheck(){
        if(githubUsername.trim() === ''){
            Alert.alert('Error', 'Please enter a GitHub username');
            return;
        }
        if(githubUsername.trim()!)
        {
            Alert.alert('Error', 'Invalid GitHub username');
            return;
        }}
    return(
        <>
        <Modal visible={isloggedin} transparent={true}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        </Modal>
        <View style={{flex: 1}}>
            <MapView
                ref={mapRef}
                style={{ width: '100%', height: '100%' }}
                initialRegion={currentuserregion}
                showsUserLocation={true}
                showsMyLocationButton={false}
                toolbarEnabled={false}
                showsIndoors={false}
                mapPadding={{ top: 0, right: 20, bottom: 0, left: 0 }}
                >
                <Marker coordinate={markerlocation!} title="Your Location" />
            </MapView>
        </View>
        <KeyboardAvoidingView behavior="padding" style={{position: 'absolute', bottom: 20, left: 20, right: 20, flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
                placeholder="Enter GitHub username"
                value={githubUsername}
                onChangeText={setGithubUsername}
                autoCapitalize="none"
                style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, backgroundColor: 'white' }}
            />
            <Bbutton onPress={() => {
                usercheck();
                setLoading(true);
            }} 
            label = {isloggedin ? 'Logging in...' : 'Login'}
            color = "blue"/>
        </KeyboardAvoidingView>
        </>
    );
}