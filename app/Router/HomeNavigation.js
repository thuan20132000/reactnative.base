import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackActions, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CommonIcons from "../../utils/CommonIcons";
import { getUserAuth } from "../StorageManager";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from 'react'
import FlashCardStack from "./FlashCardNavigation";
import ConversationList from "../../screens/Conversation/ConversationListScreen";
import ConversationPracticeScreen from "../../screens/Conversation/ConversationPracticeScreen";
import ConversationDetailScreen from "../../screens/Conversation/ConversationDetailScreen";
import ConversationGroupScreen from "../../screens/Conversation/ConversationGroupScreen";
import LearnerHomeScreen from "../../screens/Learner/LearnerHomeScreen";
import LearnerProfileScreen from "../../screens/Learner/LearnerProfileScreen";
import SignIn from "../../screens/Authentication/SignIn";
import S_SettingHomeSceen from "../../screens/Settings/S_SettingHomeSceen";
import { View, Platform } from "react-native";
import AppManager from "../AppManager";
import UserModel from "../models/userModel";
import S_PrivacyPolicyScreen from "../../screens/Settings/S_PrivacyPolicyScreen";
import ProfileScreen from "../../screens/Settings/ProfileScreen";
import UserGroupScreen from "../../screens/sharing/UserGroupScreen";
import NotificationListScreen from "../../screens/Notification/NotificationListScreen";
import FriendRequestScreen from "../../screens/sharing/FriendRequestScreen";
import FriendListScreen from "../../screens/Friends/FriendListScreen";
import ConversationVideoScreen from "../../screens/Conversation/ConversationVideoScreen";
import ConversationCommentScreen from "../../screens/Conversation/ConversationCommentScreen";
import WebviewScreen from "../../screens/sharing/WebviewScreen";
import UpdateUserInfoScreen from "../../screens/Settings/UpdateUserInfoScreen";
import { checkVersion } from "react-native-check-version";
import { Alert } from "react-native";
import { Linking } from "react-native";
import GrammarExcerciseScreen from "../../screens/Grammar/GrammarExcerciseScreen";



const Stack = createStackNavigator()


const TabBottomNavigator = createBottomTabNavigator();
const TabBottom = () => {
    const navigation = useNavigation();
    // console.warn('propsL: ',);
    const [isShown, setIsShown] = useState(false)

    const _onCheckIsAuthenticated = () => {

        if (!AppManager.shared.user) {
            navigation.dispatch(
                StackActions.replace('Signin')
            )
        }
    }




    return (
        <TabBottomNavigator.Navigator initialRouteName={'FlashCard'}

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeStack') {
                        iconName = 'format-list-bulleted'

                    } else if (route.name === 'FlashCard') {
                        iconName = CommonIcons.checkboxMarked
                    } else if (route.name === 'ReadingPracticeStack') {
                        iconName = CommonIcons.bookOpen
                    } else if (route.name === 'VideoCall') {
                        iconName = 'format-list-bulleted'
                    }
                    else if (route.name === 'Notification') {
                        iconName = CommonIcons.bell
                    }
                    else if (route.name === 'TabDictionary') {
                        iconName = CommonIcons.bookMarker

                    }
                    else if (route.name === 'TabGrammar') {
                        iconName = CommonIcons.bookMarker
                    }
                    else {
                        iconName = 'account-details'
                    }

                    // You can return any component that you like here!
                    return <MaterialCommunityIcon name={iconName} size={size} color={color} />;
                },
            })

            }


        >

            {
                Platform.OS === 'android' &&
                <TabBottomNavigator.Screen
                    name="FlashCard"
                    component={FlashCardStack}
                    options={{
                        title: "FLASHCARD"
                    }}
                />

            }
            {/* <TabBottomNavigator.Screen
                name="ReadingPracticeStack"
                component={ReadingPracticeStack}
                options={{
                    title: "Luyện Đọc"
                }}
            /> */}
            <TabBottomNavigator.Screen
                name="VideoCall"
                component={ConversationList}
                options={{
                    title: "Reading & Speaking"
                }}
                listeners={{
                    tabPress: _onCheckIsAuthenticated
                }}
            />
            {/* <TabBottomNavigator.Screen
                name="TabGrammar"
                component={GrammarStack}
                options={{
                    title: "Ngữ Pháp",
                    // tabBarBadge: notificationNumber
                }}

            /> */}
            <TabBottomNavigator.Screen
                name="TabSetting"
                component={ProfileScreen}
                options={{
                    title: "My Learning"
                }}
                listeners={{
                    tabPress: _onCheckIsAuthenticated
                }}
            />
        </TabBottomNavigator.Navigator>
    )
}




const HomeStack = () => {


    const [isShown, setIsShown] = useState(false)
    const navigation = useNavigation()

    useEffect(() => {

        checkVersion().then(res => {
            // console.log("Got version info:", res.url);
            if (res.needsUpdate) {
                Alert.alert('You need to update the new version!', '',
                    [
                        {
                            text: 'Update',
                            onPress: () => {
                                Linking.openURL(res.url)
                            }
                        }
                    ]
                )
                setIsShown(false)


            } else {
                getUserAuth()
                    .then(res => {
                        if (res != null) {
                            // let user = new UserModel(res)
                            // console.warn('aas: ', user)
                            AppManager.shared.user = res
                            // navigation.dispatch( 
                            //     StackActions.replace('HomeStack')
                            // )
                        }

                    })
                    .catch((err) => {
                        console.warn('errors: ', err)
                        // navigation.dispatch(
                        //     StackActions.replace('Signin')
                        // )
                    })
                    .finally(() => {
                        setIsShown(true)
                    })

            }

        })


    }, [])


    if (!isShown) {
        return <View />
    }

    return (
        <Stack.Navigator initialRouteName={'bottomTab'}>
            <Stack.Screen
                name={'bottomTab'}
                component={TabBottom}
                options={{
                    headerShown: false,
                    title: ""
                }}
            />

            <Stack.Screen
                name={'ConversationPractice'}
                component={ConversationPracticeScreen}
                options={{
                    title: "Practice"
                }}
            />
            <Stack.Screen
                name={'ConversationDetail'}
                component={ConversationDetailScreen}
                options={{
                    title: ""
                }}
            />
            <Stack.Screen
                name={'ConversationGroup'}
                component={ConversationGroupScreen}
                options={{
                    title: ""
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
                name={"Signin"}
                component={SignIn}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={"PrivacyPolicy"}
                component={S_PrivacyPolicyScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={"UserGroup"}
                component={UserGroupScreen}
                options={{
                    title: ""
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
                name={"FriendRequest"}
                component={FriendRequestScreen}
                options={{
                    title: ""
                }}

            />
            <Stack.Screen
                name={"FriendList"}
                component={FriendListScreen}
                options={{
                    title: ""
                }}

            />
            <Stack.Screen
                name={"ConversationVideo"}
                component={ConversationVideoScreen}
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
                name={"ConversationQuiz"}
                component={GrammarExcerciseScreen}
                options={{
                    title: ""
                }}

            />
        </Stack.Navigator>
    )
}

export default HomeStack