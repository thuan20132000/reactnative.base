import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonColor from '../../utils/CommonColor'
import CommonIcons from '../../utils/CommonIcons'
import CommonImages from '../../utils/CommonImages'

import CardFlip from 'react-native-card-flip';
import CardVocabulary from './components/CardVocabulary'
import CardMeaning from './components/CardMeaning'
import { useDispatch, useSelector } from 'react-redux'
import * as flashcardAction from '../../store/actions/flashcardActions'
import { _onPlayFlashCardSound, _onPlaySound } from '../../utils/helper'
import Sound from 'react-native-sound'
import {url_absolute} from '../../config/api_config.json'
const F_FlashCardChoiceScreen = (props) => {

    const _refCardFlip = useRef();
    const dispatch = useDispatch();
    const topic = props.route?.params;

    const [vocabulary, setVocabulary] = useState();

    const flashcard = useSelector(state => state.flashcard);

    const selected_vocabulary = props.route?.params;

    const [isPlaySound, setIsPlaySound] = useState(false);
    const _onPlayVocabularySound = async () => {
        setIsPlaySound(true);
        // let res = await _onPlayFlashCardSound(vocabulary?.sound_us);
        // setTimeout(() => {

        // }, 1200);
        let path = `${url_absolute}${vocabulary.sound_us}`;

        setTimeout(() => {
            var sound = new Sound(path, '', (error) => {
                /* ... */
                if (error) {
                    console.log('error: ', error);
                    setIsPlaySound(false);

                    return;

                }
                sound.play((success) => console.log('play success'));
            });

            setTimeout(() => {
                setIsPlaySound(false);
                sound.release();
            }, 1200);

        }, 100);
    }

    const _onSelectVocabulary = async () => {
        setTimeout(() => {
            var sound = new Sound('button_correct.mp3', Sound.MAIN_BUNDLE, (error) => {
                /* ... */
                if (error) {
                    console.log('error: ', error);
                    sound.release()
                    return;

                }
                sound.play();
            });

            setTimeout(() => {
                sound.release();
            }, 1200);


        }, 100);

        dispatch(flashcardAction.addVocabulary(vocabulary));
        if (flashcard.vocabulary_stack.length <= 1 || flashcard.practice_vocabulary_list.length >= 4) {
            props.navigation.replace('FlashCardPractice');
        } else {
            props.navigation.replace('FlashCardChoice');

        }

    }


    const _onSkipVocabulary = async () => {

        dispatch(flashcardAction.skipVocabulary(vocabulary));
        if (flashcard.vocabulary_stack.length <= 1 && flashcard.practice_vocabulary_list.length > 0) {
            props.navigation.replace('FlashCardPractice');
            return;
        }

        if (flashcard.vocabulary_stack.length == 1 && flashcard.practice_vocabulary_list.length <= 0) {
            props.navigation.goBack();
            return;
        }
        props.navigation.replace('FlashCardChoice');
        return;

  
    }



    useEffect(() => {
        if (flashcard.topic_vocabulary_list.length > 0) {
            setVocabulary(flashcard.vocabulary_stack[0]);
        }


    }, []);



    return (
        <ScrollView>



            <CardFlip
                ref={_refCardFlip}
                style={{
                    height: 140
                }}
            >
                <CardVocabulary
                    onItemPress={() => _refCardFlip.current.flip()}
                    containerStyle={{
                        height: 140,
                        alignItems: 'center'
                    }}
                    name={vocabulary?.name}
                    type={vocabulary?.word_type}
                    phon={vocabulary?.phon_us}
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
                    onSoundPress={_onPlayVocabularySound}
                    isPlayingSound={isPlaySound}

                />
                <CardMeaning
                    onItemPress={() => _refCardFlip.current.flip()}
                    containerStyle={{
                        height: 140
                    }}
                    meaning={vocabulary?.meaning}
                
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



            {/* Word Meaning and Example */}
            <View
                style={[styles.exampleBox, {
                    marginTop: 32
                }]}
            >
                <Text
                    style={{
                        fontWeight: '700'
                    }}
                >
                    Definition
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        fontStyle: 'italic',
                        color: 'grey'
                    }}
                >
                    {vocabulary?.definition}

                </Text>

                {/* User Chating Card */}
                <Text
                    style={{
                        fontWeight: '700',
                        marginTop: 32
                    }}
                >
                    Example
                </Text>
                <View
                    style={[
                        styles.row,
                        {
                            justifyContent: 'flex-start',
                            alignItems: 'flex-end',
                        }
                    ]}
                >

                    <View
                        style={{
                            width: '10%'
                        }}
                    >
                        <Image
                            source={{
                                uri: CommonImages.avatar
                            }}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 25,
                            }}
                        />

                    </View>
                    <View
                        style={{
                            width: '80%',
                            marginHorizontal: 8,
                            backgroundColor: CommonColor.primary,
                            padding: 18,
                            borderBottomLeftRadius: 2,
                            borderTopLeftRadius: 32,
                            borderTopRightRadius: 22,
                            borderBottomRightRadius: 22
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 16
                            }}
                        >
                            {vocabulary?.example}
                        </Text>
                    </View>
                </View>
            </View>



            {/* Vocabulary Options */}
            <View
                style={[styles.row, {
                    justifyContent: 'space-around',
                    marginVertical: 22
                }]}
            >
                <TouchableOpacity
                    style={[
                        styles.buttonSelect
                    ]}
                    onPress={_onSkipVocabulary}

                >
                    <Text
                        style={{
                            fontWeight: '700',
                            color: 'white',
                            fontSize: 18
                        }}
                    >
                        SKIP
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.buttonSelect,
                        {
                            backgroundColor: CommonColor.primary
                        }
                    ]}

                    onPress={_onSelectVocabulary}
                >
                    <Text
                        style={{
                            fontWeight: '700',
                            color: 'white',
                            fontSize: 18
                        }}
                    >
                        LEARN
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
export default F_FlashCardChoiceScreen

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    exampleBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        backgroundColor: 'white',
        padding: 12,
        margin: 6,
        borderRadius: 6,

    },
    buttonSelect: {
        padding: 12,
        borderRadius: 6,
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'grey'
    }

})
