import React, { useRef, useState, useEffect } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CardDefinition from './components/CardDefinition'
import CardFlip from 'react-native-card-flip';
import { Button, IconButton, ProgressBar } from 'react-native-paper';
import CommonIcons from '../../utils/CommonIcons';
import CommonColor from '../../utils/CommonColor';
import CardWordItem from './components/CardWordItem';
import { useDispatch, useSelector } from 'react-redux';

import {
    _onCheckItemExistInArray,
    _onCheckNumberEven,
    _onPlayFlashCardSound,
    _onPlaySoundLocal,
    _onRandomIndexValue,
    _onSwapRandomArrayElement
} from '../../utils/helper';

import Sound from 'react-native-sound';
import { url_absolute } from '../../config/api_config.json';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ModalLoading from '../../components/Modal/ModalLoading';
import * as flashcardActions from '../../store/actions/flashcardActions';
const F_FLashCardPracticeScreen = (props) => {

    const flashcard = useSelector(state => state.flashcard);
    const selectedVocabulary = flashcard.practice_vocabulary_list[0];

    const dispatch = useDispatch();
    const _refCardFlip = useRef();
    const [selectedWord, setSelectedWord] = useState();
    const [practiceVocabulary, setPracticeVocabulary] = useState();
    const [anwserChoices, setAwnserChoices] = useState([]);
    const [isAnwsered, setIsAwnsered] = useState(false);
    const [recordTime, setRecordTime] = useState(0);


    const _onSelectWord = (word) => {

        setSelectedWord(word);

        setTimeout(() => {
            let path = `${url_absolute}${word?.sound_us}`;
            var sound = new Sound(path, '', (error) => {
                /* ... */
                if (error) {
                    console.log('error: ', error);
                    sound.release()
                    return;
                }

                sound.play(success => console.log("play success"));


            });
            setTimeout(() => {
                sound.release();
            }, 1600);
        }, 100);


    }





    useEffect(() => {


        let topicVocabulary = flashcard.topic_vocabulary_list;
        setPracticeVocabulary(selectedVocabulary);


        try {
            let choices = [];
            choices.push(selectedVocabulary);
            let compareVocabulary = topicVocabulary.filter(e => e.ID != selectedVocabulary.ID);

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
            console.log('error: ', flashcard.learn_vocabulary_list);
        }



    }, []);



    const _onCheckWord = async () => {

        try {


            setIsAwnsered(true);

            if (selectedWord.ID != practiceVocabulary.ID) {

                setTimeout(() => {
                    var sound = new Sound('button_incorrect.mp3', Sound.MAIN_BUNDLE, (error) => {
                        /* ... */
                        if (error) {
                            console.log('error: ', error);
                            sound.release()

                        }
                    });
                    setTimeout(() => {
                        sound.play((success) => {
                            /* ... */
                            sound.release();

                        });
                    }, 100);
                }, 100);




                _refCardFlip.current.flip();
                dispatch(flashcardActions.refreshPracticeVocabulary())

                return;
            }


            dispatch(flashcardActions.addLearntVocabulary(selectedVocabulary));



            let sound = new Sound('button_correct.mp3', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('error: ', error);
                    return false
                }
                // play when loaded
                sound.play();
                return true;
            });
            _refCardFlip.current.flip();





        } catch (error) {
            console.log('error: ', error);
        }



    }



    const _onNextCard = () => {
        if (flashcard.practice_vocabulary_list.length <= 0) {
            props.navigation.replace('FlashCardPracticeFinish')

        } else {

            props.navigation.replace('FlashCardPractice')
        }

    }


    return (
        <View>


            {/* Word meaning */}
            <View>
                <ProgressBar
                    progress={(5 - flashcard.practice_vocabulary_list.length) / 5}
                    color={'red'}
                    style={{
                        height: 8
                    }}
                />
            </View>
            <CardFlip
                ref={_refCardFlip}
                style={{
                    height: 220
                }}
            >
                <CardDefinition
                    containerStyle={{
                        height: 220
                    }}
                    meaning={practiceVocabulary?.meaning}
                    word_type={practiceVocabulary?.word_type}
                    firstDefinition={practiceVocabulary?.definition}

                    children={
                        isAnwsered &&
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

                <CardDefinition
                    containerStyle={{
                        height: 220
                    }}
                // word_type={practiceVocabulary?.word_type}
                // firstDefinition={`- ${practiceVocabulary?.definition} `}


                >

                    <View>
                        <Text style={{ fontSize: 22, fontWeight: '700', color: 'red' }} >{practiceVocabulary?.name} <Text style={{ color: 'coral' }} >({practiceVocabulary?.word_type})</Text></Text>
                        <Text>{practiceVocabulary?.phon_us}</Text>
                        <Text
                            style={{
                                color: 'grey',
                                fontStyle: 'italic',
                                marginBottom: 6
                            }}
                        >
                            {practiceVocabulary?.definition}
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                color: 'coral'
                            }}
                        >
                            {practiceVocabulary?.example}
                        </Text>


                    </View>
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
                </CardDefinition>


            </CardFlip>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap'
                }}
            >
                {
                    Array(recordTime).fill({}).map((e, index) =>
                        <MaterialCommunityIcon
                            name={CommonIcons.close}
                            color={'red'}
                            size={18}
                        />
                    )
                }
            </View>

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
                            isActive={selectedWord && selectedWord.ID == e.ID ? true : false}
                            isDisable={isAnwsered && practiceVocabulary?.ID != e.ID ? true : false}
                            isHighlight={isAnwsered && practiceVocabulary?.ID == e.ID ? true : false}

                        />

                    )
                }
            </View>


            <View
                style={[
                    {
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexDirection: 'row',

                    }
                ]}
            >
                {
                    !isAnwsered &&
                    <Button
                        icon={CommonIcons.checkboxCircleMark}
                        mode="outlined"
                        onPress={_onCheckWord}
                        disabled={selectedWord?false:true}
                        color={'red'}
                    >
                        Check
                    </Button>
                }

                {
                    isAnwsered &&
                    <Button
                        icon={CommonIcons.arrowRightChevron}
                        mode="contained"
                        onPress={_onNextCard}
                        color={CommonColor.primary}
                    >
                        Next
                    </Button>
                }
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
