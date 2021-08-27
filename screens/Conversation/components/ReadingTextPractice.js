import React, { useState } from 'react'
import { ScrollView, Linking, StyleSheet, Text, View, PermissionsAndroid, Animated, Easing, Platform, TextInput, ActivityIndicator, Alert, useWindowDimensions } from 'react-native'

import { FAB, Portal, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import RenderHtml from "react-native-render-html";
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import AppManager from '../../../app/AppManager';
import BottomReadingControl from '../../sharing/BottomReadingControl';



const audioRecorderPlayer = new AudioRecorderPlayer();

const ReadingTextPractice = ({ group, readingpost, postContent, setIsRunTextScroll }) => {
    const navigation = useNavigation();

    const _refRecordingTime = React.useRef();
    const _refScrollView = React.useRef();
    const [scrollEnable, setScrollEnable] = useState(true)
    const scrollAnimation = React.useRef(new Animated.Value(0))
    const [highlightVocabulary, setHighlightVocabulary] = React.useState(['Parent', 'Teacher']);

    const [readingPost, setReadingPost] = React.useState();
    const [readStyle, setReadStyle] = useState({
        fontSize: 24,
        speed: 65
    });
    const [contentHeight, setContentHeight] = useState(0)

    const _onPlayAudio = async () => {
        if (!readingpost?.audio) {
            return;
        }

        try {

            let reading_audio_path = readingpost?.audio;
            let e = await audioRecorderPlayer.startPlayer(reading_audio_path);
            await audioRecorderPlayer.setVolume(1.0);
            audioRecorderPlayer.addPlayBackListener((e) => {

                // let leave_time = e.duration - e.currentPosition;
                // let xx = millisToMinutesAndSeconds(leave_time);

                // setDuration(xx);
                // let progress = e.currentPosition / e.duration;
                // if (progress) {
                //     setCurrentProgress(progress);

                // }

                // console.log('playing...', xx);


                // if (e.currentPosition >= e.duration) {

                //     audioRecorderPlayer.stopPlayer()
                //         .then(() => {
                //             console.log('stopped play')
                //             audioRecorderPlayer.removePlayBackListener();
                //         })
                //         .catch((err) => {
                //             console.log('error: ', err);
                //             // setIsPlaying(false);

                //         })
                //         .finally(() => {
                //             setIsPlaying(false);
                //         })

                // }

            });



        } catch (error) {
            console.log('error: ', error);
        }


    }

    const _onStopPlayAudio = () => {
        audioRecorderPlayer.stopPlayer()
            .then(() => {
                console.log('stopped play')
                audioRecorderPlayer.removePlayBackListener();
            })
            .catch((err) => {
                console.log('error: ', err);
                // setIsPlaying(false);

            })


    }
    const [padding, setPadding] = useState(0)
    const _runScroll = () => {
        setPadding(800)
        scrollAnimation.current.addListener((animation) => {
            if (animation.value >= contentHeight) {
                setScrollEnable(true)
                setPadding(0)

            }

            setTimeout(() => {
                _refScrollView.current &&
                    _refScrollView.current.scrollTo({
                        y: animation.value,
                        animated: false,
                    })
            }, 2000);
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


    const _onResetTextScroll = () => {
        setPadding(0)

        setScrollEnable(true)
        scrollAnimation.current.setValue(0)
        setIsRunTextScroll(false)
        _onStopPlayAudio()


    }


    React.useEffect(() => {

        return () => {
            _onStopPlayAudio()
            scrollAnimation.current.removeAllListeners()
        }
    }, [])


    const _onNavigateToGroup = () => {
        navigation.navigate('ConversationGroup')
    }


    const [fabState, setFabState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setFabState({ open });

    const { width } = useWindowDimensions();


    const html = `${postContent}`;

    return (
        <>


            <Animated.ScrollView
                ref={_refScrollView}
                onContentSizeChange={(width, height) => {
                    setContentHeight(height)
                }}
                showsVerticalScrollIndicator={false}

                onScrollBeginDrag={() => {
                    scrollAnimation.current.stopAnimation()
                }}
                scrollEnabled={scrollEnable}


            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 12
                    }}
                >
                    <Text style={{ fontSize: 26, fontWeight: '600', color: 'red' }}>
                        {readingpost?.title}
                    </Text>
                </View>
                <RenderHtml
                    source={{ html }}
                    contentWidth={width}
                    baseStyle={{
                        paddingHorizontal: 12,
                        paddingBottom: padding

                    }}
                />
            </Animated.ScrollView>
            <BottomReadingControl
                onPlayAudio={_onPlayAudio}
                onResetScroll={_onResetTextScroll}
                onRunScroll={_runScroll}
            />

        </>
    )
}

export default ReadingTextPractice

const styles = StyleSheet.create({})
