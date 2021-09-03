import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import AppManager from '../../app/AppManager';

const ConversationVideoScreen = () => {

    const route = useRoute()
    const navigation = useNavigation()
    const { group } = route?.params ?? ''

    useEffect(() => {
        JitsiMeet.initialize();

        setTimeout(() => {
            const url = `https://meet.jit.si/practiceenglish/group${group?.id}`;
            const userInfo = {
                displayName: AppManager?.shared?.user?.username,
                email: 'user@gmail.com',
                avatar: AppManager.shared.user.profile_pic ?? '',
            };
            JitsiMeet.call(url, userInfo);
            /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
            /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
        }, 1200);
    }, [])

    useEffect(() => {
        return () => {
            JitsiMeet.endCall();
        };
    });

    function onConferenceTerminated(nativeEvent) {
        /* Conference terminated event */
        console.log('end call')
        navigation.goBack()

    }

    function onConferenceJoined(nativeEvent) {
        /* Conference joined event */
        
        console.log(nativeEvent)
    }

    function onConferenceWillJoin(nativeEvent) {
        /* Conference will join event */
        console.log(nativeEvent)
    }

    return (
        <JitsiMeetView
            onConferenceTerminated={e => onConferenceTerminated(e)}
            onConferenceJoined={e => onConferenceJoined(e)}
            onConferenceWillJoin={e => onConferenceWillJoin(e)}
            style={{
                height: '100%',
                width: '100%',
            }}

        />
    )
}

export default ConversationVideoScreen

const styles = StyleSheet.create({})
