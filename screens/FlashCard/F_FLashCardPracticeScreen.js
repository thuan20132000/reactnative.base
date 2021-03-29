import React, { useRef, useState, useEffect } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CardDefinition from './components/CardDefinition'
import CardFlip from 'react-native-card-flip';
import { IconButton } from 'react-native-paper';
import CommonIcons from '../../utils/CommonIcons';
import CommonColor from '../../utils/CommonColor';
import CardWordItem from './components/CardWordItem';
import { useDispatch, useSelector } from 'react-redux';

import * as flashcardAction from '../../store/actions/flashcardActions';
import {
    _onCheckItemExistInArray,
    _onCheckNumberEven,
    _onPlayFlashCardSound,
    _onPlaySoundLocal,
    _onRandomIndexValue,
    _onSwapRandomArrayElement
} from '../../utils/helper';

import Voice from '@react-native-voice/voice';
import Sound from 'react-native-sound';
import { url_absolute } from '../../config/api_config.json';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const F_FLashCardPracticeScreen = (props) => {

    const flashcard = useSelector(state => state.flashcard);
    const selectedVocabulary = flashcard.practice_vocabulary_list[0];

    const dispatch = useDispatch();
    const _refCardFlip = useRef();
    const [selectedWord, setSelectedWord] = useState();
    const [practiceVocabulary, setPracticeVocabulary] = useState();
    const [anwserChoices, setAwnserChoices] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isCorrectSelected, setIsCorrectSelected] = useState(false);
    const [isAnwsered, setIsAwnsered] = useState(false);
    const [recordTime, setRecordTime] = useState(0);




    const [isPlaySound, setIsPlaySound] = useState(false);
    let timeoutEvent;
    const _onSelectWord = async (word) => {

        setSelectedWord(word);
        setIsPlaySound(true);

        setTimeout(() => {
            let path = `${url_absolute}${word?.sound_us}`;
            var sound = new Sound(path, '', (error) => {
                /* ... */
                if (error) {
                    console.warn('error: ', error);
                    sound.release()
                    setIsPlaySound(false);

                }
            });
            setTimeout(() => {
                sound.play((success) => {
                    /* ... */
                    sound.release();
                    setIsPlaySound(false);


                });
            }, 100);
        }, 100);


    }





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
            console.log('error: ', flashcard.learn_vocabulary_list);
        }


        return () => {
            clearTimeout(timeoutEvent);
        }

    }, []);



    const _onCheckWord = async () => {

        try {


            setIsAwnsered(true);

            if (selectedWord.id != practiceVocabulary.id) {

                setTimeout(() => {
                    var sound = new Sound('button_incorrect.mp3', Sound.MAIN_BUNDLE, (error) => {
                        /* ... */
                        if (error) {
                            console.warn('error: ', error);
                            sound.release()
                            setIsPlaySound(false);

                        }
                    });
                    setTimeout(() => {
                        sound.play((success) => {
                            /* ... */
                            sound.release();
                            setIsPlaySound(false);


                        });
                    }, 100);
                }, 100);




                Alert.alert("Incorrect", "Chon Sai");
                _refCardFlip.current.flip();

                return;
            }



            // dispatch(flashcardAction.addLearntVocabulary(selectedVocabulary));
            if (flashcard.practice_vocabulary_list.length <= 1) {
                props.navigation.replace('FlashCardPracticeFinish')

            } else {
                // props.navigation.replace('FlashCardPractice')
                let sound = new Sound('button_correct.mp3', Sound.MAIN_BUNDLE, (error) => {
                    if (error) {
                        console.warn('error: ', error);
                        return false
                    }
                    // play when loaded
                    sound.play();
                    return true;
                });
                _refCardFlip.current.flip();


            }



        } catch (error) {
            console.log('error: ', error);
        }


        // console.warn("correct");

    }


    const [voiceResult, setVoiceResult] = useState(false);
    const _onCheckVoiceCorrect = (listened_word_list = []) => {
        if (listened_word_list.length > 0) {
            listened_word_list.filter((e, index) => {
                if (e == selectedVocabulary.name) {
                    setVoiceResult(true);
                    return;
                }

            })
        }
        setIsRecording(false);


    }


    const onSpeechEndHandler = (e) => {
        console.warn("None: ", e);


    }
    const onSpeechStartHandler = () => {
        setIsRecording(true);
        setTimeout(() => {
            Voice.stop();
            setIsRecording(false);
        }, 6000);
    }
    const onSpeechResultsHandler = (e) => {
        let listened_word_list = e.value;
        _onCheckVoiceCorrect(listened_word_list, selectedVocabulary);
    }

    const _onVoiceStart = () => {

        setTimeout(() => {
            setRecordTime(recordTime + 1);
        }, 5000);
        setVoiceResult(false);


        if (isRecording) {
            Voice.stop();
        } else {
            Voice.start('en-US');

        }

    }

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStartHandler;
        Voice.onSpeechEnd = onSpeechEndHandler;
        Voice.onSpeechResults = onSpeechResultsHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners());
        }

    }, [practiceVocabulary]);

    useEffect(() => {
        console.warn('time: ', recordTime);
    }, [recordTime])

    return (
        <View>


            {/* Word meaning */}
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
                    word_type={practiceVocabulary?.word_type}
                    firstDefinition={practiceVocabulary?.definition}


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
                            isDisable={isAnwsered && practiceVocabulary?.id != e.id ? true : false}
                            isHighlight={isAnwsered && practiceVocabulary?.id == e.id ? true : false}

                        />

                    )
                }



                {
                    (isAnwsered && recordTime <= 3) &&
                    <TouchableOpacity
                        style={[styles.buttonCheck,
                        {
                            marginTop: 42,
                        },
                        selectedWord && {
                            backgroundColor: 'white'
                        },
                        isRecording && {
                            backgroundColor:'coral'
                        }
                        ]}
                        onLongPress={_onVoiceStart}
                        disabled={isRecording}

                    >
                        {
                            isRecording ?
                                <IconButton
                                    icon={'account-voice'}
                                    size={36}
                                    color={'red'}
                                    style={{
                                        width: 40,
                                        height: 40
                                    }}
                                /> :
                                <IconButton
                                    icon={CommonIcons.face_verygood}
                                    size={36}
                                    color={'red'}
                                    style={{
                                        width: 40,
                                        height: 40
                                    }}
                                />

                        }
                    </TouchableOpacity>
                }

                {
                    !isAnwsered &&

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

                }

                {
                    recordTime > 3 &&

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
                            Next
                    </Text>
                    </TouchableOpacity>

                }
                {
                    <Text>{recordTime}</Text>
                }
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
