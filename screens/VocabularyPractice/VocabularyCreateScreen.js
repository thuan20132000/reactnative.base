import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Input } from 'react-native-elements/dist/input/Input'
import { BOXSHADOW, COLORS } from '../../app/constants/themes'
import ButtonText from '../../components/Button/BottonText'
import CommonColor from '../../utils/CommonColor'
import CommonIcons from '../../utils/CommonIcons'
import CommonImages from '../../utils/CommonImages'
import SpeechToText from '../sharing/SpeechToText'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRoute, useNavigation } from '@react-navigation/core'
import FirebaseManager from '../../app/FirebaseManager'
import PracticeVocabularyModel from '../../app/models/PracticeVocabularyModel'
import { getUniqueId } from 'react-native-device-info'
import { Alert } from 'react-native'
import RNProgressHud from 'progress-hud'
import { Chip } from 'react-native-paper';

const VocabularyCreateScreen = () => {

    const route = useRoute()
    const navigation = useNavigation()
    const [englishWord, setEnglishWord] = useState('')
    const [englishExample, setEnglisExample] = useState('')

    const [nativeWord, setNativeWord] = useState('')
    const [vocabularyImage, setVocabularyImage] = useState('')

    const { canRemove, vocabulary, desk } = route?.params ?? ''
    const [wordTypes, setWordType] = useState([
        { type: 'Noun', selected: false },
        { type: 'Verb', selected: false },
        { type: 'Adjective', selected: false },
        { type: 'Adverb', selected: false },
        { type: 'Prepositions', selected: false },
        { type: 'Phrasal Verbs', selected: false }

    ])

    const _isFormValidation = () => {
        if (englishWord?.trim() == '') {
            return false
        }
        if (nativeWord?.trim() == '') {
            return false
        }
        if (wordTypes?.filter(e => e.selected === true).length <= 0) {
            return false
        }
        return true
    }

    const getSelectedWordTypes = () => {
        let types = []
        wordTypes?.map(e => {
            console.log(e)
            if (e?.selected) {
                types.push(e?.type)
            }

        })
        return types.join(', ')
    }

    const _onAddDeskVocabulary = () => {

        if (!_isFormValidation()) {
            Alert.alert("", "Please enter full information!")
            return
        }
        RNProgressHud.show()
        let vocab = new PracticeVocabularyModel()
        vocab.name = englishWord
        vocab.native_name = nativeWord
        vocab.image_url = vocabularyImage
        vocab.example = englishExample
        vocab.word_type = getSelectedWordTypes()
        FirebaseManager.addDeskVocabulary(vocab, desk?.id, getUniqueId())
            .then(res => {
                if (!vocabulary) {
                    setEnglishWord('')
                    setNativeWord('')
                    setEnglisExample('')

                }

            })
            .catch(err => {
                console.log('err: ', err)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }


    const _onUpdateDeskVocabulary = () => {

        if (!_isFormValidation()) {
            Alert.alert("", "Please enter full information!")
            return
        }
        RNProgressHud.show()
        let vocab = new PracticeVocabularyModel()
        vocab.id = vocabulary?.id
        vocab.name = englishWord
        vocab.native_name = nativeWord
        vocab.image_url = vocabularyImage
        vocab.example = englishExample
        vocab.word_type = getSelectedWordTypes()
        FirebaseManager.updateDeskVocabulary(vocab, desk, getUniqueId())
            .then(res => {
                if (!vocabulary) {
                    setEnglishWord('')
                    setNativeWord('')
                }
                console.log(res)

            })
            .catch(err => {
                console.log('err: ', err)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    const _onRemoveDeskVocabulary = () => {
        FirebaseManager.removeDeskVocabulary(getUniqueId(), desk, vocabulary)
            .then(res => {
                if (res) {
                    navigation.goBack()
                }
            })
            .catch(err => {
                console.log('err: ', err)
            })
    }

    const _onAddWordType = (wordType) => {
        let tempWordTypes = wordTypes?.map(e => {
            if (e?.type === wordType?.type) {
                e.selected = true
            }
            return e
        })
        setWordType(tempWordTypes)
    }

    const _onRemoveWorkType = (wordType) => {
        let tempWordTypes = wordTypes?.map(e => {
            if (e?.type === wordType?.type) {
                e.selected = false
            }
            return e
        })
        setWordType(tempWordTypes)
    }



    useEffect(() => {
        if (vocabulary) {
            setEnglishWord(vocabulary?.name)
            setNativeWord(vocabulary?.native_name)
            setEnglisExample(vocabulary?.example)

        }
    }, [])

    return (

        <View
            style={{
                flex: 1,
                backgroundColor: 'white'
            }}
        >

            <ScrollView>

                <View
                    style={{
                        marginTop: 6
                    }}
                >

                    <View
                        style={[styles.group]}
                    >
                        {/* <Input
                            label={'English Vocabulary'}
                            placeholder='Write something here...'
                            multiline
                            inputContainerStyle={{
                                borderBottomColor: CommonColor.primary,
                                minHeight: 40
                            }}
                            value={englishWord}
                            onChangeText={(text) => setEnglishWord(text)}
                        /> */}
                        <SpeechToText
                            onSelectVocabulary={(a) => setEnglishWord(a)}
                            value={englishWord}
                            label={'English Vocabulary'}
                        />
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap'
                            }}
                        >
                            {
                                wordTypes?.map((e) =>
                                    <Chip key={e?.type.toString()}
                                        style={{ margin: 2, backgroundColor: e?.selected ? CommonColor.primary : CommonColor.secondary }}
                                        onClose={() => _onRemoveWorkType(e)}
                                        onPress={() => _onAddWordType(e)}
                                        mode={'outlined'}

                                    >{e?.type}</Chip>
                                )

                            }

                        </View>
                        <Input
                            label={'Example'}
                            labelStyle={{ color: 'gray' }}
                            placeholder='Write example here...'
                            multiline
                            inputContainerStyle={{
                                borderBottomColor: CommonColor.primary,
                            }}
                            containerStyle={{ marginTop: 22 }}
                            textAlignVertical={'top'}
                            numberOfLines={3}
                            value={englishExample}
                            onChangeText={(text) => setEnglisExample(text)}
                        />

                    </View>

                    <View
                        style={[styles.group]}
                    >
                        <Input
                            label={'Meaning'}
                            labelStyle={{ color: 'gray' }}
                            placeholder='Write meaning here...'
                            multiline
                            inputContainerStyle={{
                                borderBottomColor: CommonColor.primary,
                                minHeight: 40
                            }}
                            onChangeText={(text) => setNativeWord(text)}
                            value={nativeWord}

                        />

                    </View>
                </View>
            </ScrollView>



            {
                vocabulary ?
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: Dimensions.get('screen').width,
                            justifyContent: 'space-around'
                        }}
                    >
                        <ButtonText
                            label={'UPDATE'}
                            containerStyle={styles.buttonCreate}
                            labelStyle={{
                                color: COLORS.secondary,
                                fontSize: 16,
                                fontWeight: '700',
                            }}
                            onItemPress={_onUpdateDeskVocabulary}
                            width={120}
                        />

                        <ButtonText
                            label={'REMOVE'}
                            containerStyle={[styles.buttonCreate, { borderColor: 'red' }]}
                            labelStyle={{
                                color: 'red',
                                fontSize: 16,
                                fontWeight: '700',

                            }}
                            onItemPress={_onRemoveDeskVocabulary}
                            width={120}

                        />


                    </View>
                    :
                    <View>
                        <ButtonText
                            label={'ADD'}
                            containerStyle={styles.buttonCreate}
                            labelStyle={{
                                color: COLORS.secondary,
                                fontSize: 16,
                                fontWeight: '700'
                            }}
                            onItemPress={_onAddDeskVocabulary}
                        />

                    </View>


            }

        </View >

    )
}

export default VocabularyCreateScreen

const styles = StyleSheet.create({
    group: {
        padding: 4,
        marginHorizontal: 4,
        marginVertical: 8,
        backgroundColor: 'white',
        borderRadius: 8,
        ...BOXSHADOW.normal


    },
    buttonCreate: {
        backgroundColor: 'transparent',
        borderWidth: 0.6,
        borderColor: COLORS.secondary,
        marginBottom: 12,
        height: 50,
    }
})
