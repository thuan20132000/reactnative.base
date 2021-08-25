import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ConversationAPI from '../../app/API/ConversationAPI';
import FriendItem from './components/FriendItem'
import RNProgressHud from 'progress-hud';
import { useNavigation, useRoute } from '@react-navigation/core';

const FriendListScreen = (props) => {

    const route = useRoute()
    const navigation = useNavigation()

    const { group } = route?.params ?? ''

    const [learners, setLearners] = useState([]);
    const [friendships, setFriendShips] = useState([])
    const _onOpenLearnerProfile = (user) => {
        props.navigation.navigate('LearnerProfile', {
            user: user
        })
    }

    const getAllLearners = () => {
        RNProgressHud.show()

        ConversationAPI.getUserFriendShip()
            .then(res => {
                if (res.status_code === 200) {
                    console.warn(res.data)
                    setFriendShips(res.data)
                }
            })
            .catch((err) => {
                console.warn('err: ', err?.response?.data ?? err)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }



    const _onInviteToGroupConverastion = (friendship) => {
     
        RNProgressHud.show()

        ConversationAPI.inviteFriendShipToConversation(friendship?.recipient?.id, group?.id)
            .then((res) => {
                console.warn('invited: ', res)
            })
            .catch((err) => {
                console.warn('error: ', err)
            })
            .finally(() => {
                RNProgressHud.dismiss()

            })
    }

    useEffect(() => {
        getAllLearners()
    }, [])

    return (
        <View
            style={{
                backgroundColor: 'white',
                flex: 1
            }}
        >
            <ScrollView>
                {
                    friendships?.map((item, index) => (
                        <FriendItem
                            key={item?.id?.toString()}
                            onPress={() => _onOpenLearnerProfile(item)}
                            address={item?.recipient?.address}
                            name={item?.recipient?.username}
                            imagePath={item?.recipient?.profile_pic}
                            description={item?.recipient?.descriptions}
                            canInvite={group ? true : false}
                            onInvitePress={() => _onInviteToGroupConverastion(item)}

                        />
                    ))
                }

            </ScrollView>
        </View>
    )
}

export default FriendListScreen

const styles = StyleSheet.create({})

