
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
import ReadingTextPractice from './components/ReadingTextPractice';



import { BannerAd, TestIds, BannerAdSize, InterstitialAd, AdEventType } from '@react-native-firebase/admob';

const adUnitId = __DEV__ ? TestIds.BANNER : config.adbmod_android_banner;
const adUnitIdIntertitial = __DEV__ ? TestIds.INTERSTITIAL : config.adbmod_android_fullpage;

const interstitial = InterstitialAd.createForAdRequest(adUnitIdIntertitial, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'books', 'travel', 'medicine', 'fitness'],
});



const ConversationPracticeScreen = (props) => {

    const { groupConversation, group } = props?.route?.params ?? ''
    const [isCalling, setIsCalling] = useState(false);
    const [conversation, setConversation] = useState(null);
    const [memberList, setMemberList] = useState([]);
    const [isRunTextScroll, setIsRunTextScroll] = useState(false);
    const [connectCode, setConnectCode] = useState('');

    const user_id = AppManager.shared.user?.id;


    const [loaded, setLoaded] = useState(false);

    useLayoutEffect(() => {
        RNProgressHud.show();
        ConversationAPI.getConversationPostDetail(groupConversation?.id)
            .then((res) => {
                if (res.status_code == 200) {
                    setConversation(new ConversationPostModel(res?.data))
                }
            }).finally(() => {
                RNProgressHud.dismissWithDelay(1.6)
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
                RNProgressHud.dismiss()
            }
        });
        interstitial.load();

        // Start loading the interstitial straight away
        const unsubscribe = props.navigation.addListener('beforeRemove', () => {
            interstitial.show()
        });
        // Unsubscribe from events on unmount
        return () => {
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

            {/* header */}
            {
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
                                        marginHorizontal: 4

                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: e.profile_pic || CommonImages.avatar
                                        }}
                                        resizeMode="cover"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 30
                                        }}
                                    />
                                    <Text style={{ fontWeight: '700', fontSize: 12 }}>{e.username}</Text>
                                </View>

                            )
                        }

                    </ScrollView>




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
                    <ReadingTextPractice
                        group={group}
                        readingpost={conversation}
                        postContent={conversation?.content}
                        // scrollEnable={group?.id ? false : true}
                        isRunTextScroll={isRunTextScroll}
                        setIsRunTextScroll={setIsRunTextScroll}
                        connect_code={connectCode}
                    />

                }
            </View>
            <View
                style={{
                    display: 'flex',
                    alignSelf: 'flex-start'
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

            {/* Bottom Buttons */}
            {/* <View
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
                                backgroundColor: 'red'
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
                        />


                }
            </View> */}
        </SafeAreaView>




    )
}

export default ConversationPracticeScreen