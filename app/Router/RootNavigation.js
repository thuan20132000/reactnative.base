import React, { useEffect, useState } from 'react'

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import HomeStack from './HomeNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../../screens/Authentication/SignIn';
import { getUserAuth } from '../StorageManager';
import { View } from 'react-native';
import UserModel from '../models/userModel';
import AppManager from '../AppManager';


const Stack = createStackNavigator()
export default function RootNavigation() {


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'HomeStack'}>


                <Stack.Screen
                    name={"HomeStack"}
                    component={HomeStack}
                    options={{
                        headerShown: false
                    }}

                />
                <Stack.Screen
                    name={"Signin"}
                    component={SignIn}
                    options={{
                        headerShown: false
                    }}
                />

            </Stack.Navigator>

        </NavigationContainer>
    )
}