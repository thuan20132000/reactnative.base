
import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import { useSelector } from 'react-redux';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from './utils/CommonIcons';
import F_FlashCardHomeScreen from './screens/FlashCard/F_FlashCardHomeScreen';
import F_FlashCardChoiceScreen from './screens/FlashCard/F_FlashCardChoiceScreen';
import F_FLashCardPracticeScreen from './screens/FlashCard/F_FLashCardPracticeScreen';
import F_FlashCardPracticeFinishScreen from './screens/FlashCard/F_FlashCardPracticeFinishScreen';
import F_TopicVocabularyListScreen from './screens/FlashCard/F_TopicVocabularyListScreen';
import F_VocabularyDefinitionScreen from './screens/FlashCard/F_VocabularyDefinitionScreen';
import S_SettingHomeSceen from './screens/Settings/S_SettingHomeSceen';
import S_VocabularyRemindScreen from './screens/Settings/S_VocabularyRemindScreen';
import S_ContributionScreen from './screens/Settings/S_ContributionScreen';

import F_FlashCardFieldScreen from './screens/FlashCard/F_FlashCardFieldScreen';
import F_FlashCardTopicScreen from './screens/FlashCard/F_FlashCardTopicScreen';
import ReadingListScreen from './screens/ReadingPracticeStack/ReadingListScreen';
import ReadingPracticeScreen from './screens/ReadingPracticeStack/ReadingPracticeScreen';
import ReadingVocabularyScreen from './screens/ReadingPracticeStack/ReadingVocabularyScreen';
import ReadingVocabularyPracticeScreen from './screens/ReadingPracticeStack/ReadingVocabularyPracticeScreen';
import ReadingVocabularyPracticeFinishScreen from './screens/ReadingPracticeStack/ReadingVocabularyPracticeFinishScreen';
import S_PrivacyPolicyScreen from './screens/Settings/S_PrivacyPolicyScreen';
import S_TermAndConditionsScreen from './screens/Settings/S_TermAndConditionsScreen';

import GrammarListScreen from './screens/Grammar/GrammarListScreen';
import GrammarDescriptionScreen from './screens/Grammar/GrammarDescriptionScreen';
import GrammarExcerciseScreen from './screens/Grammar/GrammarExcerciseScreen';
import ConversationDetailScreen from './screens/Conversation/ConversationDetailScreen';
import ConversationListScreen from './screens/Conversation/ConversationListScreen';
import A_Signin from './screens/Authentication/A_Signin';
import SignIn from './screens/Authentication/SignIn';
import { getUserAuth } from './app/StorageManager';
import AppManager from './app/AppManager';
import ConversationGroupScreen from './screens/Conversation/ConversationGroupScreen';
import ConversationPracticeScreen from './screens/Conversation/ConversationPracticeScreen';




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
                name={"Contribution"}
                component={S_ContributionScreen}
            />

            <SettingStackNavigator.Screen
                name={"PrivacyPolicy"}
                component={S_PrivacyPolicyScreen}
            />
            <SettingStackNavigator.Screen
                name={"TermConditions"}
                component={S_TermAndConditionsScreen}
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




const GrammarStackNavigator = createStackNavigator();
const GrammarStack = () => {
    return (
        <GrammarStackNavigator.Navigator>
            <GrammarStackNavigator.Screen
                name={"GrammarList"}
                component={GrammarListScreen}
                options={{
                    title: "Ngữ pháp"
                }}
            />
            <GrammarStackNavigator.Screen
                name={"GrammarDescription"}
                component={GrammarDescriptionScreen}
            />
            <GrammarStackNavigator.Screen
                name={"GrammarExcerciseScreen"}
                component={GrammarExcerciseScreen}
            />
        </GrammarStackNavigator.Navigator>
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
                    } else if (route.name === 'VideoCall') {
                        iconName = 'account-multiple-check'
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
                        iconName = CommonIcons.phoneSetting
                    }

                    // You can return any component that you like here!
                    return <MaterialCommunityIcon name={iconName} size={size} color={color} />;
                },
            })

            }


        >

            <TabBottomNavigator.Screen
                name="FlashCard"
                component={FlashCardStack}
                options={{
                    title: "FLASHCARD"
                }}
            />
            {/* <TabBottomNavigator.Screen
                name="ReadingPracticeStack"
                component={ReadingPracticeStack}
                options={{
                    title: "Luyện Đọc"
                }}
            /> */}
            <TabBottomNavigator.Screen
                name="VideoCall"
                component={VideoStack}
                options={{
                    title: "READING & SPEAKING"
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
                component={SettingStack}
                options={{
                    title: "SETTING"
                }}
            />
        </TabBottomNavigator.Navigator>
    )
}

const VideoStackNavigator = createStackNavigator();
const VideoStack = () => {

   
    const [isAuth, setIsAuth] = React.useState(false);
    const { userInformation } = useSelector(state => state.authentication);

    React.useEffect(() => {
      
        if (userInformation.toString()) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }

    }, [userInformation])

    return (
        <VideoStackNavigator.Navigator>

            {
                !isAuth &&
                <VideoStackNavigator.Screen
                    name={"Signin"}
                    component={SignIn}
                    options={{
                        title: "Sign In",
                        headerShown:false
                    }}
                />

            }

            {
                isAuth &&
                <>
                    <VideoStackNavigator.Screen
                        name={"ConversationList"}
                        component={ConversationListScreen}
                        options={{
                            title: "Practice List"
                        }}
                    />
                    <VideoStackNavigator.Screen
                        name={"ConversationPractice"}
                        component={ConversationPracticeScreen}
                        options={{
                            title: "Practice"
                        }}
                    />
                    <VideoStackNavigator.Screen
                        name={"ConversationDetail"}
                        component={ConversationDetailScreen}
                        options={{
                            title: "Practice Conversation"
                        }}

                    />
                    <VideoStackNavigator.Screen
                        name={"ConversationGroup"}
                        options={{
                            title: "Groups"
                        }}
                        component={ConversationGroupScreen}

                    />
                </>
            }


        </VideoStackNavigator.Navigator>
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