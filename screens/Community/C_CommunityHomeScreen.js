import React, { useState } from 'react'
import { PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';


const audioRecorderPlayer = new AudioRecorderPlayer();

const C_CommunityHomeScreen = () => {

    const [audioPath, setAudioPath] = useState('');

    const options = {
        sampleRate: 16000,  // default 44100
        channels: 1,        // 1 or 2, default 1
        bitsPerSample: 16,  // 8 or 16, default 16
        audioSource: 6,     // android only (see below)
        // wavFile: 'test.wav' // default 'audio.wav'
    };

    const [audioRecorderPlayerEvent,setAudioRecorderPlayerEvent] = useState();

    const path = Platform.select({
        android: 'sdcard/askmeit_dictionary/hello3.wav', // should give extra dir name in android. Won't grant permission to the first level of dir.
    });

    const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
    };


    const onStartRecord = async () => {


        try {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                        {
                            title: 'Permissions for write access',
                            message: 'Give permission to your storage to write a file',
                            buttonPositive: 'ok',
                        },
                    );


                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('You can use the record');
                        let audio_uri = await audioRecorderPlayer.startRecorder(path, audioSet);
                        audioRecorderPlayer.addRecordBackListener(e => {
                            console.log('Recording . . . ', e.current_position);
                            return;
                        });

                        // console.log(`uri: ${audio_uri}`);
                        // setAudioPath(audio_uri);

                    } else {
                        console.log('permission denied');
                        return;
                    }
                } catch (err) {
                    console.warn(err);
                    return;
                }
            }

        } catch (error) {
            console.warn('error: ', error);
        }
    };


    const onStopRecord = async () => {
        try {
            let a = await audioRecorderPlayer.stopRecorder();
            console.warn('remove: ',a);
            audioRecorderPlayer.removeRecordBackListener();

        } catch (error) {

            console.warn('error', error);
        }
    };


    const _onStartPlay = async () => {
        try {



            const path = Platform.select({
                android: 'sdcard/askmeit_dictionary/hello3.wav', // should give extra dir name in android. Won't grant permission to the first level of dir.
            });

            await audioRecorderPlayer.startPlayer(path);

            await audioRecorderPlayer.setVolume(1.0);
            audioRecorderPlayer.addPlayBackListener((e) => {
                // console.log(e.current_position);
                console.log(e.duration);

                if (e.current_position === e.duration) {

                    audioRecorderPlayer.stopPlayer()
                    .then(()=>{
                        console.log('stopped play')
                        audioRecorderPlayer.removePlayBackListener();
                    })
                    .catch((err) => console.log('error: ',err))
                    .finally(() => console.log('finished'))
                    // audioRecorderPlayer.removePlayBackListener()
                    // return;
                }

            });



        } catch (error) {
            // console.log('error: ', error);
            throw error
        }
    }




    return (
        <View>
            <Text>Community Home</Text>
            <TouchableOpacity
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
            </View>
        </View>
    )
}

export default C_CommunityHomeScreen

const styles = StyleSheet.create({
    buttonPlay: {
        display: 'flex',
        backgroundColor: 'coral',
        padding: 6,
        margin: 6
    }
})
