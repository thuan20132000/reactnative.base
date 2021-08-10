import React from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import F_FlashCardChoiceScreen from "../../screens/FlashCard/F_FlashCardChoiceScreen";
import F_FlashCardFieldScreen from "../../screens/FlashCard/F_FlashCardFieldScreen";
import F_FlashCardHomeScreen from "../../screens/FlashCard/F_FlashCardHomeScreen";
import F_FlashCardPracticeFinishScreen from "../../screens/FlashCard/F_FlashCardPracticeFinishScreen";
import F_FLashCardPracticeScreen from "../../screens/FlashCard/F_FLashCardPracticeScreen";
import F_FlashCardTopicScreen from "../../screens/FlashCard/F_FlashCardTopicScreen";
import F_VocabularyDefinitionScreen from "../../screens/FlashCard/F_VocabularyDefinitionScreen";



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
                component={F_FlashCardTopicScreen}
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

export default FlashCardStack