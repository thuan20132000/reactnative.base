import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CardTopic from './components/CardTopic'
import * as flashcardAction from '../../store/actions/flashcardActions';
import { useDispatch, useSelector } from 'react-redux';
import vocabulary_list from '../../data/flashcard.json';
import { getTopicList, getTopicVocabulary } from '../../utils/api_v1';
import { _onPlaySoundLocal } from '../../utils/helper';
import Sound from 'react-native-sound';

const F_FlashCardHomeScreen = (props) => {

    const dispatch = useDispatch();

    const flashcard = useSelector(state => state.flashcard);
    const [topicList, setTopicList] = useState([]);

    const _onFetchTopicList = async () => {
        let fetchRes = await getTopicList();
        if (fetchRes.status) {
            setTopicList(fetchRes.data);
        }
    }

    useEffect(() => {

        _onFetchTopicList();

        const unsubscribe = props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            dispatch(flashcardAction.resetLearnVocabularyList());

        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;

    }, [props.navigation]);




    const _onSelectTopic = async (topic) => {

      
        let fetchRes = await getTopicVocabulary(topic.id);
        if (fetchRes.status && fetchRes.data?.length > 0) {
            dispatch(flashcardAction.setTopicVocabularyList(fetchRes.data));
            props.navigation.navigate('FlashCardChoice', {
                topic: topic
            })
        }



    }

    return (
        <ScrollView>
            {
                topicList.length > 0 &&
                topicList.map((e, index) =>
                    <CardTopic key={index.toString()}
                        onPress={() => _onSelectTopic(e)}
                        title={e.name}
                        image_path={e.image}
                    />

                )
            }



        </ScrollView>
    )
}

export default F_FlashCardHomeScreen

const styles = StyleSheet.create({})
