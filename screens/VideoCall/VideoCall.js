
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet'
import ButtonText from '../../components/Button/BottonText';
import ReadingText from './components/ReadingText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../utils/CommonIcons';

const VideoCall = (props) => {

    const [isCalling, setIsCalling] = useState(false);

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
        <View
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
                            source={require('../../utils/photos/avatar1.jpeg')}
                            resizeMode="cover"
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30
                            }}
                        />
                        <Text style={{ fontWeight: '700', fontSize: 12 }}>Thuantruong</Text>
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
                <ReadingText readingpost={item} />
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
        </View>



    )
}

export default VideoCall
