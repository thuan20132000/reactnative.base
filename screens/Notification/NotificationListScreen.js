import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import ConversationAPI from '../../app/API/ConversationAPI'
import NotificationItem from './components/NotificationItem'
import RNProgressHud from 'progress-hud';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

//  Notification type

const NOTIFICATION_TYPE = {
    MESSAGE: 'ME',
    POST: 'PO',
    INVITE: 'IN',
    PROFILE: 'PR'
}


const NotificationListScreen = () => {

    const navigation = useNavigation()
    const [notificationList, setNotificationList] = useState([])

    const _onGetUserNotifications = async () => {
        RNProgressHud.show()
        ConversationAPI.getUserNotifications()
            .then(res => {
                console.warn('re: ', res)
                if (res.status_code === 200 && res.data?.length > 0) {
                    setNotificationList(res.data)
                }
            })
            .catch(err => {
                console.log('err: ', err)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    const _onShowFriendRequestScreen = (item) => {
        console.warn(item)
        switch (item?.notification_type) {
            case NOTIFICATION_TYPE.INVITE:
                navigation.navigate('FriendRequest')
                break;
            case NOTIFICATION_TYPE.PROFILE:
                navigation.navigate('LearnerProfile', {
                    user: {
                        id: item?.sender.id ?? item?.sender
                    }
                })

                break;

            default:
                break;
        }
    }


    useEffect(() => {
        _onGetUserNotifications()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            _onGetUserNotifications()

            return () => _onGetUserNotifications();
        }, [])
    );

    return (
        <SafeAreaView>
            <ScrollView>

                {
                    notificationList?.map((item, index) =>
                        <NotificationItem
                            title={item?.title}
                            body={item?.body}
                            onItemPress={() => _onShowFriendRequestScreen(item)}
                        />
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default NotificationListScreen

const styles = StyleSheet.create({})
