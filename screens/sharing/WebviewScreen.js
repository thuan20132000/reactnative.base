import { useRoute } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';

const WebviewScreen = () => {
    const route = useRoute()
    const {url} = route?.params ?? ''

    return (
        <View 
            style={{
                display:'flex',
                flex:1
            }}
        >
           <WebView source={{ uri: url }} />
        </View>
    )
}

export default WebviewScreen

const styles = StyleSheet.create({})
