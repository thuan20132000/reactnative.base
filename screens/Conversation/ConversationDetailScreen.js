
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet'
import ButtonText from '../../components/Button/BottonText';
import ReadingText from './components/ReadingText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../utils/CommonIcons';
import ConversationTopicModel from '../../app/models/conversationTopicModel';
import ConversationAPI from '../../app/API/ConversationAPI';
import ConversationPostModel from '../../app/models/conversationPostModel';
import RNProgressHud from 'progress-hud';
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import AppManager from '../../app/AppManager';

const ConversationDetail = (props) => {

    const [isCalling, setIsCalling] = useState(false);
    const [conversation, setConversation] = useState(null);

    const { item } = props?.route?.params

    const _onCalling = () => {
        setIsCalling(true)
        const url = `https://meet.jit.si/thuantruongtest${item?.id}`;
        const userInfo = {
            displayName: 'thuantruong',
            email: 'user@example.com',
            avatar: 'https:/gravatar.com/avatar/abc123',
        };
        JitsiMeet.call(url, userInfo);
        /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
        /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
    }

    const _onEndCalling = () => {
        JitsiMeet.endCall()
        setIsCalling(false)
    }

   

    function onConferenceTerminated(nativeEvent) {
        /* Conference terminated event */
        console.log('terminated: ', nativeEvent);
        console.warn('log out')
    }

    function onConferenceJoined(nativeEvent) {
        /* Conference joined event */
        console.log('join: ', nativeEvent)
        console.warn('log na')

    }

    function onConferenceWillJoin(nativeEvent) {
        /* Conference will join event */
        console.log('will join: ', nativeEvent)
        console.warn('will join')
    }


    useLayoutEffect(() => {

        console.log('sss ',AppManager.shared.user)

        RNProgressHud.show();

        ConversationAPI.getConversationPostDetail(1)
            .then((res) => {
                if (res.status_code == 200) {
                    setConversation(new ConversationPostModel(res?.data))
                }
            }).finally(() => {
                RNProgressHud.dismiss()
                console.log(conversation)
            })

        props.navigation.setOptions({
            headerShown: false
        })
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false,

        });

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            });
            _onEndCalling()
        };
    }, [])

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >

            {/* header */}
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    margin: 6,
                    borderRadius: 8,
                    overflow: 'hidden'
                }}
            >

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginHorizontal: 4
                        }}
                    >
                        <Image
                            source={{
                                uri:AppManager.shared.user?.image_path
                            }}
                            resizeMode="cover"
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30
                            }}
                        />
                        <Text style={{ fontWeight: '700', fontSize: 12 }}>{AppManager.shared?.user?.name}</Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginHorizontal: 4

                        }}
                    >
                        <Image
                            source={require('../../utils/photos/avatar1.jpeg')}
                            resizeMode="cover"
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30
                            }}
                        />
                        <Text style={{ fontWeight: '700', fontSize: 12 }}>ThaoNguyen</Text>
                    </View>

                </View>



                <View
                    style={{
                        width: 100,
                        height: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        backgroundColor: 'white'
                    }}
                >
                    {
                        isCalling &&
                        <JitsiMeetView
                            onConferenceTerminated={e => onConferenceTerminated(e)}
                            onConferenceJoined={e => onConferenceJoined(e)}
                            onConferenceWillJoin={e => onConferenceWillJoin(e)}
                            style={{
                                height: '100%',
                                width: '100%',

                            }}
                            onChange={() => {
                                console.warn('fds')
                            }}
                        />

                    }
                    {
                        !isCalling &&
                        <View
                            style={{
                                alignSelf: 'center'
                            }}
                        >
                            <MaterialCommunityIcons
                                name={CommonIcons.volumnHigh}
                                size={35}
                            />
                        </View>
                    }
                </View>
            </View>


            {/* Content */}
            <View
                style={{
                    backgroundColor: 'white',
                    flex: 1
                }}
            >
                {
                    conversation &&
                    <ReadingText readingpost={conversation} postContent={conversation?.content} />

                }
            </View>


            {/* Bottom Buttons */}
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    bottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                }}
            >
                {
                    isCalling ?
                        <ButtonText
                            label={'ENDCALL'}
                            containerStyle={{
                                backgroundColor: 'red'
                            }}
                            onItemPress={_onEndCalling}
                        /> :
                        <ButtonText
                            label={'JOIN'}
                            onItemPress={_onCalling}
                        />


                }
            </View>
        </SafeAreaView>



    )
}

export default ConversationDetail
