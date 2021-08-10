import React, { useEffect, useState } from 'react'

import { NavigationContainer } from "@react-navigation/native";
import HomeStack from './HomeNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../../screens/Authentication/SignIn';
import { getUserAuth } from '../StorageManager';
import { View } from 'react-native';
import UserModel from '../models/userModel';
import AppManager from '../AppManager';


const Stack = createStackNavigator()
export default function RootNavigation() {

    const [isShown, setIsShown] = useState(false)


    useEffect(() => {
        getUserAuth()
            .then(res => {
                console.warn('res: ', res)

                if (res === null) {
                    navigation.dispatch(
                        StackActions.replace('Signin')
                    )
                } else {
                    let user = new UserModel(res)
                    AppManager.shared.user = user
                    navigation.dispatch(
                        StackActions.replace('HomeStack')
                    )
                }


            })
            .catch((err) => {

            })
            .finally(() => {
                setIsShown(true)
            })

    }, [])


    if (!isShown) {
        return <View />
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'HomeStack'}>

                <Stack.Screen
                    name={"Signin"}
                    component={SignIn}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name={"HomeStack"}
                    component={HomeStack}
                    options={{
                        headerShown: false
                    }}

                />
            </Stack.Navigator>

        </NavigationContainer>
    )
}