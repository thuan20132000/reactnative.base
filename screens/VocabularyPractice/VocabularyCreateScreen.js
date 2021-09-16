import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
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

const VocabularyCreateScreen = () => {

    const route = useRoute()
    const navigation = useNavigation()
    const [englishWord, setEnglishWord] = useState('')
    const [nativeWord, setNativeWord] = useState('')
    const [vocabularyImage, setVocabularyImage] = useState('')

    const { canRemove, vocabulary, desk } = route?.params ?? ''

    const _isFormValidation = () => {
        if (englishWord?.trim() == '') {
            return false
        }
        if (nativeWord?.trim() == '') {
            return false
        }
        return true
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
        FirebaseManager.addDeskVocabulary(vocab, desk?.id, getUniqueId())
            .then(res => {
                if (!vocabulary) {
                    setEnglishWord('')
                    setNativeWord('')
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



    useEffect(() => {
        if (vocabulary) {
            setEnglishWord(vocabulary?.name)
            setNativeWord(vocabulary?.native_name)
        }
    }, [])

    return (

        <View
            style={{
                flex: 1
            }}
        >

            <ScrollView>
                <SpeechToText
                    onSelectVocabulary={(a) => setEnglishWord(a)}
                />

                <View
                    style={{
                        marginTop: 22
                    }}
                >

                    <View
                        style={[styles.group]}
                    >
                        <Input
                            label={'English Language'}
                            placeholder='Write something here...'
                            multiline
                            inputContainerStyle={{
                                borderBottomColor: CommonColor.primary,
                                minHeight: 80
                            }}
                            value={englishWord}
                            onChangeText={(text) => setEnglishWord(text)}
                        />

                        {/* <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: 12
                            }}
                        >
                            <Image
                                source={
                                    require('../../app/assets/images/imageDefault.png')
                                }
                                style={{
                                    width: 60,
                                    height: 60,
                                    alignSelf: 'center'
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => console.warn('ds fd')}
                            >
                                <MaterialCommunityIcons
                                    name={CommonIcons.cameraplus}
                                    size={26}
                                    color={CommonColor.primary}
                                />

                            </TouchableOpacity>

                        </View> */}
                    </View>

                    <View
                        style={[styles.group]}
                    >
                        <Input
                            label={'Native Language'}
                            placeholder='Write something here...'
                            multiline
                            inputContainerStyle={{
                                borderBottomColor: CommonColor.primary,
                                minHeight: 80

                            }}
                            onChangeText={(text) => setNativeWord(text)}
                            value={nativeWord}

                        />

                    </View>
                </View>
            </ScrollView>



            {
                vocabulary ?
                    <View>
                        <ButtonText
                            label={'UPDATE'}
                            containerStyle={styles.buttonCreate}
                            labelStyle={{
                                color: COLORS.secondary,
                                fontSize: 16,
                                fontWeight: '700'
                            }}
                            onItemPress={_onUpdateDeskVocabulary}
                        />

                        <ButtonText
                            label={'REMOVE'}
                            containerStyle={[styles.buttonCreate, { borderColor: 'red' }]}
                            labelStyle={{
                                color: 'red',
                                fontSize: 16,
                                fontWeight: '700'
                            }}
                            onItemPress={_onRemoveDeskVocabulary}
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
