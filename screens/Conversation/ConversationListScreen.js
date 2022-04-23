import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ReadingCard from './components/ReadingCard'

import ConversationAPI from '../../app/API/ConversationAPI';
import RNProgressHud from 'progress-hud';
import TopicItem from './components/TopicItem';
import ConversationItem from './components/ConversationItem';
import { BannerAd, TestIds, BannerAdSize, } from '@react-native-firebase/admob';
import { removeUserAuth, setStorageData } from '../../app/StorageManager';
import { StackActions, useNavigation } from '@react-navigation/native';
import Constants from '../../app/constants/Constant';

const adUnitId = __DEV__ ? TestIds.BANNER : Constants.config.adbmod_banner;

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
                console.log('err" ', err)

            })
            .finally(() => { })

        ConversationAPI.getAllConversationPost()
            .then(res => {
                if (res.status_code == 200) {
                    setReadingPosts(res.data)
                }
            })
            .catch((err) => {
                removeUserAuth()
                navigation.dispatch(
                    StackActions.replace('Signin')
                )
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })



       


    }, []);




    const _onOpenPostPractice = (post) => {
        props.navigation.navigate('ConversationPractice', {
            conversationId: post?.id
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
                stickyHeaderIndices={[1]}
                showsVerticalScrollIndicator={false}
            >

                {/* <View
                    style={[{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        // borderBottomWidth:0.4,
                        // borderBottomColor:"gray",
                        alignSelf: 'center',
                        paddingVertical: 8
                    }]}
                >

                    <SelectionItem
                        imagePath={require('../../app/assets/images/ic_tutor.png')}
                        label={'Learners'}
                        onPress={_onNavigateLearner}


                    />
                </View> */}


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
                        keyExtractor={(item) => item?.id?.toString()}
                        contentContainerStyle={{
                            paddingVertical: 12,

                        }}

                    />

                </View>

                {/* body */}
                <FlatList

                    showsVerticalScrollIndicator={false}
                    data={readingPost}
                    renderItem={({ item, index }) => {
                        return (
                            <ConversationItem
                                key={item?.id?.toString()}
                                title={item.title}
                                image_path={item.image}
                                onPracticePress={() => _onOpenPostPractice(item)}
                                // onGroupPress={() => _onOpenConversationgroups(item)}
                                conversation={item}

                            />

                        )
                    }}
                    keyExtractor={(item) => item?.id?.toString()}
                    contentContainerStyle={{
                        paddingVertical: 12,

                    }}
                    numColumns={2}

                />


            </ScrollView>
        </SafeAreaView>

    )
}

export default ConversationList

const styles = StyleSheet.create({})
