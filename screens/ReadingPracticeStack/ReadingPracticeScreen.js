import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View, PermissionsAndroid, Animated, Easing, Platform, TextInput, ActivityIndicator } from 'react-native'
import { Card, Title, Paragraph, ProgressBar, IconButton, Provider, Portal, Button, Modal } from 'react-native-paper';
import BottomRecordingNavigation from './components/BottomRecordingNavigation';
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import CommonIcons from '../../utils/CommonIcons';

import Sound from 'react-native-sound';
import { millisToMinutesAndSeconds, _onConvertTextToSlug } from '../../utils/helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import ButtonText from '../../components/Button/BottonText';
import Highlighter from 'react-native-highlight-words';
import CommonColor from '../../utils/CommonColor';
import { getReadingPostDetail } from '../../utils/api_v1';
import AudioPlay from '../../components/Card/AudioPlay';

import { InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize, Rewa, AdEventType } from '@react-native-firebase/admob';
import {adbmod_android_app_id} from '../../config/api_config.json';
const adUnitId = __DEV__ ? TestIds.BANNER : adbmod_android_app_id;

var RNFS = require('react-native-fs');


const audioRecorderPlayer = new AudioRecorderPlayer();

const ReadingPracticeScreen = (props) => {


    const dirMusic = `${RNFS.ExternalStorageDirectoryPath}/Music`;

    const _refRecordingTime = React.useRef();
    const _refScrollView = React.useRef();

    const scrollAnimation = React.useRef(new Animated.Value(0))
    const [contentHeight, setContentHeight] = useState(0)

    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recordingTime, setRecordingTime] = useState('00:00');
    const [practiceAudio, setPracticeAudio] = useState();
    const [duration, setDuration] = React.useState();
    const [currentProgress, setCurrentProgress] = React.useState(0);
    const [practiceAudioName, setPracticeAudioName] = React.useState('');

    const { readingpost } = props.route?.params;

    const [readingPost, setReadingPost] = useState();
    const [highlightVocabulary, setHighlightVocabulary] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const [readStyle, setReadStyle] = useState({
        fontSize: 24,
        speed: 70
    });

    React.useEffect(() => {


        if (readingpost) {
            setReadingPost(readingpost);
        }


        getReadingPostDetail(readingpost.id)
            .then((res) => {
                if (res.status) {
                    setReadingPost(res.data);
                    return res.data;
                }
            })
            .then((res) => {
                if (res.reading_post_vocabulary?.length > 0) {

                    let nameList = res.reading_post_vocabulary.map((e) => e.name);
                    setHighlightVocabulary(nameList);
                }
                // console.warn('res2 : ', res.reading_post_vocabulary)
            })
            .catch((err) => {
                console.log('error: ', err)
            })
            .finally(() => console.log('finnally'))

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
        android: 'sdcard/hello3.wav', // should give extra dir name in android. Won't grant permission to the first level of dir.
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
                duration: (contentHeight * readStyle.speed),
                useNativeDriver: true,
                easing: Easing.linear,
            }).start()
        }
    }



    const practice_audio_path = dirMusic + "/reading_practice.wav";
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
                        // let audio_path = dirMusic+"/reading_practice.wav"
                        let audio_uri = await audioRecorderPlayer.startRecorder(practice_audio_path, audioSet);
                        setIsRecording(true);
              
                        audioRecorderPlayer.addRecordBackListener(e => {
                            // console.log('Recording . . . ', e.current_position);

                            let x = audioRecorderPlayer.mmssss(Math.floor(e.current_position));
                            setRecordingTime(x);

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
            await audioRecorderPlayer.stopRecorder();
            setIsRecording(false);
            audioRecorderPlayer.removeRecordBackListener();
            // console.log('recording time: ', _refRecordingTime);
            scrollAnimation.current.removeAllListeners();

            setPracticeAudio(practice_audio_path);


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
            let e = await audioRecorderPlayer.startPlayer(practice_audio_path);


            await audioRecorderPlayer.setVolume(1.0);
            audioRecorderPlayer.addPlayBackListener((e) => {
                // console.log(e.current_position);
                // console.log('playing...', e.current_position);
                let leave_time = e.duration - e.current_position;
                let xx = millisToMinutesAndSeconds(leave_time);
                setDuration(xx);
                let progress = e.current_position / e.duration;
                setCurrentProgress(progress);

                if (e.current_position === e.duration) {

                    audioRecorderPlayer.stopPlayer()
                        .then(() => {
                            // console.log('stopped play')
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

    const _onPausePlay = async () => {
        setIsPlaying(false)
        await audioRecorderPlayer.pausePlayer();
    }



    const readingText = "Claire was applying to private schools. Most private schools required letters of recommendation. Claire did not know who to ask. She felt like her teachers did not know her that well. Claire asked her teachers anyways. Some of them said yes, and some of them said no. One week later, Ms. Hershey gave Claire a letter of recommendation in an envelope. Claire wasn't supposed to open it, but she really wanted to know what Ms. Hershey wrote. Claire carefully tore it open and read the letter. She was disappointed. Ms. Hershey didn't write anything interesting about Claire. Ms. Hershey just wrote that Claire was a smart, nice girl. Claire couldn't get into her top schools with that letter. Claire asked her swim coach to write her a letter of recommendation. Her swim coach knew her well. The problem was that the swim coach wasn't the best writer. He did not go to college. Claire asked him to write a letter anyways. Of course, I'll write you a letter. I'll even send it to you, he said. One week later, Claire got an email from her swim coach. She was nervous to read what he wrote. Claire was impressed with the letter. Her swim coach was really funny, yet intelligent in the letter! ";



    const [saveAudioVisible, setSaveAudioVisible] = React.useState(false);


    const _onSavePracticeAudio = async () => {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Cool WRITE_EXTERNAL_STORAGE Permission",
                    message:
                        "Cool Photo App needs access to your sdcard " +
                        "so you can take awesome audio.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the sdcard");

                let audio_slug_name = _onConvertTextToSlug(practiceAudioName);

                RNFS.copyFile(practice_audio_path, dirMusic + `/${audio_slug_name}.wav`)
                    .then((success) => {
                        console.log('Save File successfully!');
                        setSaveAudioVisible(false);

                    })
                    .catch((err) => {
                        console.log('error: ', err.message);
                    });

                return;
            } else {
                console.log("Sdcard permission denied");
                return;
            }
        } catch (err) {
            console.warn(err);
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
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setPracticeAudio(null);
    }


    if (!readingPost) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator
                    size={'large'}
                    color={'coral'}
                />
            </View>
        )
    }




    return (
        <Provider>

            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    backgroundColor: 'white'
                }}
            >
                <Portal>
                    <Modal
                        visible={saveAudioVisible}
                        dismissable={false}
                        contentContainerStyle={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            marginHorizontal: 8,
                            borderRadius: 4,
                            justifyContent: 'space-between',
                            width: 320,
                            alignSelf: 'center',
                            padding: 12
                        }}
                    >
                        <TextInput
                            style={{
                                width: 220
                            }}
                            placeholder={`Name...`}
                            onChangeText={(text) => setPracticeAudioName(text)}
                            value={practiceAudioName}
                        />
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}
                        >
                            <ButtonText
                                label={'Cancel'}
                                labelStyle={{
                                    fontSize: 12
                                }}
                                onItemPress={() => setSaveAudioVisible(false)}
                            />
                            <ButtonText
                                label={'Save'}
                                labelStyle={{
                                    fontSize: 12
                                }}
                                onItemPress={_onSavePracticeAudio}
                            />

                        </View>
                    </Modal>
                </Portal>


                <Animated.ScrollView
                    ref={_refScrollView}
                    onContentSizeChange={(width, height) => {
                        setContentHeight(height)
                    }}
                    showsVerticalScrollIndicator={false}

                    onScrollBeginDrag={() => scrollAnimation.current.stopAnimation()}


                >

                    <View
                        style={{
                            backgroundColor: 'white',
                            paddingHorizontal: 12
                        }}
                    >
                        <Text
                            style={{
                                fontSize: readStyle.fontSize,
                                lineHeight: 52,
                                textAlign: 'justify',
                            }}
                            // suppressHighlighting={true}
                            // selectable={true}
                            allowFontScaling={true}

                        >
                            {
                                (readingPost?.content && readingPost.content || '') &&
                                <Highlighter
                                    highlightStyle={{ color:'red',fontWeight:'700' }}
                                    searchWords={highlightVocabulary}
                                    textToHighlight={readingPost?.content}
                                />

                            }

                        </Text>

                    </View>
                    
                </Animated.ScrollView>
                <View
                    style={{
                        display:'flex',
                        alignSelf:'center'
                    }}
                >
                    <BannerAd
                        unitId={adUnitId}
                        size={BannerAdSize.BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />

                </View>
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
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >

                                <AudioPlay
                                    onPlay={_onStartPlay}
                                    onPause={_onPausePlay}
                                    isPlaying={isPlaying}
                                    currentProgress={currentProgress}
                                    durationTime={duration}
                                />
                                <View
                                    style={{ display: 'flex', flexDirection: 'row' }}
                                >

                                    <IconButton
                                        icon={CommonIcons.saveFile}
                                        onPress={() => setSaveAudioVisible(true)}
                                    />
                                    <IconButton
                                        icon={CommonIcons.removeTrash}
                                        onPress={_onRemoveRecordingAudio}
                                    />

                                </View>
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
                                <Button onPress={() => setReadStyle({ ...readStyle, speed: 70 })}
                                    style={[
                                        styles.buttonSpeed,
                                        readStyle.speed == 70 && {
                                            backgroundColor: 'grey'
                                        }
                                    ]}
                                >
                                    x1
                        </Button>
                                <Button onPress={() => setReadStyle({ ...readStyle, speed: 50 })}
                                    style={[
                                        styles.buttonSpeed,
                                        readStyle.speed == 50 && {
                                            backgroundColor: 'grey'
                                        }
                                    ]}
                                >
                                    x2
                        </Button>
                                <Button onPress={() => setReadStyle({ ...readStyle, speed: 20 })}
                                    style={[
                                        styles.buttonSpeed,
                                        readStyle.speed == 30 && {
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
        </Provider>


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
