
import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from './utils/CommonIcons';


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



// 
const HomeStackNavigator = createStackNavigator();
const HomeStack = () => {
    return (
        <HomeStackNavigator.Navigator>
            <HomeStackNavigator.Screen
                component={HomeScreen}
                name={"Home"}
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
        <TabBottomNavigator.Navigator>

            <TabBottomNavigator.Screen
                name="TabAccoung"
                component={AccountScreen}
            />
            <TabBottomNavigator.Screen
                name="TabHome"
                component={HomeStack}
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

                                // borderTopRightRadius:22,
                                // borderTopLeftRadius:22
                            }}
                        >
                            <MaterialCommunityIcon
                                name={CommonIcons.search}
                                color={'coral'}
                                size={22}
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