import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ReadingCard from './components/ReadingCard'

import ConversationAPI from '../../app/API/ConversationAPI';
import RNProgressHud from 'progress-hud';
import AppManager from '../../app/AppManager';
import TopicItem from './components/TopicItem';
import ConversationItem from './components/ConversationItem';
import { BOXSHADOW } from '../../app/constants/themes';

import { config } from '../../app/constants';

import { BannerAd, TestIds, BannerAdSize, Rewa, AdEventType } from '@react-native-firebase/admob';

const adUnitId = __DEV__ ? TestIds.BANNER : config.adbmod_android_app_id;

const ConversationList = (props) => {

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
                }
            })
            .catch((err) => {
                console.warn('err" ', err)
            })
            .finally(() => RNProgressHud.dismiss())

    }, []);



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

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerShown: false
        })
        const unsubscribe = props.navigation.addListener('focus', () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            });
        });
        return unsubscribe;

    }, [])
    return (
        <SafeAreaView
            style={{
                backgroundColor: 'white',
                flex: 1
            }}
        >
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
                                        borderColor: 'red'
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

            <FlatList
                data={readingPost}
                renderItem={({ item }) => {
                    return (
                        <ConversationItem
                            title={item.title}
                            image_path={item.image}
                            onPracticePress={() => _onOpenPostPractice(item)}
                            onGroupPress={() => _onOpenConversationgroups(item)}
                        />

                    )
                }}
                keyExtractor={(item) => item?.id}
                numColumns={2}
            // contentContainerStyle={{
            //     marginTop: 20,
            // }}

            />
            <View
                style={{
                    display: 'flex',
                    alignSelf: 'center',
                    backgroundColor:'transparent'
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
        </SafeAreaView>
    )
}

export default ConversationList

const styles = StyleSheet.create({})
