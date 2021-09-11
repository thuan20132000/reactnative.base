import { StackActions, useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import ConversationAPI from '../../app/API/ConversationAPI'
import ConversationGroupModel from '../../app/models/conversationGroupModel'
import ConversationItem from './components/ConversationItem'

const ConversationPractisingScreen = () => {
    const navigation = useNavigation()
    const [practisingGroupList, setPractisingGroupList] = useState([])

    const _onJoinGroupPractisingPress = (group) => {
        navigation.dispatch(
            StackActions.replace('ConversationDetail', {
                group: group,
                groupConversation: group?.conversation
            })
        )
    }

    const getPractisingGroups = async () => {
        try {
            let groupsRes = await ConversationAPI.getPractisingGroups()
            let groups = groupsRes?.data?.map(e => new ConversationGroupModel(e))
            setPractisingGroupList(groups)
        } catch (error) {
            console.warn('error: ', error)
        }
    }


    useEffect(() => {
        getPractisingGroups()
    }, [])

    return (
        <View>

            <FlatList

                showsVerticalScrollIndicator={false}
                data={practisingGroupList}
                renderItem={({ item, index }) => {
                    return (
                        <ConversationItem
                            key={item?.id?.toString()}
                            title={item.title}
                            image_path={item.image}
                            onJoinPress={() => _onJoinGroupPractisingPress(item)}
                            conversation={item?.conversation}

                        />

                    )
                }}
                keyExtractor={(item) => item?.id}
                contentContainerStyle={{
                    paddingVertical: 12,

                }}
                numColumns={2}

            />
        </View>
    )
}

export default ConversationPractisingScreen

const styles = StyleSheet.create({})
