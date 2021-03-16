
import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';



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
                name="TabHome"
                component={HomeStack}
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