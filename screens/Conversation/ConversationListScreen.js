import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ReadingCard from './components/ReadingCard'

import ConversationAPI from '../../app/API/ConversationAPI';
import RNProgressHud from 'progress-hud';
import AppManager from '../../app/AppManager';


const ConversationList = (props) => {

    const [readingPost, setReadingPosts] = useState([]);

    useEffect(() => {
        // ReadingPostDB.getReadingPost(success => {
        //     if (success && success.length > 0) {
        //         setReadingPosts(success)
        //     }
        // })
        RNProgressHud.show()
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
        props.navigation.navigate('ConversationDetail', {
            groupConversation: post
        })
    }

    const _onOpenConversationgroups = async (conversation) => {
        props.navigation.navigate('ConversationGroup',{
            conversation:conversation
        })
    }

    React.useLayoutEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            });
        });
        return unsubscribe;

    }, [])
    return (
        <View>

            <FlatList

                data={readingPost}
                renderItem={({ item }) => {
                    return (
                        <ReadingCard
                            title={item.title}
                            image_path={item.image}
                            onPracticePress={() => _onOpenPostPractice(item)}
                            onGroupPress={() => _onOpenConversationgroups(item)}
                        />

                    )
                }}
                keyExtractor={(item) => item?.id}

            />

        </View>
    )
}

export default ConversationList

const styles = StyleSheet.create({})
