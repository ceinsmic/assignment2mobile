//import react from "react";
import {WebView} from "react-native-webview";
import { StyleSheet, Text, View } from "react-native";

const gitstyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'}});

export default function GitPage(item: any){
    const githubUsername = item.params?.githubUsername  //link to github
    return(
        <View style={gitstyle.container}>
            <WebView source={{uri: `https://github.com/${githubUsername}` }} style={{marginTop: 20}}/>
        </View>
    );
}