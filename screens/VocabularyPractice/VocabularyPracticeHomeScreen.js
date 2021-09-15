import { StackActions, useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../app/constants/themes'
import FirebaseManager from '../../app/FirebaseManager'
import ButtonText from '../../components/Button/BottonText'
import ListItem from './components/ListItem'

import firestore from '@react-native-firebase/firestore';
import { getUniqueId } from 'react-native-device-info'

const VocabularyPracticeHomeScreen = () => {

    const navigation = useNavigation()
    const [deskList, setDeskList] = useState([])

    const _onShowVocabularyCreate = () => {
        // navigation.dispatch(
        //     StackActions.replace('VocabularyCreate')
        // )
        navigation.navigate('ListCreate', {
            key: 'DeskList'
        })
    }


    const _onShowVocabularyDetail = () => {
        navigation.navigate('VocabularyList')

    }



    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            FirebaseManager.getDeskList(getUniqueId()).then(res => setDeskList(res))

        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;

    }, [navigation])

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white'

            }}
        >
            <View
                style={{ flex: 1 }}

            >
                <ScrollView
                    style={{
                        backgroundColor: 'white',
                    }}
                >
                    {
                        deskList?.map((item, index) =>
                            <ListItem onItemPress={_onShowVocabularyDetail} desk={item} />

                        )
                    }


                </ScrollView>

                <View>
                    <ButtonText
                        label={'ADD DESK'}
                        containerStyle={styles.buttonCreate}
                        labelStyle={{
                            color: COLORS.secondary,
                            fontSize: 16,
                            fontWeight: '700'
                        }}
                        onItemPress={_onShowVocabularyCreate}
                    />

                </View>
            </View>



        </SafeAreaView>
    )
}

export default VocabularyPracticeHomeScreen

const styles = StyleSheet.create({
    buttonCreate: {
        backgroundColor: 'transparent',
        borderWidth: 0.6,
        borderColor: COLORS.secondary,
        marginBottom: 32,
        height: 50,
    }
})
