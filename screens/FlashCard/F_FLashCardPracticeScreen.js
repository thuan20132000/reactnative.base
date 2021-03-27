import React, { useRef, useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CardDefinition from './components/CardDefinition'
import CardFlip from 'react-native-card-flip';
import { IconButton } from 'react-native-paper';
import CommonIcons from '../../utils/CommonIcons';
import CommonColor from '../../utils/CommonColor';
import CardWordItem from './components/CardWordItem';
import { useDispatch, useSelector } from 'react-redux';

import * as flashcardAction from '../../store/actions/flashcardActions';
import { _onCheckItemExistInArray, _onCheckNumberEven, _onRandomIndexValue, _onSwapRandomArrayElement } from '../../utils/helper';


const F_FLashCardPracticeScreen = (props) => {

    const dispatch = useDispatch();
    const _refCardFlip = useRef();
    const [selectedWord, setSelectedWord] = useState();
    const flashcard = useSelector(state => state.flashcard);
    const [practiceVocabulary, setPracticeVocabulary] = useState();
    const [anwserChoices, setAwnserChoices] = useState([]);

    const selectedVocabulary = flashcard.practice_vocabulary_list[0];


    useEffect(() => {

        let topicVocabulary = flashcard.topic_vocabulary_list;
        setPracticeVocabulary(selectedVocabulary);


        try {
            let choices = [];
            choices.push(selectedVocabulary);
            let compareVocabulary = topicVocabulary.filter(e => e.id != selectedVocabulary.id);

            compareVocabulary.filter((e, index) => {

                if (choices.length >= 3) {
                    return;
                }

                let check = _onCheckItemExistInArray(e, choices);
                if (!check) {
                    let random_value = Math.floor(Math.random() * 10);
                    let checkEven = _onCheckNumberEven(random_value);
                    if (checkEven) {
                        choices.push(e);
                    }
                }
            });
            let swap_choices = _onSwapRandomArrayElement(choices);
            setAwnserChoices(swap_choices);

        } catch (error) {
            console.warn('error: ', flashcard.learn_vocabulary_list);
        }


    }, [])





    const _onSelectWord = async (word) => {
        setSelectedWord(word);
        console.warn(word)
    }

    const _onCheckWord = async () => {

        try {
            if (selectedWord.id != practiceVocabulary.id) {
                Alert.alert("Incorrect", "Chon Sai");
                return;
            }

            dispatch(flashcardAction.addLearntVocabulary(selectedVocabulary));
            if (flashcard.practice_vocabulary_list.length <= 1) {
                props.navigation.replace('FlashCardPracticeFinish')

            } else {
                props.navigation.replace('FlashCardPractice')

            }



        } catch (error) {
            console.warn('error: ', error);
        }


        // console.warn("correct");

    }



    return (
        <View>


            {/* Word meaning */}
            <CardFlip
                ref={_refCardFlip}
                style={{
                    height: 180
                }}
            >
                <CardDefinition
                    containerStyle={{
                        height: 180
                    }}
                    word_type={practiceVocabulary?.word_type}
                    firstDefinition={practiceVocabulary?.definition}

                    children={
                        <IconButton
                            icon={CommonIcons.rotateCircle}
                            color={CommonColor.primary}
                            size={18}
                            style={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10,

                            }}
                            onPress={() => _refCardFlip.current.flip()}
                        />
                    }
                />

                <CardDefinition
                    containerStyle={{
                        height: 180
                    }}
                    word_type={practiceVocabulary?.type}
                    firstDefinition={practiceVocabulary?.translate}

                    children={
                        <IconButton
                            icon={CommonIcons.rotateCircle}
                            color={CommonColor.primary}
                            size={18}
                            style={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10
                            }}
                            onPress={() => _refCardFlip.current.flip()}
                        />
                    }

                />


            </CardFlip>



            {/* Anwser Choices */}
            <View
                style={[
                    styles.choiceBox
                ]}
            >
                {
                    anwserChoices?.map((e, index) =>
                        <CardWordItem
                            key={index.toString()}
                            name={e.name}
                            onItemPress={() => _onSelectWord(e)}
                            isActive={selectedWord && selectedWord.id == e.id ? true : false}
                        />

                    )
                }


                <TouchableOpacity
                    style={[styles.buttonCheck,
                    {
                        marginTop: 42,
                    },
                    selectedWord && {
                        backgroundColor: CommonColor.primary
                    }
                    ]}

                    disabled={selectedWord ? false : true}
                    onPress={_onCheckWord}
                >
                    <Text style={[
                        styles.buttonText,
                        {
                            color: 'black'
                        },
                        selectedWord && {
                            color: 'white'
                        }
                    ]}>
                        Kiểm tra
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default F_FLashCardPracticeScreen

const styles = StyleSheet.create({
    choiceBox: {
        marginVertical: 22
    },
    buttonCheck: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        backgroundColor: 'grey',
        marginHorizontal: 6,
        marginVertical: 4,
        borderRadius: 6,
        paddingVertical: 16,
        paddingHorizontal: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        fontWeight: '700',
        fontSize: 18,
    }
})
