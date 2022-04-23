import React, { createRef, useEffect, useState } from 'react'

import { NavigationContainer, useNavigation, StackActions, createNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator, } from '@react-navigation/stack';
import OneSignal from 'react-native-onesignal';

import SignIn from '../../screens/Authentication/SignIn';
import { getUserAuth } from '../StorageManager';
import AppManager from '../AppManager';
import TabbarNavigation from './TabbarNavigation';
import ConversationPracticeScreen from '../../screens/Conversation/ConversationPracticeScreen';
import LearnerHomeScreen from '../../screens/Learner/LearnerHomeScreen';
import LearnerProfileScreen from '../../screens/Learner/LearnerProfileScreen';
import S_PrivacyPolicyScreen from '../../screens/Settings/S_PrivacyPolicyScreen';
import NotificationListScreen from '../../screens/Notification/NotificationListScreen';
import ConversationCommentScreen from '../../screens/Conversation/ConversationCommentScreen';
import WebviewScreen from '../../screens/sharing/WebviewScreen';
import UpdateUserInfoScreen from '../../screens/Settings/UpdateUserInfoScreen';
import Constants from '../constants/Constant';
import RecordingScreen from '../../screens/Recording/RecordingScreen';
import { RootStackParamList } from './RootStackScreenList';
import CommunityPostDetailScreen from '../../screens/Community/CommunityPostDetailScreen';
import CommunityPostCommentScreen from '../../screens/Community/CommunityPostCommentScreen';
import MyPracticePostScreen from '../../screens/Community/MyPracticePostScreen';
import RecordingCompleteScreen from '../../screens/Recording/RecordingCompleteScreen';
import AuthenticationAPI from '../API/AuthenticationAPI';
import NotificationEnum from '../Enums/NotificationEnum';

const Stack = createStackNavigator<RootStackParamList>()
export const _refRootNavigation = createNavigationContainerRef<RootStackParamList>()

export default function RootNavigation() {
    const [screen, setScreen] = useState("Signin")


    const _onUpdateNotificationId = async () => {
        let { userId } = await OneSignal.getDeviceState()
        await AuthenticationAPI.updateNotificationId(userId)
        console.log('userid: ', userId)

    }
    useEffect(() => {
        getUserAuth()
            .then(res => {
                if (res != null) {
                    AppManager.shared.user = res
                    _refRootNavigation.dispatch(
                        StackActions.replace('TabBar')
                    )
                    setScreen("TabBar")

                } else {
                    setScreen("Signin")
                }

            })
            .catch((err) => {
                console.warn('errors: ', err)
                _refRootNavigation.dispatch(
                    StackActions.replace('Signin')
                )
            })
            .finally(() => {
            })


        _onUpdateNotificationId()
        //Method for handling notifications opened
        OneSignal.setNotificationOpenedHandler(notificationReceivedEvent => {
            console.log("OneSignal: notification opened:", notificationReceivedEvent);
            const data = notificationReceivedEvent.notification.additionalData
            switch (data['notification_type']) {
                case NotificationEnum.COMMUNITY:
                    _refRootNavigation.navigate('CommunityPostDetailScreen', { post_id: data['id'] })
                    break;
                case NotificationEnum.CONVERSATION:
                    _refRootNavigation.navigate('ConversationPractice', { conversationId: data['id'] })
                    break;

                default:
                    break;
            }

            // navigation.navigate('Notification')
        });

        //Method for handling notifications received while app in foreground
        OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
            console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
            let notification = notificationReceivedEvent.getNotification();
            const data = notification.additionalData

            // Complete with null means don't show a notification.
            notificationReceivedEvent.complete(notification);
        });


        //Prompt for push on iOS
        OneSignal.promptForPushNotificationsWithUserResponse(response => {
            console.log("Prompt response:", response);
        });

    }, [])

    return (
        <NavigationContainer ref={_refRootNavigation}>
            <Stack.Navigator initialRouteName={'TabBar'}>
                <Stack.Screen
                    name={'TabBar'}
                    component={TabbarNavigation}
                    options={{
                        headerShown: false,
                        title: ""
                    }}
                />
                {/* <Stack.Screen
                name={"Signin"}
                component={SignIn}
                options={{
                    headerShown: false
                }}
            /> */}
                <Stack.Screen
                    name={'ConversationPractice'}
                    component={ConversationPracticeScreen}
                    options={{
                        title: "Practice"
                    }}
                />
                <Stack.Screen
                    name={"Signin"}
                    component={SignIn}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name={"LearnerHome"}
                    options={{
                        title: ""
                    }}
                    component={LearnerHomeScreen}
                />
                <Stack.Screen
                    name={"LearnerProfile"}
                    options={{
                        title: "Profile"
                    }}
                    component={LearnerProfileScreen}
                />

                <Stack.Screen
                    name={"PrivacyPolicy"}
                    component={S_PrivacyPolicyScreen}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name={"Notification"}
                    component={NotificationListScreen}
                    options={{
                        title: ""
                    }}

                />


                <Stack.Screen
                    name={"ConversationComment"}
                    component={ConversationCommentScreen}
                    options={{
                        title: ""
                    }}

                />

                <Stack.Screen
                    name={"Webview"}
                    component={WebviewScreen}
                    options={{
                        title: ""
                    }}

                />
                <Stack.Screen
                    name={"UpdateInfo"}
                    component={UpdateUserInfoScreen}
                    options={{
                        title: ""
                    }}

                />
                <Stack.Screen
                    name={"RecordingScreen"}
                    component={RecordingScreen}
                    options={{
                        title: ""
                    }}

                />
                <Stack.Screen
                    name={"CommunityPostDetailScreen"}
                    component={CommunityPostDetailScreen}
                    options={{
                        title: ""
                    }}

                />
                <Stack.Screen
                    name={"CommunityPostCommentScreen"}
                    component={CommunityPostCommentScreen}
                    options={{
                        title: ""
                    }}

                />
                <Stack.Screen
                    name={"MyPracticePostScreen"}
                    component={MyPracticePostScreen}
                    options={{
                        title: ""
                    }}

                />
                <Stack.Screen
                    name={"RecordingCompleteScreen"}
                    component={RecordingCompleteScreen}
                    options={{
                        title: ""
                    }}

                />
            </Stack.Navigator>

        </NavigationContainer>
    )
}