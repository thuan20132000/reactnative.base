import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getLearntVocabularyByTopic, resetLearntVocabularyByTopic } from '../../utils/helper'
import ItemVocabulary from './components/ItemVocabulary';
import Sound from 'react-native-sound';
import { url_absolute } from '../../config/api_config.json';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import { getTopicVocabulary } from '../../utils/api_v1';
import * as flashcardActions from '../../store/actions/flashcardActions';
import { useDispatch } from 'react-redux';

const F_TopicVocabularyListScreen = (props) => {
    const dispatch = useDispatch();
    const { topic } = props.route.params;
    const [learntVocabularyList, setLearntVocabularyList] = useState([]);
    useEffect(() => {


        getLearntVocabularyByTopic(topic?.slug)
            .then((data) => {
                if (data && data.length > 0) {
                    setLearntVocabularyList(data);
                } else {
                    setLearntVocabularyList([]);
                }
            })

        return () => {

        }
    }, []);


    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: `Topic: ${topic?.name}`
        })
    }, []);



    const _onPlaySound = (sound) => {
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
    }



    const _onItemPress = (e) => {
        props.navigation.navigate('VocabularyDefinition', {
            vocabulary: e
        });
    }


    const _onResetVocabularyPress = async () => {
        dispatch(flashcardActions.resetLearnVocabularyList());

        let topic_vocabulary_all_list = await getTopicVocabulary(topic.id);
        dispatch(flashcardActions.setTopicVocabularyList(topic_vocabulary_all_list.data, [], topic.slug));

        // props.navigation.replace('FlashCardChoice', {
        //     topic: topic
        // })
        resetLearntVocabularyByTopic(topic?.slug)
            .then((res) => {
                if(res){
                    props.navigation.navigate('FlashCardTopic')
                }
            })
    }

    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: 'white'
            }}
        >
            <ScrollView>

                {
                    (learntVocabularyList && learntVocabularyList.length > 0)
                    && learntVocabularyList.map((e, index) =>
                        <ItemVocabulary
                            key={index.toString()}
                            name={e.name}
                            phon={e.phon_uk}
                            type={e.word_type}
                            onSoundPress={() => _onPlaySound(e.sound_uk)}
                            onItemPress={() => _onItemPress(e)}
                        />

                    )

                }
            </ScrollView>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ButtonSubmit
                    label={'Ôn lại'}
                    onItemPress={_onResetVocabularyPress}
                />
            </View>
        </View>
    )
}

export default F_TopicVocabularyListScreen

const styles = StyleSheet.create({})
