import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import ConversationAPI from '../../app/API/ConversationAPI'
import AppManager from '../../app/AppManager'
import GroupCard from '../../components/Card/GroupCard'
import RNProgressHud from 'progress-hud'
import ConversationGroupModel from '../../app/models/conversationGroupModel'
import { useNavigation } from '@react-navigation/native'




const UserGroupScreen = () => {
    const navigation = useNavigation()
    const auth = AppManager.shared.user
    console.log(auth)
    const [groups, setGroups] = useState([])

    const _onGetUserGroupList = () => {
        RNProgressHud.show()
        ConversationAPI.getUserGroups(auth.id)
            .then(res => {
                if (res?.status_code === 200) {

                    let groupList = res?.data?.map((e) => new ConversationGroupModel(e))
                    // console.log('ss: ',groupList)
                    setGroups(groupList)
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    const _onOpenConversationPractice = (conversation, group) => {
        navigation.navigate('ConversationDetail', {
            groupConversation: conversation,
            group: group
        })
    }

    useLayoutEffect(() => {
        _onGetUserGroupList()
    }, [])

    return (
        <SafeAreaView>
            <Text></Text>
            {
                groups?.map((item, index) =>
                    <GroupCard
                        key={item?.id?.toString()}
                        authorImage={item?.author?.profile_pic}
                        groupName={item?.name}
                        conversationName={item?.conversation?.title}
                        onPress={() => _onOpenConversationPractice(item.conversation, item)}
                    />
                )
            }
        </SafeAreaView>
    )
}

export default UserGroupScreen

const styles = StyleSheet.create({})
