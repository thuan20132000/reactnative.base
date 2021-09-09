import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Input } from 'react-native-elements'
import ButtonText from '../../components/Button/BottonText'
import { COLORS } from '../../app/constants/themes'
import RNProgressHud from 'progress-hud'
import AuthenticationAPI from '../../app/API/AuthenticationAPI'
import AppManager from '../../app/AppManager'
import { setUserAuth } from '../../app/StorageManager'
import { TouchableWithoutFeedback } from 'react-native'
import { Keyboard } from 'react-native'


const UPDATE_KEY = {
    ADDRESS: 'userAddress',
    NAME: 'userName',
    PASSWORD: 'userPassword',
    PHONE: 'phoneNumber',
    REFCODE: 'refCode'
}

const UpdateUserInfoScreen = () => {

    const route = useRoute()
    const navigation = useNavigation()

    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [label, setLabel] = useState()


    useEffect(() => {
        switch (route?.params?.key) {
            case UPDATE_KEY.NAME:
                setLabel('Username')
                break;

            default:
                break;
        }

    }, [])

    const _onUpdateUserName = async () => {
        if (username.trim() == '' || username?.trim() == null) {
            return
        }
        RNProgressHud.show()
        try {
            let res = await AuthenticationAPI.updateUserInfo({ username: username })
            console.log(res)
            AppManager.shared.user.username = res.fullname
            AppManager.shared.user.fullname = res.fullname
            setUserAuth(AppManager.shared.user.toString())
            navigation.goBack()
        } catch (error) {
            console.log('err: ', error?.response?.data)
        }
        RNProgressHud.dismiss()
    }




    return (
        <SafeAreaView
            style={{
                backgroundColor: 'white',
                flex: 1
            }}
        >
            <TouchableWithoutFeedback
                onPress={()=>{
                    Keyboard.dismiss()
                }}
            >

                {
                    route?.params?.key == UPDATE_KEY.NAME &&
                    <View style={{
                        flex: 1,
                    }}>
                        <Input
                            label={label}
                            containerStyle={{
                                marginTop: 16
                            }}
                            autoFocus
                            onChangeText={text => setUsername(text)}
                            autoCapitalize='none'
                            value={username}
                            
                        />
                        <View style={{ flex: 1 }} />
                        <View>
                            <ButtonText
                                label={'UPDATE'}
                                containerStyle={styles.button}
                                labelStyle={{
                                    color: COLORS.secondary,
                                    fontSize: 16,
                                    fontWeight: '700'
                                }}
                                onItemPress={_onUpdateUserName}

                            />
                        </View>
                    </View>
                }
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default UpdateUserInfoScreen

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        borderWidth: 0.6,
        borderColor: COLORS.secondary,
        marginBottom: 32,
        height: 50,
    }
})
