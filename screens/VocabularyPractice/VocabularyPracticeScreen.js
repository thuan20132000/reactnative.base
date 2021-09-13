import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CardFlip from 'react-native-card-flip';
import { IconButton } from 'react-native-paper';
import { COLORS } from '../../app/constants/themes';
import VocabularyPracticeController from '../../app/controller/VocabularyPractice';
import PracticeVocabularyModel from '../../app/models/PracticeVocabularyModel';
import ButtonText from '../../components/Button/BottonText';
import CommonColor from '../../utils/CommonColor';
import CommonIcons from '../../utils/CommonIcons';
import CardDefinition from '../FlashCard/components/CardDefinition';
import VocabularyCard from '../sharing/VocabularyCard';
import { StackActions, useNavigation } from '@react-navigation/core'
import { TouchableOpacity } from 'react-native';

const OPTIONS = {
    HARD: 'hard',
    AGAIN: 'again',
    EASY: 'easy'
}

const VocabularyPracticeScreen = () => {

    const navigation = useNavigation()
    const [practiceVocabulary, setPracticeVocabulary] = useState(new PracticeVocabularyModel(null));
    const [isAnswered, setIsAnswered] = useState(false);
    const [currentVocabulary, setCurrentVocabulary] = useState()
    const [vocabularyPosition, setVocabularyPosition] = useState(0)
    const _refCardFlip = useRef();
    const [isDisabled, setIsDisabled] = useState(false)
    const [learningVocabularyNumber, setLearningVocabularyNumber] = useState(0)

    const [vocabularyList, setVocabularyList] = useState([
        new PracticeVocabularyModel({ name: 'Hello world', id: 1, word_type: 'prhase', native_name: "Xin chao" }),
        new PracticeVocabularyModel({ name: 'Good bye', id: 2, word_type: 'prhase', native_name: "Tam biet" }),
        new PracticeVocabularyModel({ name: 'Good morning', id: 3, word_type: 'prhase', native_name: "Chao buoi sang" }),
        new PracticeVocabularyModel({ name: 'Fell', id: 4, word_type: 'prhase', native_name: "Cam thay" }),
        new PracticeVocabularyModel({ name: 'Cure', id: 5, word_type: 'prhase', native_name: "Chữa, khắc phục" }),
        new PracticeVocabularyModel({ name: 'Exercise', id: 6, word_type: 'prhase', native_name: "Bài tập, tập luyện" }),
        new PracticeVocabularyModel({ name: 'Flu', id: 7, word_type: 'prhase', native_name: "bệnh cúm" }),
        new PracticeVocabularyModel({ name: 'Infection', id: 8, word_type: 'prhase', native_name: "Sự nhiễm trùng" }),
        new PracticeVocabularyModel({ name: 'Epidemic', id: 9, word_type: 'prhase', native_name: "Dịch bệnh" }),
        new PracticeVocabularyModel({ name: 'Cut down', id: 10, word_type: 'prhase', native_name: "Cắt giảm" }),
        new PracticeVocabularyModel({ name: 'Go off', id: 11, word_type: 'prhase', native_name: "bị hỏng" }),

    ])

    useEffect(() => {
        setPracticeVocabulary(vocabularyList[vocabularyPosition])
        setLearningVocabularyNumber(vocabularyList.length)
    }, [])


    const _onSelectOptionPress = (option) => {

        try {

            let vocab = new VocabularyPracticeController(practiceVocabulary, vocabularyList)
            switch (option) {
                case OPTIONS.HARD:
                    vocab.handleHardOption()
                    break;
                case OPTIONS.AGAIN:
                    vocab.handleAgainOption()
                    break;
                case OPTIONS.EASY:
                    vocab.handleIgnoreOption()
                    break;

                default:
                    break;
            }
            setVocabularyList(vocab.getVocabularyList())

            _refCardFlip.current.flip()
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    setIsAnswered(false)
                    resolve();
                }, 500);
            }).then(() => {
                if (vocab.getNextVocabulary()) {
                    setPracticeVocabulary(vocab.getNextVocabulary())
                    setLearningVocabularyNumber(vocab.getLearningVocabularyNumber())
                } else {
                    navigation.goBack()
                }

            })

        } catch (error) {
            console.log(error)
        }

    }

    const _onShowAnswerPress = () => {
        if (vocabularyPosition >= vocabularyList.length - 1) {
            setIsAnswered(true)
            return
        }
        _refCardFlip.current.flip()
        setIsAnswered(true)
    }

    const _onShowWebView = () => {

        let word = practiceVocabulary.name?.toLowerCase().replace(' ', '-')
        console.warn('ww: ', word)
        navigation.navigate('Webview', {
            url: `https://www.oxfordlearnersdictionaries.com/definition/english/${word}`
        })
    }

    return (
        <View
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text>{learningVocabularyNumber}</Text>
                    <TouchableOpacity
                        onPress={_onShowWebView}
                    >
                        <Text style={{ fontSize: 24 }}>Web</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <CardFlip
                        ref={_refCardFlip}
                        style={{
                            height: 220
                        }}
                    >
                        <VocabularyCard

                            title={practiceVocabulary?.name}
                            isAnswered={isAnswered}
                            onFlipPress={() => _refCardFlip.current.flip()}
                        />

                        <VocabularyCard

                            title={practiceVocabulary?.native_name}
                            isAnswered={isAnswered}
                            onFlipPress={() => _refCardFlip.current.flip()}

                        />
                    </CardFlip>

                </View>

                {
                    !isAnswered &&
                    <View>
                        <ButtonText
                            label={'Show Answer'}
                            containerStyle={styles.buttonCreate}
                            labelStyle={{
                                color: COLORS.secondary,
                                fontSize: 16,
                                fontWeight: '700'
                            }}
                            onItemPress={_onShowAnswerPress}
                        />
                    </View>

                }


                {
                    isAnswered &&

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ButtonText
                            label={'Hard'}
                            descriptions={'< 3 minutes'}
                            containerStyle={styles.buttonCreate}
                            labelStyle={{
                                color: COLORS.secondary,
                                fontSize: 16,
                                fontWeight: '700'
                            }}
                            onItemPress={() => _onSelectOptionPress(OPTIONS.HARD)}
                        />
                        <ButtonText
                            label={'Again'}
                            descriptions={'< 9 minutes'}
                            containerStyle={styles.buttonCreate}
                            labelStyle={{
                                color: COLORS.secondary,
                                fontSize: 16,
                                fontWeight: '700'
                            }}
                            onItemPress={() => _onSelectOptionPress(OPTIONS.AGAIN)}

                        />
                        <ButtonText
                            label={'Ignore'}

                            containerStyle={styles.buttonCreate}
                            labelStyle={{
                                color: COLORS.secondary,
                                fontSize: 16,
                                fontWeight: '700'
                            }}
                            onItemPress={() => _onSelectOptionPress(OPTIONS.EASY)}

                        />
                    </View>
                }
            </ScrollView>

        </View>
    )
}

export default VocabularyPracticeScreen

const styles = StyleSheet.create({
    buttonCreate: {
        backgroundColor: 'white',
        borderWidth: 0.6,
        borderColor: COLORS.secondary,
        marginBottom: 32,
        minHeight: 60,
        flex: 1
    }
})
