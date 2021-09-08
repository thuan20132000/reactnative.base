import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ReadingCard from './components/ReadingCard'

import ConversationAPI from '../../app/API/ConversationAPI';
import RNProgressHud from 'progress-hud';
import AppManager from '../../app/AppManager';
import TopicItem from './components/TopicItem';
import ConversationItem from './components/ConversationItem';
import { BOXSHADOW } from '../../app/constants/themes';

import { config } from '../../app/constants';

import { BannerAd, TestIds, BannerAdSize, Rewa, AdEventType } from '@react-native-firebase/admob';
import SearchBar from '../../components/shared/SearchBar';
import SelectionItem from './components/SelectionItem';
import { removeUserAuth, setStorageData } from '../../app/StorageManager';
import { StackActions, useNavigation } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import AuthenticationAPI from '../../app/API/AuthenticationAPI';

// const adUnitId = __DEV__ ? TestIds.BANNER : config.adbmod_android_banner;
const adUnitId = config.adbmod_android_banner;

const ConversationList = (props) => {
    const navigation = useNavigation()
    const [readingPost, setReadingPosts] = useState([]);
    const [conversationTopic, setConversationTopic] = useState([]);
    const _refTopicItem = useRef();
    const [selectedTopic, setSelectedTopic] = useState(null)
    useEffect(() => {


        RNProgressHud.show()
        ConversationAPI.getAllConversationTopic()
            .then(res => {
                if (res.status_code == 200) {
                    setConversationTopic(res.data)
                }
            })
            .catch((err) => {
                console.warn('err" ', err)

            })
            .finally(() => { })

        ConversationAPI.getAllConversationPost()
            .then(res => {
                if (res.status_code == 200) {
                    setReadingPosts(res.data)
                    _onUpdateNotificationId()
                }
            })
            .catch((err) => {
                console.warn('err all: ', err?.response?.data?.message ?? err)
                removeUserAuth()
                navigation.dispatch(
                    StackActions.replace('Signin')
                )
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })



        //Method for handling notifications opened
        OneSignal.setNotificationOpenedHandler(notification => {
            console.log("OneSignal: notification opened:", notification);
            navigation.navigate('Notification')
        });

        //Method for handling notifications received while app in foreground
        OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
            console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
            let notification = notificationReceivedEvent.getNotification();
            console.log("notification: ", notification);
            const data = notification.additionalData
            console.log("additionalData: ", data);

            // Complete with null means don't show a notification.
            notificationReceivedEvent.complete(notification);
        });




    }, []);


    const _onUpdateNotificationId = async () => {
        let { userId } = await OneSignal.getDeviceState()
        await AuthenticationAPI.updateNotificationId(userId)
    }



    const _onOpenPostPractice = (post) => {
        props.navigation.navigate('ConversationPractice', {
            groupConversation: post
        })
    }

    const _onOpenConversationgroups = async (conversation) => {
        props.navigation.navigate('ConversationGroup', {
            conversation: conversation
        })
    }

    const _onGetConversationByTopic = (topic, index) => {
        setSelectedTopic(index)
        _refTopicItem.current.scrollToIndex({ index: index, viewPosition: 0.5 })
        RNProgressHud.show()
        ConversationAPI.getAllConversationPost(topic?.id)
            .then(res => {
                if (res.status_code == 200) {
                    setReadingPosts(res.data)
                }
            })
            .catch((err) => {
                console.warn('err" ', err)
            })
            .finally(() => RNProgressHud.dismiss())
    }

    const _onNavigateLearner = () => {
        props.navigation.navigate('LearnerHome')
    }

    React.useLayoutEffect(() => {
        // props.navigation.setOptions({
        //     headerShown: false
        // })
        // const unsubscribe = props.navigation.addListener('focus', () => {
        //     props.navigation.dangerouslyGetParent().setOptions({
        //         tabBarVisible: true
        //     });
        // });
        // return unsubscribe;

    }, [])
    return (
        <SafeAreaView
            style={{
                backgroundColor: 'white',
                flex: 1
            }}
        >

            <ScrollView
                stickyHeaderIndices={[2]}
            >
                <View
                    style={[{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        // borderBottomWidth:0.4,
                        // borderBottomColor:"gray",
                        width: '80%',
                        alignSelf: 'center'
                    }]}
                >
                    <SelectionItem
                        imagePath={require('../../app/assets/images/ic_friends.png')}
                        label={'LEARNER'}
                        onPress={_onNavigateLearner}
                    />
                    {/* <SelectionItem
                        imagePath={require('../../app/assets/images/ic_tutor.png')}
                        label={'TUTOR'}

                    /> */}
                </View>

                <View
                    style={{
                        display: 'flex',
                        alignSelf: 'center',
                        backgroundColor: 'transparent'
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

                <View
                    style={{
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,

                        backgroundColor: 'white',
                    }}
                >
                    <FlatList
                        ref={_refTopicItem}

                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={conversationTopic}
                        renderItem={({ item, index }) => {
                            return (
                                <TopicItem
                                    image_path={item?.image}
                                    label={item?.name}
                                    labelStyle={{ color: 'red', fontWeight: '700' }}
                                    onItemPress={() => _onGetConversationByTopic(item, index)}

                                    containerStyle={selectedTopic == index ?
                                        {
                                            borderWidth: 1,
                                            borderColor: 'coral'
                                        } : {}
                                    }
                                />

                            )
                        }}
                        keyExtractor={(item) => item?.id}
                        contentContainerStyle={{
                            paddingVertical: 12,

                        }}

                    />

                </View>

                {/* body */}
                <View
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        backgroundColor: 'white',

                    }}
                >
                    {
                        readingPost?.map((item, index) => (
                            <ConversationItem
                                key={item?.id?.toString()}
                                title={item.title}
                                image_path={item.image}
                                onPracticePress={() => _onOpenPostPractice(item)}
                                onGroupPress={() => _onOpenConversationgroups(item)}
                            />
                        ))
                    }
                </View>


            </ScrollView>
        </SafeAreaView>

    )
}

export default ConversationList

const styles = StyleSheet.create({})
