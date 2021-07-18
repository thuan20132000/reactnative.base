import React, { useState } from 'react'
import { ScrollView, Linking, StyleSheet, Text, View, PermissionsAndroid, Animated, Easing, Platform, TextInput, ActivityIndicator, Alert } from 'react-native'
import Highlighter from 'react-native-highlight-words';
import ReadingModel from '../../../app/models/readingModel';
import ReadingPostDB from '../../../app/DB/ReadingPost';
import { FAB, Portal, Provider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ReadingText = ({ readingpost }) => {
    const navigation = useNavigation();

    const _refRecordingTime = React.useRef();
    const _refScrollView = React.useRef();

    const scrollAnimation = React.useRef(new Animated.Value(0))
    const [highlightVocabulary, setHighlightVocabulary] = React.useState(['Parent', 'Teacher']);

    const [readingPost, setReadingPost] = React.useState();
    const [readStyle, setReadStyle] = useState({
        fontSize: 24,
        speed: 35
    });
    const [contentHeight, setContentHeight] = useState(0)


    const _onRunTextScroll = () => {


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
        ReadingPostDB.getReadingPostDetail(readingpost?.id, res => {
            if (res) {
                let readingPost = new ReadingModel(res)
                setReadingPost(readingPost);
            }
        })
    }, [])



    const [fabState, setFabState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setFabState({ open });





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
                            label: 'Start',
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
                            icon: '0',
                            label: 'Remind',
                            onPress: () => console.log('Pressed notifications'),
                            small: false,
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

                <View
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
                 
                </View>

            </Animated.ScrollView>
        </Provider>
    )
}

export default ReadingText

const styles = StyleSheet.create({})
