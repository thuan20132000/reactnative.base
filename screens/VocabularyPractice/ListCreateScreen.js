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
import firestore from '@react-native-firebase/firestore';
import FirebaseManager from '../../app/FirebaseManager'
import { getAndroidId, getDevice, getDeviceId, getUniqueId } from 'react-native-device-info'


const ListCreateScreen = () => {

    const navigation = useNavigation()
    const [listName, setListName] = useState('')


    const _onCreateList = () => {
        RNProgressHud.show()
        FirebaseManager.createDesk(listName, getUniqueId())
            .then(res => {
                if (res) {
                    navigation.goBack()
                }
            })
            .finally(() => RNProgressHud.dismiss())
    }

    return (
        <SafeAreaView
            style={{
                backgroundColor: 'white',
                flex: 1
            }}
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss()
                }}
            >

                {
                    <View style={{
                        flex: 1,
                    }}>
                        <Input
                            containerStyle={{
                                marginTop: 16
                            }}
                            autoFocus
                            onChangeText={text => setListName(text)}
                            autoCapitalize='none'
                            value={listName}

                        />
                        <View style={{ flex: 1 }} />
                        <View>
                            <ButtonText
                                label={'ADD'}
                                containerStyle={styles.buttonCreate}
                                labelStyle={{
                                    color: COLORS.secondary,
                                    fontSize: 16,
                                    fontWeight: '700'
                                }}
                                onItemPress={_onCreateList}

                            />
                        </View>
                    </View>
                }
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default ListCreateScreen

const styles = StyleSheet.create({
    buttonCreate: {
        backgroundColor: 'transparent',
        borderWidth: 0.6,
        borderColor: COLORS.secondary,
        marginBottom: 32,
        height: 50,
    }
})
