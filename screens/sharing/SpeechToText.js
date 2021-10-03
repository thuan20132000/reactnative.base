
import Voice, {
    SpeechRecognizedEvent,
    SpeechResultsEvent,
    SpeechErrorEvent,
} from '@react-native-voice/voice';


import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonColor from '../../utils/CommonColor';
import CommonIcons from '../../utils/CommonIcons';
import { StackActions, useNavigation } from '@react-navigation/core'
import { Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
const SpeechToText = ({
    onSelectVocabulary,
    label,
    value,
    disabled = false
}) => {
    // recognized: '',
    //         pitch: '',
    //         error: '',
    //         end: '',
    //         started: '',
    //         results: [],
    //         partialResults: [],
    const navigation = useNavigation()
    const [recognized, setRecognized] = useState('')
    const [pitch, setPitch] = useState('')
    const [error, setError] = useState('')
    const [end, setEnd] = useState('')
    const [started, setStarted] = useState(false)
    const [results, setResults] = useState([])
    const [partialResults, setPartialResults] = useState([])
    const [inputVocabulary, setInputVocabulary] = useState('')

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechRecognized = onSpeechRecognized;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
        return () => {
            setStarted(false)
            setResults([])
            Voice.destroy().then(Voice.removeAllListeners)
                .catch(err => console.log(err))
                .finally(() => console.log('destroy'))
        }
    }, [])


    const onSpeechStart = (e) => {
        console.log('onSpeechStart: ', e);
        setStarted(true)

    };

    const onSpeechRecognized = (e) => {
        console.log('onSpeechRecognized: ', e);

    };

    const onSpeechEnd = (e) => {
        console.log('onSpeechEnd: ', e);
        setStarted(false)

    };

    const onSpeechError = (e) => {
        console.log('onSpeechError: ', e);

    };

    const onSpeechResults = (e) => {
        if (e?.value?.length > 0) {
            let xx = e?.value?.map(e => e?.toString().toLowerCase())
            let unique = [...new Set(xx)];

            setResults(unique)
        } else {
            setResults([])
        }

    };

    const onSpeechPartialResults = (e) => {
        console.log('onSpeechPartialResults: ', e);

    };

    const onSpeechVolumeChanged = (e) => {
        console.log('onSpeechVolumeChanged: ', e);

    };

    const _startRecognizing = async () => {


        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    };

    const _stopRecognizing = async () => {
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    };

    const _cancelRecognizing = async () => {
        try {
            await Voice.cancel();
        } catch (e) {
            console.error(e);
        }
    };

    const _destroyRecognizer = async () => {
        try {
            await Voice.destroy();
        } catch (e) {
            console.error(e);
        }

    };

    const _onShowVocabulary = (vocabulary) => {
        let word = vocabulary.replace(' ', '-')
        navigation.navigate('Webview', {
            url: `https://www.oxfordlearnersdictionaries.com/definition/english/${word}`
        })
    }

    const _onSelectVocabulary = (vocabulary) => {
        if (typeof onSelectVocabulary === 'function') {
            onSelectVocabulary(vocabulary)
            setResults([])
        } else {
            setInputVocabulary(vocabulary)
            setResults([])

        }
    }

    const _searchVocabulary = () => {
        if (inputVocabulary?.length <= 0) {
            return
        }
        let word = inputVocabulary.replace(' ', '-')
        navigation.navigate('Webview', {
            url: `https://www.oxfordlearnersdictionaries.com/definition/english/${word}`
        })
    }

    const _onChangeInputVocabulary = (text) => {
        setInputVocabulary(text)
        setResults([])
        if (onSelectVocabulary) {
            onSelectVocabulary(text)
        }

    }


    return (
        <View>
            <View style={styles.container}>

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        paddingHorizontal: 12,
                    }}
                >

                    {/* <Text style={{ flex: 3, color: 'gray', fontStyle: 'italic' }}>
                        {started ? "I am listening..." : "Say something..."}
                    </Text> */}
                    <Input
                        label={label}
                        placeholder={started ? "I am listening..." : "Say something..."}
                        multiline
                        disabled={disabled}
                        inputContainerStyle={{
                            borderBottomColor: CommonColor.primary,
                        }}
                        containerStyle={{
                            height: 80
                        }}
                        value={value ?? inputVocabulary}
                        onChangeText={(text) => _onChangeInputVocabulary(text)}
                        rightIcon={
                            <TouchableOpacity
                                onLongPress={_startRecognizing}
                                onPress={_searchVocabulary}
                            >

                                <MaterialCommunityIcons
                                    name={inputVocabulary ? CommonIcons.search : CommonIcons.microphonePlus}
                                    size={34}
                                    color={started ? 'red' : CommonColor.primary}
                                    style={{
                                        flex: 1
                                    }}
                                />
                            </TouchableOpacity>

                        }
                    />

                </View>

                {results?.map((result, index) => {
                    return (
                        <View key={`result-${index}`}
                            style={{
                                padding: 4,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flex: 1,
                                width: Dimensions.get('screen').width,
                                borderBottomWidth: 0.3,
                                paddingHorizontal: 16
                            }}
                        >
                            <Text style={styles.stat}
                                onPress={() => _onSelectVocabulary(result)}
                            >
                                {result}
                            </Text>
                            <MaterialCommunityIcons
                                name={CommonIcons.search}
                                size={28}
                                style={{
                                    marginHorizontal: 12,
                                }}
                                onPress={() => _onShowVocabulary(result)}

                            />
                        </View>
                    );
                })}


                {/* <Text style={styles.stat}>Partial Results</Text>
                {partialResults.map((result, index) => {
                    return (
                        <Text key={`partial-result-${index}`} style={styles.stat}>
                            {result}
                        </Text>
                    );
                })}
                <Text style={styles.stat}>{`End: ${end}`}</Text>
                <TouchableHighlight onPress={_startRecognizing}>
                    <Text>Play</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={_stopRecognizing}>
                    <Text style={styles.action}>Stop Recognizing</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={_cancelRecognizing}>
                    <Text style={styles.action}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={_destroyRecognizer}>
                    <Text style={styles.action}>Destroy</Text>
                </TouchableHighlight> */}
            </View>
        </View>
    )
}

export default SpeechToText


const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    action: {
        textAlign: 'center',
        color: '#0000FF',
        marginVertical: 5,
        fontWeight: 'bold',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    stat: {
        textAlign: 'center',
        color: '#B0171F',
        marginBottom: 1,
        fontSize: 22
    },
});

// export default SpeechToText;
