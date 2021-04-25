
import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import { useSelector } from 'react-redux';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from './utils/CommonIcons';
import D_HomeSearchScreen from './screens/Dictionary/D_HomeSearchScreen';
import D_WordDefinitionScreen from './screens/Dictionary/D_WordDefinitionScreen';
import F_FlashCardHomeScreen from './screens/FlashCard/F_FlashCardHomeScreen';
import F_FlashCardChoiceScreen from './screens/FlashCard/F_FlashCardChoiceScreen';
import F_FLashCardPracticeScreen from './screens/FlashCard/F_FLashCardPracticeScreen';
import F_FlashCardPracticeFinishScreen from './screens/FlashCard/F_FlashCardPracticeFinishScreen';
import F_TopicVocabularyListScreen from './screens/FlashCard/F_TopicVocabularyListScreen';
import F_VocabularyDefinitionScreen from './screens/FlashCard/F_VocabularyDefinitionScreen';
import D_SearchHistoryScreen from './screens/Dictionary/D_SearchHistoryScreen';
import S_SettingHomeSceen from './screens/Settings/S_SettingHomeSceen';
import S_VocabularyRemindScreen from './screens/Settings/S_VocabularyRemindScreen';
import S_ContributionScreen from './screens/Settings/S_ContributionScreen';
import N_NotificationHomeScreen from './screens/Notification/N_NotificationHomeScreen';
import C_CommunityHomeScreen from './screens/Community/C_CommunityHomeScreen';
import C_CommunityPostDetailScreen from './screens/Community/C_CommunityPostDetailScreen';
import C_CommunityRecordPractiseScreen from './screens/Community/C_CommunityRecordPractiseScreen';
import F_FlashCardFieldScreen from './screens/FlashCard/F_FlashCardFieldScreen';
import F_FlashCardTopicScreen from './screens/FlashCard/F_FlashCardTopicScreen';
import ReadingListScreen from './screens/ReadingPracticeStack/ReadingListScreen';
import ReadingPracticeScreen from './screens/ReadingPracticeStack/ReadingPracticeScreen';
import ReadingVocabularyScreen from './screens/ReadingPracticeStack/ReadingVocabularyScreen';
import ReadingVocabularyPracticeScreen from './screens/ReadingPracticeStack/ReadingVocabularyPracticeScreen';
import ReadingVocabularyPracticeFinishScreen from './screens/ReadingPracticeStack/ReadingVocabularyPracticeFinishScreen';


const DictionaryStackNavigator = createStackNavigator();
const DictionaryStack = (props) => {

    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,

        },
    };


    return (
        <DictionaryStackNavigator.Navigator

        >
            <DictionaryStackNavigator.Screen
                name={"HomeSearch"}
                component={D_HomeSearchScreen}
                options={{
                    headerShown: false
                }}
            />
            <DictionaryStackNavigator.Screen
                name={"VocabularyDefinition"}
                component={D_WordDefinitionScreen}
            />
            <DictionaryStackNavigator.Screen
                name={"SearchHistory"}
                component={D_SearchHistoryScreen}
            />
        </DictionaryStackNavigator.Navigator>
    )
}





const FlashCardStackNavigator = createStackNavigator();
const FlashCardStack = () => {

    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,

        },
    };


    return (
        <FlashCardStackNavigator.Navigator
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS
            }}
        >
            <FlashCardStackNavigator.Screen
                name={'FlashCardField'}
                component={F_FlashCardFieldScreen}
                options={{
                    title: ""
                }}
            />
            <FlashCardStackNavigator.Screen
                name={"FlashCardHome"}
                component={F_FlashCardHomeScreen}
                options={{
                    title: "Chọn chủ đề"
                }}

            />
            <FlashCardStackNavigator.Screen
                name={"FlashCardTopic"}
                component={F_FlashCardTopicScreen}
                options={{
                    title: "Chọn Chủ Đề"
                }}

            />
            <FlashCardStackNavigator.Screen
                name={"FlashCardChoice"}
                component={F_FlashCardChoiceScreen}
                options={{
                    title: "Chọn từ"
                }}
            />
            <FlashCardStackNavigator.Screen
                name={"FlashCardPractice"}
                component={F_FLashCardPracticeScreen}
                options={{
                    title: "Luyện tập"
                }}
            />
            <FlashCardStackNavigator.Screen
                name={"FlashCardPracticeFinish"}
                component={F_FlashCardPracticeFinishScreen}
                options={{
                    title: "Hoàn thành"
                }}
            />
            <FlashCardStackNavigator.Screen
                name={"FlashCardTopicVocabulary"}
                component={F_TopicVocabularyListScreen}
                options={{
                    title: "Từng vựng chủ đề"
                }}
            />
            <FlashCardStackNavigator.Screen
                name={"VocabularyDefinition"}
                component={F_VocabularyDefinitionScreen}

            />

        </FlashCardStackNavigator.Navigator>
    )
}





