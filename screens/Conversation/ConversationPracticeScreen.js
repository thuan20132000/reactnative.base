
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import ConversationAPI from '../../app/API/ConversationAPI';
import ConversationPostModel from '../../app/models/conversationPostModel';
import RNProgressHud from 'progress-hud';
import AppManager from '../../app/AppManager';
import CommonImages from '../../utils/CommonImages';
import ReadingTextPractice from './components/ReadingTextPractice';
import { SafeAreaView } from 'react-native-safe-area-context'


import { BannerAd, TestIds, BannerAdSize, InterstitialAd, AdEventType } from '@react-native-firebase/admob';
import PracticeProgressModel from '../../app/models/PracticeProgressModel';
import Constants from '../../app/constants/Constant';

const adUnitId = __DEV__ ? TestIds.BANNER : Constants.config.adbmod_android_banner;
const adUnitIdIntertitial = __DEV__ ? TestIds.INTERSTITIAL : Constants.config.adbmod_android_fullpage;

const interstitial = InterstitialAd.createForAdRequest(adUnitIdIntertitial, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'books', 'travel', 'medicine', 'fitness'],
});



const ConversationPracticeScreen = (props) => {

    const { groupConversation, group, conversationId } = props?.route?.params ?? ''
    const [isCalling, setIsCalling] = useState(false);
    const [conversation, setConversation] = useState(null);
    const [memberList, setMemberList] = useState([]);
    const [isRunTextScroll, setIsRunTextScroll] = useState(false);
    const [connectCode, setConnectCode] = useState('');
    const [todayPracticeProgress, setTodayPracticeProgress] = useState('')

    const user_id = AppManager.shared.user?.id;


    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

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

        ConversationAPI.getConversationPostDetail(conversationId)
            .then((res) => {
                if (res.status_code == 200) {
                    setConversation(new ConversationPostModel(res?.data))
                }
            })
            .catch(err => {
                console.warn('err: ', err)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })

        props.navigation.setOptions({
            title: ""
        })
        // Unsubscribe from events on unmount
        return () => {
            PracticeProgress.endPractice()
        };


    }, [])

    // No advert ready to show yet
    // if (!loaded) {
    //     return <View />;
    // }

    return (
        <View style={{ flex: 1 }}>

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

        </View>




    )
}

export default ConversationPracticeScreen
