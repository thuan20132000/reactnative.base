
import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from './utils/CommonIcons';
import D_HomeSearchScreen from './screens/Dictionary/D_HomeSearchScreen';
import D_WordDefinitionScreen from './screens/Dictionary/D_WordDefinitionScreen';
import F_FlashCardHomeScreen from './screens/FlashCard/F_FlashCardHomeScreen';
import F_FlashCardChoiceScreen from './screens/FlashCard/F_FlashCardChoiceScreen';


function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}



function AccountScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Account!</Text>
        </View>
    );
}



const DictionaryStackNavigator = createStackNavigator();
const DictionaryStack = () => {

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
            screenOptions={{
                transitionSpec: {
                    open: config,
                    close: config,
                },
                gestureEnabled:true,
                ...TransitionPresets.SlideFromRightIOS
            

            }}
        >
            <DictionaryStackNavigator.Screen
                name={"HomeSearch"}
                component={D_HomeSearchScreen}
                options={{
                    headerShown: false
                }}
            />
            <DictionaryStackNavigator.Screen
                name={"WordDefinition"}
                component={D_WordDefinitionScreen}
            />
        </DictionaryStackNavigator.Navigator>
    )
}




const FlashCardStackNavigator = createStackNavigator();
const FlashCardStack = () => {
    return (
        <FlashCardStackNavigator.Navigator
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS

            }}
        >
            <FlashCardStackNavigator.Screen
                name={"FlashCardHome"}
                component={F_FlashCardHomeScreen}

            />
            <FlashCardStackNavigator.Screen
                name={"FlashCardChoice"}
                component={F_FlashCardChoiceScreen}
            />

        </FlashCardStackNavigator.Navigator>
    )
}





// 
const HomeStackNavigator = createStackNavigator();
const HomeStack = () => {
    return (
        <HomeStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <HomeStackNavigator.Screen
                component={HomeScreen}
                name={"Home"}
                options={{
                    headerShown: false
                }}
            />
            <HomeStackNavigator.Screen
                component={SettingsScreen}
                name={"Setting"}
            />
        </HomeStackNavigator.Navigator>
    )
}





// 
const TabBottomNavigator = createBottomTabNavigator();
const TabBottom = () => {
    return (
        <TabBottomNavigator.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeStack') {
                        iconName = CommonIcons.homeCircle

                    } else if (route.name === 'Settings') {
                        iconName = CommonIcons.bookMarker
                    } else if (route.name === 'Messages') {
                        iconName = CommonIcons.messages
                    } else if (route.name === 'Accounts') {
                        iconName = CommonIcons.account
                    }
                    else if (route.name === 'Notification') {
                        iconName = CommonIcons.bell
                    }
                    else {
                        iconName = CommonIcons.newsPaper
                    }

                    // You can return any component that you like here!
                    return <MaterialCommunityIcon name={iconName} size={size} color={color} />;
                },
            })}

        >

            <TabBottomNavigator.Screen
                name="FlashCard"
                component={FlashCardStack}
            />
            <TabBottomNavigator.Screen
                name="TabDictionary"
                component={DictionaryStack}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: () => (
                        <View
                            style={{
                                backgroundColor: 'white',
                                padding: 12,
                                borderRadius: 12,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.37,
                                shadowRadius: 7.49,

                                elevation: 12,
                                width: 70,
                                height: 70,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 40,

                            }}
                        >
                            <MaterialCommunityIcon
                                name={CommonIcons.search}
                                color={'coral'}
                                size={42}

                            />
                        </View>
                    )
                }}

            />
            <TabBottomNavigator.Screen
                name="TabSetting"
                component={SettingsScreen}
            />
        </TabBottomNavigator.Navigator>
    )
}



export default function Router() {


    return (
        <NavigationContainer>
            <TabBottom />
        </NavigationContainer>
    )
}