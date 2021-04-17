import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View, PermissionsAndroid, Animated, Easing } from 'react-native'
import { Card, Title, Paragraph, ProgressBar, IconButton, FAB, Provider, Portal, Button } from 'react-native-paper';
import BottomRecordingNavigation from './components/BottomRecordingNavigation';
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import CommonIcons from '../../utils/CommonIcons';

import Sound from 'react-native-sound';
import { millisToMinutesAndSeconds } from '../../utils/helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import ButtonText from '../../components/Button/BottonText';

const audioRecorderPlayer = new AudioRecorderPlayer();

const ReadingPracticeScreen = (props) => {

    const _refRecordingTime = React.useRef();
    const _refScrollView = React.useRef();

    const scrollAnimation = React.useRef(new Animated.Value(0))
    const [contentHeight, setContentHeight] = useState(0)


    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recordingTime, setRecordingTime] = useState('00:00');
    const [practiceAudio, setPracticeAudio] = useState({
        "name": "reading_test.wav",
        "length": recordingTime

    });

    const [readStyle, setReadStyle] = useState({
        fontSize: 24,
        speed: 8
    });
    const [readSpeed, setReadSpeed] = useState(19)

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


    const _onRunTextScroll = () => {
        scrollAnimation.current.addListener((animation) => {
            // console.log('animarion value: ',animation);
            _refScrollView.current &&
                _refScrollView.current.scrollTo({
                    y: animation.value,
                    animated: false,
                })
        })

        if (contentHeight) {
            Animated.timing(scrollAnimation.current, {
                toValue: contentHeight,
                duration: (contentHeight * readSpeed),
                useNativeDriver: true,
                easing: Easing.linear,
            }).start()
        }
    }

    const _onIncreaseSpeed = () => {
        if (readStyle.speed >= 4) {
            return;
        }
        setReadStyle({ ...readStyle, speed: readStyle.speed + 1 });
    }

    const _onDecreaseSpeed = () => {
        if (readStyle.speed <= 1) {
            return;
        }
        setReadStyle({ ...readStyle, speed: readStyle.speed - 1 })
    }


    const _onStartRecord = async () => {

        await audioRecorderPlayer.stopPlayer();

        setTimeout(() => {
            _onRunTextScroll();

        }, 3000);

        audioRecorderPlayer.removePlayBackListener();
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
                        var time = 0;
                        _refRecordingTime.current = setInterval(() => {
                            // setRecordingTime(recordingTime + 1);
                            time = time + 1;
                            console.log('==> record: ', time);
                            let x = millisToMinutesAndSeconds(time * 1000);
                            setRecordingTime(x);
                        }, 1000);


                        audioRecorderPlayer.addRecordBackListener(e => {
                            // console.log('Recording . . . ', e.current_position);
                            let x = millisToMinutesAndSeconds(e.current_position);
                            console.log('time: ', x);
                            // console.log('rcL ', recordingTime)
                            // _refRecordingTime.current = x;
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
        clearInterval(_refRecordingTime.current);

        try {
            let a = await audioRecorderPlayer.stopRecorder();
            setIsRecording(false);
            audioRecorderPlayer.removeRecordBackListener();
            // console.log('recording time: ', _refRecordingTime);
            scrollAnimation.current.removeAllListeners();

            setPracticeAudio({
                name:"sdcard/askmeit_dictionary/hello3.wav",
                length:3200
            })


        } catch (error) {

            console.warn('error', error);
        }
    };




    const _onStartPlay = async () => {
        try {

            const path = Platform.select({
                android: 'sdcard/askmeit_dictionary/hello3.wav', // should give extra dir name in android. Won't grant permission to the first level of dir.
            });

            setIsPlaying(true);
            let e = await audioRecorderPlayer.startPlayer(path);


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
                        .finally(() => {
                            setIsPlaying(false);
                        })
                    // audioRecorderPlayer.removePlayBackListener()
                    // return;
                }

            });



        } catch (error) {
            // console.log('error: ', error);
            throw error
        }
    }







    React.useEffect(() => {


        return () => {
            clearInterval(_refRecordingTime.current);
            audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
            audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
            scrollAnimation.current.removeAllListeners()


        }
    }, []);


    const _onRemoveRecordingAudio = () => {
        setPracticeAudio(null);
    }


    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: 'white'
            }}
        >

            <Animated.ScrollView
                ref={_refScrollView}
                onContentSizeChange={(width, height) => {
                    setContentHeight(height)
                }}
                showsVerticalScrollIndicator={false}

                onScrollBeginDrag={() => scrollAnimation.current.stopAnimation()}

            >
                <Card>

                    <View
                        style={{
                            paddingHorizontal: 12
                        }}
                    >
                        <Text
                            style={{
                                fontSize: readStyle.fontSize,
                                lineHeight: 62,
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                textAlign: 'justify',
                            }}
                            suppressHighlighting={true}
                            selectable={true}
                        >
                            There are different types of lotteries, such as Powerball, Mega Millions, and Lotto. Powerball and Mega Millions are known for their large payouts. There are also instant lottery tickets that are scratch-off cards. The winnings tend to be less money, but they are extremely popular.
                            Kenneth went to the movie theater. He likes to watch action movies. The more action, the better. He waited for his friends. They had planned to meet at 5 p.m. He waited outside. Twenty minutes passed. His friends were not there. He called one of them. It went straight to voicemail. He wondered where his friends were.

                            He was getting upset. He called his other friends. They did not answer. He went back to the theater. He bought a ticket. He went to the concession stand. He bought popcorn and soda. He went inside the viewing room. He found a comfy seat. He sat down. He watched the movie all by himself.
                            By the time children reach the age of three, parents will often enroll them into preschool. Some schools offer classes for children who are as young as two, but three is usually the youngest age children begin their education. After preschool comes kindergarten to 6th grade in the public school system. The 6th grade is the last year of elementary school. Once a child has completed elementary school, he or she will be enrolled into high school, which is from Grade 9 through 12. When students reach the 12th grade, they have completed their required education. Beyond the 12th grade, furthering your education is optional.



                    </Text>
                    </View>
                </Card>
            </Animated.ScrollView>
            <BottomRecordingNavigation
                onStartRecordPress={() => {
                    _onStartRecord().then(() => {

                    })
                }}
                onStopRecordPress={_onStopRecord}
                isRecording={isRecording}
                recordingTime={recordingTime}
            >


                <View
                    style={
                        {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    }
                >
                    {
                        isRecording ?
                            <IconButton
                                icon={CommonIcons.pauseCircleOutline}
                                color={'red'}
                                size={34}
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'coral',

                                }}
                                onPress={_onStopRecord}
                            />
                            :
                            <IconButton
                                icon={CommonIcons.recordCircle}
                                color={'red'}
                                size={34}
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'coral',

                                }}
                                onPress={_onStartRecord}
                            />

                    }
                </View>

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >


                    {
                        isRecording
                        &&
                        <ProgressBar
                            progress={0.5}
                            color={'red'}
                            style={{
                                width: 220
                            }}
                            indeterminate={true}
                        />
                    }

                    {/* Playing Button */}
                    {
                        (!isRecording && practiceAudio) &&
                        <View
                            style={{
                                display:'flex',
                                flexDirection:'row',
                                alignItems:'center'
                            }}
                        >
                            <IconButton
                                icon={CommonIcons.playCircleOutline}
                                color={'red'}
                                size={43}
                                onPress={_onStartPlay}
                                style={{
                                    // position: 'absolute',
                                    // left: 10,
                                    // bottom: 10
                                }}
                            />
                            <ProgressBar
                                progress={0.5}
                                color={'red'}
                                style={{
                                    width: 220
                                }}
                                indeterminate={true}
                            />
                            <IconButton
                                icon={CommonIcons.shareVariant}
                            />
                             <IconButton
                                icon={CommonIcons.removeTrash}
                                onPress={_onRemoveRecordingAudio}
                            />
                        </View>
                    }
                </View>





                {
                    (!isPlaying && !isRecording) &&

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}
                    >

                        <View
                            style={{
                                backgroundColor: 'white',
                                display: 'flex',
                                flexDirection: 'row',
                                borderRadius: 6,
                                alignItems: 'center',
                                justifyContent: 'center',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.34,
                                shadowRadius: 6.27,

                                elevation: 10,
                            }}
                        >
                            <IconButton
                                icon={CommonIcons.fontSizeDecrease}
                                size={22}
                                onPress={() => setReadStyle({ ...readStyle, fontSize: readStyle.fontSize - 1 })}
                            />
                            <Text>{readStyle.fontSize}</Text>
                            <IconButton
                                icon={CommonIcons.fontSizeIncrease}
                                size={22}
                                onPress={() => setReadStyle({ ...readStyle, fontSize: readStyle.fontSize + 1 })}

                            />
                        </View>



                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                borderRadius: 6,
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}
                        >
                            <Button onPress={() => setReadSpeed(19)}
                                style={[
                                    styles.buttonSpeed,
                                    readSpeed == 19 && {
                                        backgroundColor: 'grey'
                                    }
                                ]}
                            >
                                x1
                        </Button>
                            <Button onPress={() => setReadSpeed(16)}
                                style={[
                                    styles.buttonSpeed,
                                    readSpeed == 16 && {
                                        backgroundColor: 'grey'
                                    }
                                ]}
                            >
                                x2
                        </Button>
                            <Button onPress={() => setReadSpeed(13)}
                                style={[
                                    styles.buttonSpeed,
                                    readSpeed == 13 && {
                                        backgroundColor: 'grey'
                                    }
                                ]}
                            >
                                x3
                        </Button>

                        </View>
                    </View>

                }

            </BottomRecordingNavigation>

        </View>

    )
}

export default ReadingPracticeScreen

const styles = StyleSheet.create({
    buttonSpeed: {
        backgroundColor: 'grey',
        padding: 0,
        margin: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        backgroundColor: 'white'
    }
})
