import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ConversationAPI from '../../app/API/ConversationAPI';
import FriendItem from './components/FriendItem'
import RNProgressHud from 'progress-hud';
import { useNavigation, useRoute } from '@react-navigation/core';
import FriendShipModel from '../../app/models/FriendShipModel';
import AppManager from '../../app/AppManager';
import UserModel from '../../app/models/userModel';

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
    const author = AppManager.shared.user

    const getFriends = () => {
        RNProgressHud.show()

        ConversationAPI.getUserFriendShip()
            .then(res => {
                if (res.status_code === 200) {
                    let userFriends = res?.data?.map(e => {
                        let friendship = new FriendShipModel(e)
                        if (friendship.sender.id == author?.id) {
                            return friendship.recipient
                        } else {
                            return friendship.sender
                        }
                    })
                    setFriendShips(userFriends)
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

        ConversationAPI.inviteFriendShipToConversation(friendship?.id, group?.id)
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
        getFriends()
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
                            address={item?.address}
                            name={item?.username}
                            imagePath={item?.profile_pic}
                            // description={item?.descriptions}
                            canInvite={group ? true : false}
                            onInvitePress={() => _onInviteToGroupConverastion(item)}
                            user={item}

                        />
                    ))
                }

            </ScrollView>
        </View>
    )
}

export default FriendListScreen

const styles = StyleSheet.create({})

