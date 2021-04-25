import React, { useState } from 'react'
import { PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import { FAB } from 'react-native-paper';
import PostCard from './components/card/PostCard';


const audioRecorderPlayer = new AudioRecorderPlayer();

const C_CommunityHomeScreen = (props) => {


    const _onPostDetailPress = (post) => {
        props.navigation.navigate('CommunityPostDetail');
    }

    return (
        <>
            <ScrollView>
                {/* <TouchableOpacity
                style={{
                    backgroundColor: 'coral',
                    padding: 12
                }}
                onPress={onStartRecord}
            >
                <Text>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: 'coral',
                    padding: 12
                }}
                onPress={onStopRecord}
            >
                <Text>Stop</Text>
            </TouchableOpacity>


            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: 22
                }}
            >
                <TouchableOpacity
                    style={[
                        styles.buttonPlay
                    ]}
                    onPress={_onStartPlay}
                >
                    <Text>On Play</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.buttonPlay
                    ]}
                >
                    <Text>On Stop Play</Text>
                </TouchableOpacity>
            </View> */}
                <PostCard
                    onPostDetailPress={_onPostDetailPress}
                />
                <PostCard />
                <PostCard />


            </ScrollView>
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => console.log('Pressed')}
            />
        </>
    )
}

export default C_CommunityHomeScreen

const styles = StyleSheet.create({
    buttonPlay: {
        display: 'flex',
        backgroundColor: 'coral',
        padding: 6,
        margin: 6
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 14,
    },

})
