
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
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
import { config } from '../../app/constants';
import CommonImages from '../../utils/CommonImages';

import { BannerAd, TestIds, BannerAdSize, InterstitialAd, AdEventType } from '@react-native-firebase/admob';

const adUnitId = __DEV__ ? TestIds.BANNER : config.adbmod_android_banner;
const adUnitIdIntertitial = __DEV__ ? TestIds.INTERSTITIAL : config.adbmod_android_fullpage;


const interstitial = InterstitialAd.createForAdRequest(adUnitIdIntertitial, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'books', 'travel', 'medicine', 'fitness'],
});



const ConversationDetailScreen = (props) => {

    const { groupConversation, group } = props?.route?.params ?? ''
    const [isCalling, setIsCalling] = useState(false);
    const [conversation, setConversation] = useState(null);
    const [memberList, setMemberList] = useState([]);
    const [isRunTextScroll, setIsRunTextScroll] = useState(false);
    const [connectCode, setConnectCode] = useState('');
    const [loaded, setLoaded] = useState(false);

    const user_id = AppManager.shared.user?.id;

    const _refSocket = React.useMemo(() => new WebSocket(`ws://${config.IP_ADDRESS}:${config.PORT}/ws/conversation/${group?.id}/user/${user_id}/`), [])

    const _onCalling = () => {
        setIsCalling(true)
        try {

            const url = `https://meet.jit.si/thuantruongtest${group?.id}`;
            const userInfo = {
                displayName: 'thuantruong',
                email: 'user@example.com',
                avatar: 'https:/gravatar.com/avatar/abc123',
            };
            JitsiMeet.call(url, userInfo);
        } catch (error) {
            console.log('call error: ', error)
        }
        /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
        /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */

    }

    const _onEndCalling = () => {
        JitsiMeet.endCall()
        setIsCalling(false)
    }


    // _refSocket.onmessage = (e) => {
    //     // a message was received
    //     console.log(e.data);

    // };

    _refSocket.onmessage = (e) => {

        // a message was received
        let receivedData = JSON.parse(e.data)
        setConnectCode(receivedData?.message?.connect_code);
        switch (receivedData?.message?.connect_code) {
            case 'NEWMEMBER':
                _onGetGroupMembers()
                break;
            case 'DISCONNECT':
                _onGetGroupMembers()
                break;
            case 'RUN_SCROLL':
                setIsRunTextScroll(true)
                break;

            default:
                break;
        }
    };

    _refSocket.onopen = (e) => {
        // console.warn('open : ', e)

        let userInfo = {
            id: 1006,
            connect_code: "NEWMEMBER",
            userName: 'user test 1',
            image_path: 'https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg'
        }

        _refSocket.send(JSON.stringify(userInfo))
    }

    function onConferenceTerminated(nativeEvent) {
        /* Conference terminated event */
        console.log('terminated: ', nativeEvent);
    }

    function onConferenceJoined(nativeEvent) {
        /* Conference joined event */
        console.log('join: ', nativeEvent)

    }

    function onConferenceWillJoin(nativeEvent) {
        /* Conference will join event */
        console.log('will join: ', nativeEvent)
    }

    const _onGetGroupMembers = () => {
        ConversationAPI.getGroupMember(group?.id)
            .then((res) => {
                if (res?.status_code === 200) {
                    setMemberList(res.data)
                }
            })
            .catch((err) => {
                console.log('error: ', err)
            })
            .finally(() => {
                console.log('finnally')
            })
    }

    useLayoutEffect(() => {
        RNProgressHud.show();
        ConversationAPI.getConversationPostDetail(groupConversation?.id)
            .then((res) => {
                if (res.status_code == 200) {
                    setConversation(new ConversationPostModel(res?.data))
                }
            }).finally(() => {

                _onGetGroupMembers()
                RNProgressHud.dismissWithDelay(1.8)
            })

        props.navigation.setOptions({
            headerShown: false
        })
        // props.navigation.dangerouslyGetParent().setOptions({
        //     tabBarVisible: false,

        // });


        // Adv
        const eventListener = interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
                setLoaded(true);
            }
        });
        interstitial.load();

        // Start loading the interstitial straight away
        const unsubscribe = props.navigation.addListener('beforeRemove', () => {
            interstitial.show()
        });


        // Unsubscribe from events on unmount
        return () => {
            _refSocket.close(user_id, 'left screen')
            _onEndCalling()
            unsubscribe()
            eventListener()
        };
    }, [])


    // No advert ready to show yet
    if (!loaded) {
        return <View />;
    }


    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            <View
                style={{
                    display: 'flex',
                    alignSelf: 'center',
                    width: '50%',
                    alignItems: 'center'
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
            {/* header */}
            {
                group &&
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'white',
                        margin: 6,
                        borderRadius: 8,
                        overflow: 'hidden',
                        height: 80

                    }}
                >

                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            memberList.map((e, index) =>
                                <View key={e.id?.toString()}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        marginHorizontal: 4,

                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: e.profile_pic || CommonImages.avatar
                                        }}
                                        resizeMode="cover"
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20
                                        }}
                                    />
                                    <Text style={{ fontWeight: '700', fontSize: 12 }}>{e.username}</Text>
                                </View>

                            )
                        }

                    </ScrollView>

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
                                    console.log('fds')
                                }}

                            />

                        }
                        {
                            // !isCalling &&
                            // <View
                            //     style={{
                            //         alignSelf: 'center'
                            //     }}
                            // >
                            //     <MaterialCommunityIcons
                            //         name={CommonIcons.person}
                            //         size={35}
                            //         color={'red'}
                            //     />
                            // </View>
                        }
                    </View>
                </View>

            }


            {/* Content */}
            <View
                style={{
                    backgroundColor: 'white',
                    flex: 1
                }}
            >
                {
                    conversation &&
                    <ReadingText
                        group={group}
                        readingpost={conversation}
                        postContent={conversation?.content}
                        websocket={_refSocket}
                        // scrollEnable={group?.id ? false : true}
                        isRunTextScroll={isRunTextScroll}
                        setIsRunTextScroll={setIsRunTextScroll}
                        connect_code={connectCode}
                        type={'group'}
                    />

                }
            </View>


            {/* Bottom Buttons */}
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 2,
                    position: 'absolute',
                    bottom: 0,
                    alignSelf: 'center',
                }}
            >

                {
                    isCalling ?
                        <ButtonText
                            label={'ENDCALL'}
                            containerStyle={{
                                backgroundColor: 'red',
                                width: 120

                            }}
                            onItemPress={_onEndCalling}
                        /> :
                        <ButtonText
                            label={'Call'}
                            labelStyle={{
                                fontWeight: '700'
                            }}
                            onItemPress={_onCalling}
                            rightIcon
                            containerStyle={{
                                backgroundColor: 'green',
                                width: 120
                            }}

                        />


                }
            </View>


        </SafeAreaView>




    )
}

export default ConversationDetailScreen
