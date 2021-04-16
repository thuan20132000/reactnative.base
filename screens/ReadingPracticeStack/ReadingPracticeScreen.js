import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View,PermissionsAndroid } from 'react-native'
import { Card, Title, Paragraph,ProgressBar, IconButton } from 'react-native-paper';
import BottomRecordingNavigation from './components/BottomRecordingNavigation';
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import CommonIcons from '../../utils/CommonIcons';

import Sound from 'react-native-sound';


const audioRecorderPlayer = new AudioRecorderPlayer();

const ReadingPracticeScreen = (props) => {

    const [isRecording,setIsRecording] = useState(false);
    React.useEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            });
        }

    }, []);


    const path = Platform.select({
        android: 'sdcard/askmeit_dictionary/hello3.wav', // should give extra dir name in android. Won't grant permission to the first level of dir.
    });
    const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
    };
    const _onStartRecord = async () => {
        setTimeout(() => {
            var sound = new Sound('ding-sound-effect.mp3', Sound.MAIN_BUNDLE, (error) => {
                /* ... */
                if (error) {
                    console.log('error: ', error);
                    sound.release()

                }
            });
            setTimeout(() => {
                sound.play((success) => {
                    /* ... */
                    sound.release()

                })
            }, 100);
        }, 100);


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
                        setIsRecording(true);
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
    }



    const _onStopRecord = async () => {
        try {
            let a = await audioRecorderPlayer.stopRecorder();
            console.warn('remove: ', a);
            setIsRecording(false);

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
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: 'white'
            }}
        >

            <ScrollView>
                <Card>
                    <Card.Content>
                        <Title>Card title</Title>
                        <Paragraph
                            style={{
                                fontSize: 16,
                                lineHeight: 24,
                                fontStyle: 'normal',
                                fontWeight: 'normal'
                            }}
                            suppressHighlighting={true}
                            selectable={true}
                        >
                            There are different types of lotteries, such as Powerball, Mega Millions, and Lotto. Powerball and Mega Millions are known for their large payouts. There are also instant lottery tickets that are scratch-off cards. The winnings tend to be less money, but they are extremely popular.

                            In the United States, you can play the lottery, or buy a ticket if you are 18 years or older. If you win, usually you have the option of being paid the entire amount in one lump sum or of being paid smaller amounts over a number of years. Lottery winnings are taxable, meaning the amount you actually get is smaller than the jackpot number. People can buy lottery tickets or play the lottery at many convenience stores. Lotteries are also very popular since they advertise. There are many television commercials, radio commercials, and billboards urging people to play.

                            Lotteries have been controversial since they are essentially a form of legalized gambling. There is concern that it can lead to people becoming addicted to gambling. There are also illegal lottery games, usually run by some forms of organized crime.
                            Apartheid was a system of South African government that was based on racial segregation between the minority white population and black South Africans. It was a controversial form of government that was in effect from 1948 to 1994, and caused great social turmoil. The system was put into place following World War II, but racial segregation began much earlier in the country. Apartheid separated South Africans by race by placing people into four classifications: white, black, coloured, and Indian. Each group had different levels of privilege, with white South Africans being the most favored.

                            From 1960 to 1983, 3.5 million black South Africans were forcibly removed from their homes; in 1970, all non-white politicians were removed from government. Mandela’s move to end Apartheid began in 1949 when he supported, and organized non-violent boycotts, strikes, and civil disobedience. He was arrested, and charged with treason in 1956 for his role in the social uprising, and was eventually jailed for 27 years. During this time, most of the countries in the world called for his release, and placed trade embargos against the white regime.
                    </Paragraph>
                    </Card.Content>
                </Card>
            </ScrollView>
            <BottomRecordingNavigation
                onStartRecordPress={()=>{
                    _onStartRecord().then(()=>{
                        
                    })
                }}
                onStopRecordPress={_onStopRecord}
                isRecording={isRecording}
            >
                <View
                    style={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                >
                    <ProgressBar 
                        progress={0.5} 
                        color={'red'} 
                        style={{
                            width:220
                        }}
                    />
                    <IconButton
                        icon={CommonIcons.playCircleOutline}
                        color={'red'}
                        size={22}
                        onPress={_onStartPlay}
                    />
                </View>

            </BottomRecordingNavigation>

        </View>

    )
}

export default ReadingPracticeScreen

const styles = StyleSheet.create({})
