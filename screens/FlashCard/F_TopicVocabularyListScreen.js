import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { getLearntVocabularyByTopic } from '../../utils/helper'
import ItemVocabulary from './components/ItemVocabulary';
import Sound from 'react-native-sound';
import { url_absolute } from '../../config/api_config.json';

const F_TopicVocabularyListScreen = (props) => {

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
            title:topic?.name
        })
    },[]);



    const _onPlaySound = (sound) => {
        console.warn(sound);
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
        props.navigation.navigate('VocabularyDefinition',{
            vocabulary:e
        });
    }

    return (
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
                        onItemPress={()=>_onItemPress(e)}
                    />

                )

            }
        </ScrollView>
    )
}

export default F_TopicVocabularyListScreen

const styles = StyleSheet.create({})
