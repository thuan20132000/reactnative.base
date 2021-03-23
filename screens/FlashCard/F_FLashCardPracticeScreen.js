import React, { useRef, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CardDefinition from './components/CardDefinition'
import CardFlip from 'react-native-card-flip';
import { IconButton } from 'react-native-paper';
import CommonIcons from '../../utils/CommonIcons';
import CommonColor from '../../utils/CommonColor';
import CardWordItem from './components/CardWordItem';
import Voice from '@react-native-voice/voice';

const F_FLashCardPracticeScreen = (props) => {

    const _refCardFlip = useRef();
    const [selectedWord, setSelectedWord] = useState();
    const [correctWord, setCorrectWord] = useState({
        id: 2,
        name: 'Element',
    })
    const [choiceList, setChoiceList] = useState([
        {
            id: 1,
            name: 'gravity',
        },
        {
            id: 2,
            name: 'Element',
        },
        {
            id: 3,
            name: 'Native',
        }
    ])



    const _onSelectWord = async (word) => {
        setSelectedWord(word);
    }

    const _onCheckWord = async () => {
        if (selectedWord.id != correctWord.id) {
            Alert.alert("Incorrect", "Chon Sai");
            return;
        }


        // console.warn("correct");
        // props.navigation.push('FlashCardPractice')

    }

    const _onSpeechStart = (e) => {
        console.warn('on speech start: ', e);
    }

    const _onSpeechEnd = (e) => {
        console.warn('on speech end: ', e);
    }

    const _onSpeechResult = async (e) => {
        console.warn('speech results: ', e);
    }

    const _onStopRecord = (e) => {
        Voice.stop();
        console.warn(Voice.onSpeechResults);

    }



    React.useEffect(() => {
        Voice.onSpeechStart = _onSpeechStart.bind(this);
        Voice.onSpeechEnd = _onSpeechEnd.bind(this);
        Voice.onSpeechResults = _onSpeechResult.bind(this);

    }, [])

    const _onPlayVocabularySound = async (sound_name) => {
        // console.warn(sound_name);
        //    await  _onPlaySound(sound_name);



        try {
            await Voice.start('en-US');





        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <View>

            <View
                style={{
                    marginBottom: 22
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: '700',
                        marginHorizontal: 12,
                        marginVertical: 12
                    }}
                >
                    Xem định nghĩa và chọn từ đúng
                </Text>



            </View>
            <View>
                <IconButton
                    icon={CommonIcons.rotateCircle}
                    color={CommonColor.primary}
                    size={18}
                    style={{
                        bottom: 10,
                        right: 10,

                    }}
                    onPress={_onPlayVocabularySound}
                />
                <IconButton
                    icon={CommonIcons.bell}
                    color={CommonColor.primary}
                    size={18}
                    style={{
                        bottom: 10,
                        right: 10,

                    }}
                    onPress={_onStopRecord}
                />
            </View>
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
                    word_type={'noun'}
                    firstDefinition={'the act of trying to persuade or to force somebody to do something'}
                    secondDefinition={`difficulties and worries that are caused by the need to achieve or to behave in a particular way`}

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
                    word_type={'noun'}
                    firstDefinition={'hành động cố gắng thuyết phục hoặc buộc ai đó làm điều gì đó'}
                    secondDefinition={`difficulties and worries that are caused by the need to achieve or to behave in a particular way`}

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
                    choiceList.map((e, index) =>
                        <CardWordItem
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
