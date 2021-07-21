import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ConversationAPI from '../../app/API/ConversationAPI';
import GroupCard from './components/GroupCard';
import RNProgressHud from 'progress-hud';
import ConversationGroupModel from '../../app/models/conversationGroupModel';
import { useNavigation } from '@react-navigation/native';

const ConversationGroupScreen = () => {
    const navigation = useNavigation();

    const [conversationGroup, setConversationGroup] = useState([]);
    useEffect(() => {

        RNProgressHud.show()
        ConversationAPI.getConversationGroup(1)
            .then((res) => {
                if (res.status_code === 200 && res?.data?.length > 0) {
                    let groups = res?.data.map(e => new ConversationGroupModel(e))
                    setConversationGroup(groups)
                }
            })
            .catch((err) => {
                navigation.goBack()
            })
            .finally(() => {
                RNProgressHud.dismissWithDelay(0.5)
            })
    }, [])

    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}
        >
            {
                conversationGroup.map((e) => {
                    return (
                        <GroupCard
                            authorName={e.author?.username}
                            authorImage={e.author?.profile_pic}
                            conversationName={e.conversation?.title}
                            groupName={e.name}
                        />
                    )
                })
            }
        </View>
    )
}

export default ConversationGroupScreen

const styles = StyleSheet.create({})
