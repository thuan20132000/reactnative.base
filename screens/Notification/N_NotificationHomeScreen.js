import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import NotificationItem from './components/NotificationItem';
import { useDispatch, useSelector } from 'react-redux';
import * as notificationActions from '../../store/actions/notificationActions';

const N_NotificationHomeScreen = (props) => {

    const dispatch = useDispatch();
    const [notificationList, setNotificationList] = useState([]);
    const [notificationNumber, setNotificationNumber] = useState(0);
    React.useEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarBadge: notificationNumber
        })

    }, [notificationNumber])

    React.useEffect(() => {
        messaging().onNotificationOpenedApp(remoteMessage => {
            props.navigation.navigate('Notification');
        });


        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // console.warn('A new FCM message arrived!', JSON.stringify(remoteMessage));
            let newMessage = {
                title: remoteMessage.notification?.title,
                body: remoteMessage.notification?.body
            }
            setNotificationList(prev => [newMessage, ...prev]);
            // dispatch(notificationActions.increaseNotification());
            setNotificationNumber(notificationNumber + 1);



        });

        return unsubscribe;

    }, []);



    const _onNotificationPress = (vocabulary) => {
        // dispatch(notificationActions.decreaseNotification());
        setNotificationNumber(notificationNumber - 1);
        props.navigation.navigate('VocabularyDefinition', {
            vocabulary: vocabulary
        });

    }

    return (
        <View>
            {
                notificationList && notificationList.length > 0 &&
                notificationList.map((e, index) =>

                    <NotificationItem
                        key={index.toString()}
                        title={e.title}
                        body={e.body}
                        onItemPress={() => _onNotificationPress(e)}
                    />
                )
            }

        </View>
    )
}

export default N_NotificationHomeScreen

const styles = StyleSheet.create({})
