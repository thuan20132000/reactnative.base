import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BOXSHADOW, COLORS } from '../../app/constants/themes'
import VocabularyItem from './components/VocabularyItem'
import ProgressCircle from 'react-native-progress-circle'
import { useNavigation, useRoute } from '@react-navigation/core'
import VOCABULARY_DATA from '../../data/vocabulary.json'
import PracticeVocabularyModel from '../../app/models/PracticeVocabularyModel'
import CommonColor from '../../utils/CommonColor'
import FirebaseManager from '../../app/FirebaseManager'
import { getUniqueId } from 'react-native-device-info'
import { Alert } from 'react-native'
const VocabularyListScreen = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const { desk } = route?.params ?? ''
    const [vocabularyList, setVocabularyList] = useState([])
    useEffect(() => {



        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            FirebaseManager.getDeskVocabulary(getUniqueId(), desk)
                .then(res => {
                    console.log(res)
                    let vocabularies = res?.map(e => new PracticeVocabularyModel({ ...e, native_name: e?.native_name }))
                    setVocabularyList(vocabularies)
                })

        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;


    }, [navigation])

    const _onShowPracticeScreen = () => {
        if (vocabularyList?.length <= 0) {
            return
        }
        navigation.navigate('VocabularyPractice', {
            data: vocabularyList
        })
    }

    const _onShowVocabularyDetail = (vocabulary) => {
        navigation.navigate('VocabularyCreate', {
            vocabulary: vocabulary,
            desk: desk
        })
    }

    const _onCreateVocabulary = () => {
        navigation.navigate('VocabularyCreate', {
            desk: desk
        })
    }
    const _onRemoveDesk = () => {

        Alert.alert(
            "",
            "Do you want to remove this desk?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        FirebaseManager.removeDesk(getUniqueId(), desk)
                            .then(res => {
                                console.log(res)
                                if (res) {
                                    navigation.goBack()
                                }

                            })
                    }
                }
            ]
        );

    }

    return (
        <View
            style={[
                styles.container
            ]}
        >

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 12,
                    justifyContent: 'center',
                    backgroundColor: 'white'
                }}
            >
                {/* <View style={{ flex: 1 }} >
                    <ProgressCircle
                        percent={Number(22)}
                        radius={60}
                        borderWidth={12}
                        color="#3399FF"
                        shadowColor="#999"
                        bgColor="#fff"

                    >
                        <Text style={{ fontSize: 18, color: CommonColor.primary }}>{22}%</Text>
                        <Text style={{ fontSize: 12, color: CommonColor.primary }}>Today's Progress</Text>
                    </ProgressCircle>
                </View> */}

                <TouchableOpacity
                    style={[styles.button]}
                    onPress={_onShowPracticeScreen}
                >
                    <Text style={{ fontWeight: '700', color: 'white' }}>Practise</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button]}
                    onPress={_onCreateVocabulary}
                >
                    <Text style={{ fontWeight: '700', color: 'white' }}>New Word</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'red' }]}
                    onPress={_onRemoveDesk}
                >
                    <Text style={{ fontWeight: '700', color: 'white' }}>Remove</Text>
                </TouchableOpacity>
            </View>


            <ScrollView
                style={{
                    backgroundColor: 'white'
                }}
            >
                {
                    vocabularyList?.map((item, index) =>
                        <VocabularyItem key={`${item?.name}-${index.toString()}`}
                            title={item?.name}
                            onItemPress={() => _onShowVocabularyDetail(item)}
                        />
                    )
                }

            </ScrollView>

        </View>
    )
}

export default VocabularyListScreen

const styles = StyleSheet.create({
    container: {

    },
    button: {
        backgroundColor: CommonColor.primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        borderRadius: 6,
        marginVertical: 2,
        flex: 1,
        marginHorizontal: 2,
        ...BOXSHADOW.normal
    }
})
