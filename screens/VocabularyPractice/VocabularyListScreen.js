import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BOXSHADOW, COLORS } from '../../app/constants/themes'
import VocabularyItem from './components/VocabularyItem'
import ProgressCircle from 'react-native-progress-circle'
import { useNavigation } from '@react-navigation/core'
import VOCABULARY_DATA from '../../data/vocabulary.json'
import PracticeVocabularyModel from '../../app/models/PracticeVocabularyModel'
import CommonColor from '../../utils/CommonColor'
const VocabularyListScreen = () => {

    const navigation = useNavigation()


    const [vocabularyList, setVocabularyList] = useState([])
    useEffect(() => {

        let vocabularies = VOCABULARY_DATA?.map(e => new PracticeVocabularyModel({ ...e, native_name: e?.meaning }))
        setVocabularyList(vocabularies)

    }, [])

    const _onShowPracticeScreen = () => {
        navigation.navigate('VocabularyPractice', {
            data: vocabularyList
        })
    }

    const _onShowVocabularyDetail = (vocabulary) => {
        navigation.navigate('VocabularyCreate', {
            vocabulary: vocabulary
        })
    }

    const _onCreateVocabulary = () => {
        navigation.navigate('VocabularyCreate')
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
                <View style={{ flex: 1 }} >
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
                </View>

                <View style={{ flex: 1 }} >
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
                </View>
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
        padding: 12,
        borderRadius: 6,
        marginVertical: 2,
        ...BOXSHADOW.normal
    }
})