const SettingStackNavigator = createStackNavigator();
const SettingStack = () => {
    return (
        <SettingStackNavigator.Navigator
            screenOptions={{
                title: "Thiết lập"
            }}
        >
            <SettingStackNavigator.Screen
                name={"SettingHome"}
                component={S_SettingHomeSceen}
            />
            <SettingStackNavigator.Screen
                name={"VocabularyRemind"}
                component={S_VocabularyRemindScreen}
            />
            <SettingStackNavigator.Screen
                name={"SearchHistory"}
                component={D_SearchHistoryScreen}
            />
            <SettingStackNavigator.Screen
                name={"Contribution"}
                component={S_ContributionScreen}
            />
            <SettingStackNavigator.Screen
                name={"VocabularyDefinition"}
                component={D_WordDefinitionScreen}
            />
        </SettingStackNavigator.Navigator>
    )
}



const ReadingPracticeStackNavigator = createStackNavigator();
const ReadingPracticeStack = () => {
    return (
        <ReadingPracticeStackNavigator.Navigator>
            <ReadingPracticeStackNavigator.Screen
                name={"ReadingList"}
                component={ReadingListScreen}
                options={{
                    title: "Luyện đọc"
                }}
            />
            <ReadingPracticeStackNavigator.Screen
                name={"ReadingPractice"}
                component={ReadingPracticeScreen}
                options={{
                    title: "Luyện đọc"
                }}
            />
            <ReadingPracticeStackNavigator.Screen
                name={"ReadingVocabulary"}
                component={ReadingVocabularyScreen}
                options={{
                    title: "Luyện đọc"
                }}
            />
            <ReadingPracticeStackNavigator.Screen
                name={"ReadingVocabularyPractice"}
                component={ReadingVocabularyPracticeScreen}
                options={{
                    title: "Luyện đọc"
                }}
            />
            <ReadingPracticeStackNavigator.Screen
                name={"ReadingVocabularyPracticeFinish"}
                component={ReadingVocabularyPracticeFinishScreen}
                options={{
                    title: "Luyện đọc"
                }}
            />
        </ReadingPracticeStackNavigator.Navigator>
    )
}



const NotificationStackNavigator = createStackNavigator();
const NotificationStack = () => {
    return (
        <NotificationStackNavigator.Navigator
            screenOptions={{
                title: "Thông báo"
            }}
        >
            <NotificationStackNavigator.Screen
                name={"NotificationHome"}
                component={N_NotificationHomeScreen}
            />
            <NotificationStackNavigator.Screen
                name={"VocabularyDefinition"}
                component={D_WordDefinitionScreen}
            />
        </NotificationStackNavigator.Navigator>
    )
}




const CommunityStackNavigator = createStackNavigator();
const CommunityStack = () => {
    return (
        <CommunityStackNavigator.Navigator>
            <CommunityStackNavigator.Screen
                name="CommunityHome"
                component={C_CommunityHomeScreen}
            />
            <CommunityStackNavigator.Screen
                name="CommunityPostDetail"
                component={C_CommunityPostDetailScreen}
            />
            <CommunityStackNavigator.Screen
                name="CommunityRecordPractise"
                component={C_CommunityRecordPractiseScreen}
            />
        </CommunityStackNavigator.Navigator>
    )
}

// 
const TabBottomNavigator = createBottomTabNavigator();
const TabBottom = () => {
    // const navigation = useNavigation();
    // console.warn('propsL: ',);

    return (
        <TabBottomNavigator.Navigator

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeStack') {
                        iconName = CommonIcons.homeCircle

                    } else if (route.name === 'FlashCard') {
                        iconName = CommonIcons.checkboxMarked
                    } else if (route.name === 'ReadingPracticeStack') {
                        iconName = CommonIcons.bookOpen
                    } else if (route.name === 'Accounts') {
                        iconName = CommonIcons.account
                    }
                    else if (route.name === 'Notification') {
                        iconName = CommonIcons.bell
                    }
                    else if (route.name === 'TabDictionary') {
                        iconName = CommonIcons.bookMarker

                    }
                    else {
                        iconName = CommonIcons.phoneSetting
                    }

                    // You can return any component that you like here!
                    return <MaterialCommunityIcon name={iconName} size={size} color={color} />;
                },
            })

            }


        >
            {/* <TabBottomNavigator.Screen
                name="Community"
                component={CommunityStack}
                options={{
                    title: "Cộng đồng",

                }}
            /> */}
            <TabBottomNavigator.Screen
                name="FlashCard"
                component={FlashCardStack}
                options={{
                    title: "Học Từ Vựng"
                }}
            />
            <TabBottomNavigator.Screen
                name="ReadingPracticeStack"
                component={ReadingPracticeStack}
                options={{
                    title: "Luyện Đọc"
                }}
            />
            {/* <TabBottomNavigator.Screen
                name="Notification"
                component={NotificationStack}
                options={{
                    title: "Thông báo",
                    // tabBarBadge: notificationNumber
                }}

            /> */}
            <TabBottomNavigator.Screen
                name="TabDictionary"
                component={DictionaryStack}
                options={{
                    title: "Từ điển",

                }}

            />
            <TabBottomNavigator.Screen
                name="TabSetting"
                component={SettingStack}
                options={{
                    title: "Thiết Lập"
                }}
            />
        </TabBottomNavigator.Navigator>
    )
}



export default function Router(props) {



    return (
        <NavigationContainer>
            <TabBottom

            />
        </NavigationContainer>
    )
}