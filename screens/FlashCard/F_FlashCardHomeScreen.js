import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CardTopic from './components/CardTopic'
import * as flashcardAction from '../../store/actions/flashcardActions';
import { useDispatch, useSelector } from 'react-redux';
import { getTopicList, getTopicVocabulary } from '../../utils/api_v1';
import { getLearntVocabularyByTopic, saveLearntVocabularyByTopic, _onPlaySoundLocal } from '../../utils/helper';

const F_FlashCardHomeScreen = (props) => {

    const dispatch = useDispatch();

    const flashcard = useSelector(state => state.flashcard);
    const [topicList, setTopicList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [localTopicVocabulary, setLocalTopicVocabulary] = useState([]);


    useEffect(() => {


        const unsubscribe = props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            dispatch(flashcardAction.resetLearnVocabularyList());

        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;

    }, [props.navigation]);


    useEffect(() => {
        const _onFetchTopicList = async () => {
            setIsLoading(true);
            let fetchRes = await getTopicList();
            if (fetchRes.status) {
                console.log(fetchRes);
                setTopicList(fetchRes.data);
            }
            setIsLoading(false);
        }
        _onFetchTopicList();
    }, [])

    function getFields(input, field) {
        var output = [];
        for (var i=0; i < input.length ; ++i)
            output.push(input[i][field]);
        return output;
    }
    

    const _onSelectTopic = async (topic) => {
        // setIsLoading(true);

        // get learnt vocabulary from localstorage

        // getLearntVocabularyByTopic(topic.slug)
       
        let res = await getLearntVocabularyByTopic(topic.slug);
        let fetchRes = await getTopicVocabulary(topic.id);
        let fields_id = getFields(res,'ID');
        let topic_vocabulary = fetchRes.data.filter((e) => !fields_id.includes(e.ID));
        console.warn('final: ',topic_vocabulary.length);       
        // console.log(fetchRes);
        setIsLoading(false);
        if (fetchRes.status && fetchRes.data?.length > 0) {
            dispatch(flashcardAction.setTopicVocabularyList(fetchRes.data,topic_vocabulary,topic.slug));
            props.navigation.navigate('FlashCardChoice', {
                topic: topic
            })
        }

    }


    return (
        <>


            <ScrollView>
                {
                    topicList.length > 0 &&
                    topicList.map((e, index) =>
                        <CardTopic key={index.toString()}
                            onPress={() => _onSelectTopic(e)}
                            title={e.name}
                            image_path={e.image}
                            topic_vocabulary_number={65}
                        />

                    )
                }



            </ScrollView>
        </>
    )
}

export default F_FlashCardHomeScreen

const styles = StyleSheet.create({})
