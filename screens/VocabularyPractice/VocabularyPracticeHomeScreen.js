import { StackActions, useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../app/constants/themes'
import FirebaseManager from '../../app/FirebaseManager'
import ButtonText from '../../components/Button/BottonText'
import ListItem from './components/ListItem'

import firestore from '@react-native-firebase/firestore';
import { getUniqueId } from 'react-native-device-info'
import SpeechToText from '../sharing/SpeechToText'
import SearchBar from '../sharing/SearchBar'
import { Input } from 'react-native-elements/dist/input/Input'
import CommonColor from '../../utils/CommonColor'
import CommonIcons from '../../utils/CommonIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const VocabularyPracticeHomeScreen = () => {

    const navigation = useNavigation()
    const [deskList, setDeskList] = useState([])

    const _onShowVocabularyCreate = (deskId) => {
        // navigation.dispatch(
        //     StackActions.replace('VocabularyCreate')
        // )
        navigation.navigate('ListCreate', {
            desk_id: deskId
        })
    }


    const _onShowVocabularyDetail = (desk) => {
        navigation.navigate('VocabularyList', {
            desk: desk
        })

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

            <ScrollView
                style={{
                    backgroundColor: 'white',
                    flex: 1
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        paddingHorizontal: 12,
                        width: 60,
                        height: 60,
                        alignSelf: 'center',
                        borderWidth: 1,
                        borderRadius: 30,
                        margin: 6,
                        borderColor: CommonColor.primary
                    }}
                >

                    {/* <Text style={{ flex: 3, color: 'gray', fontStyle: 'italic' }}>
                        {started ? "I am listening..." : "Say something..."}
                    </Text> */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('VocabularySearch')}
                    >

                        <MaterialCommunityIcons
                            name={CommonIcons.search}
                            size={32}
                            color={'coral'}
                        />
                    </TouchableOpacity>

                </View>
                {
                    deskList?.map((item, index) =>
                        <ListItem
                            key={index.toString()}
                            onItemPress={() => _onShowVocabularyDetail(item)}
                            desk={item}
                        />

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
