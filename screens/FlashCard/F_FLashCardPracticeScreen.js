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

const F_FLashCardPracticeScreen = (props) => {
    
    const flashcard = useSelector(state => state.flashcard);
    const selectedVocabulary = flashcard.practice_vocabulary_list[0];
    
    const dispatch = useDispatch();
    const _refCardFlip = useRef();
    const [selectedWord, setSelectedWord] = useState();
    const [practiceVocabulary, setPracticeVocabulary] = useState();
    const [anwserChoices, setAwnserChoices] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isCorrectSelected,setIsCorrectSelected] = useState(false);





    const [isPlaySound, setIsPlaySound] = useState(false);
    let timeoutEvent;
    const _onSelectWord = async (word) => {

        setSelectedWord(word);
        setIsPlaySound(true);
        let res = await _onPlayFlashCardSound(word?.sound_us);
        timeoutEvent = setTimeout(() => {
            setIsPlaySound(false);

        }, 1200);

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
            if (selectedWord.id != practiceVocabulary.id) {
                Alert.alert("Incorrect", "Chon Sai");
                return;
            }

            // dispatch(flashcardAction.addLearntVocabulary(selectedVocabulary));
            if (flashcard.practice_vocabulary_list.length <= 1) {
                props.navigation.replace('FlashCardPracticeFinish')

            } else {
                // props.navigation.replace('FlashCardPractice')
                console.warn('true');
                const sound = new Sound('openmouth1.mp3', null, (error) => {
                    if (error) {
                        return false
                    }
                    // play when loaded
                    sound.play();
                    _refCardFlip.current.flip();
                    return true;
                });

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
        console.warn("None: ",e);

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
                    word_type={practiceVocabulary?.word_type}
                    firstDefinition={practiceVocabulary?.meaning}


                >
                    <View>

                        <View
                            style={{
                                width: 40,
                                height: 40,
                                borderWidth: 1,
                                borderColor: 'red',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20
                            }}
                        >
                            {
                                !isRecording ?
                                    <IconButton
                                        icon={CommonIcons.recordCircle}
                                        size={18}
                                        color={'red'}
                                        onPress={(_onVoiceStart)}
                                    /> :

                                    <Image
                                        source={require('../../utils/gif/recording.gif')}
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                            }
                        </View>

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
