
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import ConversationAPI from '../../app/API/ConversationAPI';
import ConversationPostModel from '../../app/models/conversationPostModel';
import RNProgressHud from 'progress-hud';
import AppManager from '../../app/AppManager';
import { config } from '../../app/constants';
import CommonImages from '../../utils/CommonImages';
import ReadingTextPractice from './components/ReadingTextPractice';



import { BannerAd, TestIds, BannerAdSize, InterstitialAd, AdEventType } from '@react-native-firebase/admob';
import PracticeProgressModel from '../../app/models/PracticeProgressModel';

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
    const [todayPracticeProgress, setTodayPracticeProgress] = useState('')

    const user_id = AppManager.shared.user?.id;


    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        interstitial.load();

        RNProgressHud.show();
        let PracticeProgress = new PracticeProgressModel()
        PracticeProgress.startPractice()
        PracticeProgress.getCurrentPracticeDates()
            .then(res => {
                if (res) {
                    PracticeProgress.practice_minutes = res?.practice_minutes
                    PracticeProgress.id = res?.id
                    PracticeProgress.target_minutes = res?.target_minutes
                    PracticeProgress.date = new Date(res?.date)
                    setTodayPracticeProgress(res)
                }
            })

        ConversationAPI.getConversationPostDetail(groupConversation?.id)
            .then((res) => {
                if (res.status_code == 200) {
                    setConversation(new ConversationPostModel(res?.data))
                }
            }).finally(() => {
                RNProgressHud.dismissWithDelay(0.6)
            })

        props.navigation.setOptions({
            title: ""
        })



        // Adv
        const eventListener = interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
                setLoaded(true);
                RNProgressHud.dismiss()
            }
        });

        // Start loading the interstitial straight away
        const unsubscribe = props.navigation.addListener('beforeRemove', () => {
            interstitial.show()

        });


        // Unsubscribe from events on unmount
        return () => {
            unsubscribe()
            eventListener()
            PracticeProgress.endPractice()

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

        </SafeAreaView>




    )
}

export default ConversationPracticeScreen
