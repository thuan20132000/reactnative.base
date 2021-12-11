import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ConversationList from '../../screens/Conversation/ConversationListScreen';
import ProfileScreen from '../../screens/Settings/ProfileScreen';
import CommonIcons from '../../utils/CommonIcons';
import { StackActions, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AppManager from '../AppManager';
import RecordingScreen from '../../screens/Recording/RecordingScreen';
import Constants from '../constants/Constant';
import CommunityHomeScreen from '../../screens/Community/CommunityHomeScreen';
const TabbarNavigation = () => {
    const TabBottomNavigator = createBottomTabNavigator();
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
                    } else if (route.name === 'ReadingPractice') {
                        iconName = 'format-list-bulleted'
                    }
                    else if (route.name === 'Notification') {
                        iconName = CommonIcons.bell
                    }
                    else if (route.name === 'TabDictionary') {
                        iconName = CommonIcons.bookMarker

                    }
                    else if (route.name === 'VocabularyPracticeHome') {
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
            <TabBottomNavigator.Screen
                name="ReadingPractice"
                component={ConversationList}
                options={{
                    title: "Reading Practice"
                }}

            />
            <TabBottomNavigator.Screen
                name={Constants.screen.communityHomeScreen}
                component={CommunityHomeScreen}
                options={{
                    title: "Reading Practice"
                }}

            />
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

export default TabbarNavigation

const styles = StyleSheet.create({})
