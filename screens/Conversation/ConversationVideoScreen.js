import { useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';

const ConversationVideoScreen = () => {

    const route = useRoute()
    const { group } = route?.params ?? ''

    useEffect(() => {
        JitsiMeet.initialize();

        setTimeout(() => {
            const url = 'https://meet.jit.si/thuantruongtest';
            const userInfo = {
                displayName: 'User',
                email: 'user@example.com',
                avatar: 'https:/gravatar.com/avatar/abc123',
            };
            JitsiMeet.call(url, userInfo);
            /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
            /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
        }, 1000);
    }, [])

    useEffect(() => {
        return () => {
            JitsiMeet.endCall();
        };
    });

    function onConferenceTerminated(nativeEvent) {
        /* Conference terminated event */
        console.log(nativeEvent)
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
