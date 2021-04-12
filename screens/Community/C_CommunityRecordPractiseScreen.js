import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View ,PermissionsAndroid} from 'react-native'
import { IconButton } from 'react-native-paper'
import ControlButton from '../../components/Button/ControlButton'
import CommonIcons from '../../utils/CommonIcons'
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';




const audioRecorderPlayer = new AudioRecorderPlayer();
const C_CommunityRecordPractiseScreen = (props) => {


    const [audioPath, setAudioPath] = useState('');

    const options = {
        sampleRate: 16000,  // default 44100
        channels: 1,        // 1 or 2, default 1
        bitsPerSample: 16,  // 8 or 16, default 16
        audioSource: 6,     // android only (see below)
        // wavFile: 'test.wav' // default 'audio.wav'
    };

    const [audioRecorderPlayerEvent, setAudioRecorderPlayerEvent] = useState();

    const path = Platform.select({
        android: 'sdcard/askmeit_dictionary/hello3.wav', // should give extra dir name in android. Won't grant permission to the first level of dir.
    });

    const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
    };


    const _onStartRecord = async () => {
        console.warn('ds')

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


    const _onStopRecord = async () => {
        try {
            let a = await audioRecorderPlayer.stopRecorder();
            console.warn('remove: ', a);
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
                console.log('playing...', e.current_position);

                if (e.current_position === e.duration) {

                    audioRecorderPlayer.stopPlayer()
                        .then(() => {
                            console.log('stopped play')
                            audioRecorderPlayer.removePlayBackListener();
                        })
                        .catch((err) => console.log('error: ', err))
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

        <>
            <ScrollView>
                <View
                    style={[
                        {
                            padding: 12
                        }
                    ]}
                >

                    <Text
                        style={[
                            {
                                fontSize: 22,
                                fontWeight: '500',
                                letterSpacing: 0.3,
                                lineHeight: 36,
                                textAlign: 'justify'
                            }
                        ]}
                    >
                        In our intermediate courses, 2nd English Course and Practice English and Reading, the readings have longer and more complex sentences. You’ll find a variety of topics about the challenges and opportunities in our society, including education, workplace and community issues, health and safety and many more.

                        You’ll learn and practice key vocabulary words before the reading activity. In the 2nd English Course you’ll learn background knowledge about the topic from the video story. These are important first steps to help you understand what you are reading.

                        Read along with the text while you listen to a native speaker read it. Listen and read several times and you’ll be improving your pronunciation and listening skills too. Remember, read to learn English!
                </Text>
                </View>
            </ScrollView>
            {/* Record Footer */}
            <View
                style={[
                    styles.row,
                    {
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                ]}
            >
                <ControlButton
                    label={'Bắt đầu'}
                    iconName={CommonIcons.playCircleOutline}
                    onItemPress={_onStartRecord}
                />
                <ControlButton
                    label={'Tạm Dừng'}
                    iconName={CommonIcons.pauseCircleOutline}
                    onItemPress={_onStopRecord}
                />
                <ControlButton
                    label={'Dừng'}
                    iconName={CommonIcons.pauseCircleOutline}
                    onItemPress={_onStartPlay}
                />
            </View>
        </>
    )
}

export default C_CommunityRecordPractiseScreen

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',

    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    }
})
