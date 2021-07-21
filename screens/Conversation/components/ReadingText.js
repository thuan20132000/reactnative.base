import React, { useState } from 'react'
import { ScrollView, Linking, StyleSheet, Text, View, PermissionsAndroid, Animated, Easing, Platform, TextInput, ActivityIndicator, Alert, useWindowDimensions } from 'react-native'

import { FAB, Portal, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import RenderHtml from "react-native-render-html";
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';



const audioRecorderPlayer = new AudioRecorderPlayer();

const ReadingText = ({ readingpost, postContent }) => {
    const navigation = useNavigation();

    const _refRecordingTime = React.useRef();
    const _refScrollView = React.useRef();

    const scrollAnimation = React.useRef(new Animated.Value(0))
    const [highlightVocabulary, setHighlightVocabulary] = React.useState(['Parent', 'Teacher']);

    const [readingPost, setReadingPost] = React.useState();
    const [readStyle, setReadStyle] = useState({
        fontSize: 24,
        speed: 45
    });
    const [contentHeight, setContentHeight] = useState(0)


    const _onRunTextScroll = () => {


        setTimeout(() => {
            _onRunScroll()
        }, 3000);
    }

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

    const _onRunScroll = () => {
        scrollAnimation.current.addListener((animation) => {
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


    React.useEffect(() => {

        return () => {
            _onStopPlayAudio()
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
        <Provider>
            <Portal>
                <FAB.Group
                    open={fabState.open}
                    icon={fabState.open ? 'calendar-today' : 'plus'}
                    actions={[
                        { icon: 'plus', onPress: () => console.log('Pressed add') },
                        {
                            icon: 'star',
                            label: 'Bắt đầu',
                            onPress: () => {
                                // scrollAnimation.current.stopAnimation((val => console.warn('v: ', val))
                                _onRunTextScroll()
                            },
                        },
                        {
                            icon: 'email',
                            label: 'Reset',
                            onPress: () => {
                                scrollAnimation.current.setValue(0)
                            },
                        },
                        {
                            icon: 'email',
                            label: 'Nghe',
                            onPress: () => {
                                _onPlayAudio()
                            },
                        },
                        {
                            icon: 'email',
                            label: 'Tạo nhóm',
                            onPress: () => {
                                _onNavigateToGroup()
                            },
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {

                    }}
                />
            </Portal>

            <Animated.ScrollView
                ref={_refScrollView}
                onContentSizeChange={(width, height) => {
                    setContentHeight(height)
                }}
                showsVerticalScrollIndicator={false}

                onScrollBeginDrag={() => {
                    scrollAnimation.current.stopAnimation()
                }}



            >
                <RenderHtml source={{ html }} contentWidth={width} baseStyle={{
                    paddingHorizontal: 12
                }} />
                {/* <View
                    style={{
                        backgroundColor: 'white',
                        paddingHorizontal: 12
                    }}
                >
                    <Text
                        style={{
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
                                highlightStyle={{ color: 'red', fontWeight: '700' }}
                                searchWords={highlightVocabulary}
                                textToHighlight={readingPost?.content}
                            />

                        }

                    </Text>

                </View> */}

            </Animated.ScrollView>
        </Provider>
    )
}

export default ReadingText

const styles = StyleSheet.create({})
