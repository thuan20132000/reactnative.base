import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Chip, IconButton } from 'react-native-paper';
import CommonColor from '../../utils/CommonColor'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../utils/CommonIcons';
import Sound from 'react-native-sound';
import { getVocabularyDefinition } from '../../utils/api_v1';
import { _onPlaySound } from '../../utils/helper';
import { url_absolute } from '../../config/api_config.json';

const F_VocabularyDefinitionScreen = (props) => {

    const { vocabulary } = props.route.params;
    const [isLoading, setIsLoading] = useState(false);

    const [vocabularyData, setVocabularyData] = useState({
        name: '',
        sound_us: '',
        sound_uk: '',
        type: '',
        phon_us: '',
        phon_uk: '',
        definitions: []

    })

    const _onGetVocabularyDefinitions = async () => {
        setIsLoading(true);
        let vocabularyData = await getVocabularyDefinition(vocabulary.id);
        setVocabularyData({
            ...vocabularyData,
            name: vocabularyData.data?.name,
            sound_us: vocabularyData.data?.sound_uk,
            sound_uk: vocabularyData.data?.sound_us,
            phon_us: vocabularyData.data?.phon_us,
            phon_uk: vocabularyData.data?.phon_uk,
            type: vocabularyData.data?.word_type,
            definitions: vocabularyData.data?.definitions
        })
        setIsLoading(false);
    }

    useEffect(() => {
        // _onGetVocabularyDefinitions();
        setVocabularyData(vocabulary);

    }, []);


    const _onPlayVocabularySound = async (sound) => {
        // console.warn(sound_name);
        //    await  _onPlaySound(sound_name);
        try {
            let path = `${url_absolute}${sound}`;
            setTimeout(() => {
                var sound = new Sound(path, '', (error) => {
                    /* ... */
                    if (error) {
                        console.log('error: ', error);
                        return;

                    }
                    sound.play((success) => console.log('play success'));
                });

                setTimeout(() => {
                    sound.release();
                }, 1200);

            }, 100);

        } catch (error) {
            console.warn(error);
        }
    }



    if (isLoading) {
        return (
            <ActivityIndicator
                size="large"
                color={'coral'}
            />
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.header}>

                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontSize: 26, fontFamily: 'Roboto', fontWeight: '600' }}>{vocabularyData?.name}</Text>
                        <Chip style={{ backgroundColor: '#0DA6E4', marginHorizontal: 10, justifyContent: 'center' }}
                            onPress={() => console.log('Pressed')}
                        >
                            <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>{vocabularyData?.word_type}</Text>
                        </Chip>

                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Text style={styles.textPronunciation}><Text style={{ color: '#DF330F', backgroundColor: '#F2C827' }}>us</Text>{vocabularyData?.phon_us}</Text>
                            <Text style={styles.textPronunciation}><Text style={{ color: 'white', backgroundColor: '#E16624' }}>uk</Text>{vocabularyData?.phon_uk}</Text>
                        </View>
                        <View>

                            <IconButton
                                icon={CommonIcons.volumnHigh}
                                color={CommonColor.secondary}
                                size={26}
                                onPress={() => _onPlayVocabularySound(vocabularyData.sound_us)}
                            />
                            <IconButton
                                icon={CommonIcons.volumnHigh}
                                color={CommonColor.secondary}
                                size={26}
                                onPress={() => _onPlayVocabularySound(vocabularyData.sound_uk)}
                            />
                        </View>

                    </View>

                </View>

                <View style={styles.body}>

                    {
                        vocabularyData  &&
                 
                            <View style={{ width: '100%', paddingBottom: 12 }} >
                                <View style={styles.explaination}>
                                    {/* <Text style={{...styles.textExplainTitle},[{color:'white',fontSize:22,marginRight:6}]}>
                                           {index+1} 
                                        </Text> */}
                                    <Text style={styles.textExplainTitle}><MaterialCommunityIcon name={'star'} color='yellow' />{vocabularyData?.definition} </Text>
                                </View>
                                <View style={styles.explainExample}>
                                   <Text style={styles.textExplainExample}> - {vocabularyData?.example}</Text>
                                </View>
                            </View>

                        
                    }


                </View>
            </ScrollView>

        </View>
    )
}

export default F_VocabularyDefinitionScreen

const styles = StyleSheet.create({

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: 6,
        borderRadius: 8,
        backgroundColor: '#435E7D',
        paddingVertical: 6,
        paddingLeft: 22,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.33,
        shadowRadius: 2.97,

        elevation: 21,
    },
    textName: {
        fontSize: 28,
        color: 'white',
        fontWeight: '500'
    },
    textPronunciation: {
        fontSize: 16,
        color: 'white'
    },
    body: {
        padding: 4,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.33,
        shadowRadius: 2.97,

        elevation: 21,
    },
    textExplainTitle: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Roboto',
        padding: 8

    },
    textExplainExample: {
        color: 'black',
        paddingLeft: 20,
        fontSize: 18,
        fontStyle: 'italic',
        paddingVertical: 4
    },
    explainExample: {
    },
    explaination: {
        // display:'flex',
        // flexDirection:'row',
        // alignItems:'flex-start',
        backgroundColor: '#536983',
        padding: 6,
        borderRadius: 8
    }
})
