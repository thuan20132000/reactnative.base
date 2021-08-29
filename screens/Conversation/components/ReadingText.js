import React, { useState } from 'react'
import { ScrollView, Linking, StyleSheet, Text, View, PermissionsAndroid, Animated, Easing, Platform, TextInput, ActivityIndicator, Alert, useWindowDimensions, TouchableOpacity } from 'react-native'

import { FAB, Portal, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import RenderHtml from "react-native-render-html";
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import AppManager from '../../../app/AppManager';
import RNProgressHud from 'progress-hud';
import ConversationAPI from '../../../app/API/ConversationAPI';
import CommonIcons from '../../../utils/CommonIcons';
import BottomReadingControl from '../../sharing/BottomReadingControl';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonColor from '../../../utils/CommonColor';

const audioRecorderPlayer = new AudioRecorderPlayer();

const ReadingText = ({ group, readingpost, postContent, websocket, isRunTextScroll = false, setIsRunTextScroll, connect_code, type }) => {
    const navigation = useNavigation();

    const _refRecordingTime = React.useRef();
    const _refScrollView = React.useRef();
    const [scrollEnable, setScrollEnable] = useState(true)
    const scrollAnimation = React.useRef(new Animated.Value(0))
    const [highlightVocabulary, setHighlightVocabulary] = React.useState(['Parent', 'Teacher']);

    const [readingPost, setReadingPost] = React.useState();
    const [readStyle, setReadStyle] = useState({
        fontSize: 24,
        speed: 55
    });
    const [contentHeight, setContentHeight] = useState(0)


    const _onRunTextScroll = () => {
        let data = {
            name: "thuantruong",
            message: "Hello mobile",
            type: "run",
            connect_code: 'RUN_SCROLL'
        }
        if (type == 'group') {
            websocket.send(JSON.stringify(data))
        }

    }



    React.useEffect(() => {
        switch (connect_code) {
            case 'RUN_SCROLL':

                setTimeout(() => {
                    _runScroll()
                }, 2000);
                break
            case 'RESET_SCROLL':
                _onResetTextScroll()
                break

            case 'PLAY_AUDIO':
                _onPlayAudio()
                break

            default:
                break;
        }
    }, [connect_code])

    const _onPlayAudio = async () => {
        _onStopPlayAudio()
        if (!readingpost?.audio) {
            return;
        }

        let data = {
            name: "thuantruong",
            message: "Hello mobile",
            type: "run",
            connect_code: 'PLAY_AUDIO'
        }
        if (type == 'group') {
            websocket.send(JSON.stringify(data))
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
            audioRecorderPlayer.stopPlayer()
        }


    }

    const _onStopPlayAudio = () => {
        audioRecorderPlayer.stopPlayer()
            .then(() => {
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
        setScrollEnable(false)
        scrollAnimation.current.addListener((animation) => {
            if (animation.value >= contentHeight) {
                setScrollEnable(true)
                _onResetTextScroll()
                setPadding(0)

            }
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


    const _onResetTextScroll = () => {
        setScrollEnable(true)
        setPadding(0)

        let data = {
            name: "thuantruong",
            message: "Hello mobile",
            type: "run",
            connect_code: 'RESET_SCROLL'
        }

        if (type == 'group') {
            websocket.send(JSON.stringify(data))
        }
        scrollAnimation.current.setValue(0)
        setIsRunTextScroll(false)
        _onStopPlayAudio()

    }

    const removeGroup = () => {
        RNProgressHud.show()
        ConversationAPI.removeGroup(group?.id)
            .then(res => {
                if (res?.status_code === 204) {
                    navigation.goBack()
                }
            })
            .catch((err) => {
                console.warn('err: ', err)
            })
            .finally(() => { RNProgressHud.dismiss() })
    }

    const _onRemoveGroup = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có muốn xóa nhóm không",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => removeGroup() }
            ]
        );
    }


    const _onShowFriendsScreen = () => {
        navigation.navigate('FriendList', {
            group: group,
        })
        console.log(group)
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
                    setContentHeight(height + 300)
                }}
                showsVerticalScrollIndicator={false}

                onScrollBeginDrag={() => {
                    scrollAnimation.current.stopAnimation()
                }}
                scrollEnabled={scrollEnable}


            >

                <RenderHtml
                    source={{ html }}
                    contentWidth={width}
                    baseStyle={{
                        paddingHorizontal: 12,
                        paddingBottom: padding
                    }}
                />
            </Animated.ScrollView>
         
            {
                (type == 'group' && AppManager.shared.user?.id == group?.author?.id) &&
                <BottomReadingControl
                    onPlayAudio={_onPlayAudio}
                    onResetScroll={_onResetTextScroll}
                    onRunScroll={_onRunTextScroll}
                    onShowFriends={_onShowFriendsScreen}
                />

            }
        </>
    )
}

export default ReadingText

const styles = StyleSheet.create({})
