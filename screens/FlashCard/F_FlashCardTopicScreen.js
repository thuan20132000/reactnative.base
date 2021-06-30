import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import CardTopic from './components/CardTopic'
import * as flashcardAction from '../../store/actions/flashcardActions';
import { useDispatch, useSelector } from 'react-redux';
import { getFieldTopic, getTopicList, getTopicVocabulary } from '../../utils/api_v1';
import { getLearntVocabularyByTopic, saveLearntVocabularyByTopic, _onPlaySoundLocal } from '../../utils/helper';
import TopicModel from '../../app/models/topicModel';
import VocabularyModel from '../../app/models/vocabularyModel';
import QuizAPI from '../../app/API/QuizAPI';


const F_FlashCardTopicScreen = (props) => {

    const {field} = props.route?.params;

    const dispatch = useDispatch();

    const flashcard = useSelector(state => state.flashcard);
    const [topicList, setTopicList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

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

        QuizAPI.getAllTopicByField(field?.id)
        .then(res => {
            setIsLoading(true)
            if(res.status_code === 200 && res.data?.length > 0){
                let topicListData = [];
                res.data?.forEach((e) => {
                    let topic = new TopicModel(e);
                    topicListData = [...topicListData,topic];
                });
                setTopicList(topicListData);
            }
        }).catch((err) => {
            console.log('err: ',err)
        })
        .finally(() => setIsLoading(false))

    }, [])

    function getFields(input, field) {
        var output = [];
        for (var i = 0; i < input.length; ++i)
            output.push(input[i][field]);
        return output;
    }


    const _onSelectTopic = async (topic) => {
        setIsLoading(true);


        try {
            // get learnt vocabulary from localstorage
            let learnt_vocabulary_list = await getLearntVocabularyByTopic(topic.slug);

            if (learnt_vocabulary_list?.length == topic.vocabulary_total) {
                props.navigation.navigate('FlashCardTopicVocabulary', {
                    topic: topic
                })

            } else {
                let topic_vocabulary_all_list = await QuizAPI.getTopicVocabulary(topic.id);
                topic_vocabulary_all_list = topic_vocabulary_all_list.data;
               
                if (learnt_vocabulary_list == null) {
                    learnt_vocabulary_list = [];
                } 
                console.log(topic_vocabulary_all_list);
                // get learnt vocabulary ID list
                let fields_id = getFields(learnt_vocabulary_list, 'id');
                if (topic_vocabulary_all_list && topic_vocabulary_all_list.length > 0) {
                    let leave_vocabulary_list = topic_vocabulary_all_list.filter((e) => !fields_id.includes(e.id));
                    dispatch(flashcardAction.setTopicVocabularyList(topic_vocabulary_all_list, leave_vocabulary_list, topic.slug));

                    props.navigation.navigate('FlashCardChoice', {
                        topic: topic
                    })
                }

            }

        } catch (error) {
            console.warn('error: ', error);
        }


        setIsLoading(false);

    }


    const _onRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            getTopicList().then((data) => {
                if (data.status) {
                    setTopicList(data.data)
                }
            })
            setIsRefreshing(false)
        }, 1200);
    }



    if(isLoading){
        return (
            <View
                style={{
                    display:'flex',
                    flex:1,
                    justifyContent:'center'
                }}
            >
                <ActivityIndicator
                    animating={true}
                    color={'coral'}
                    size={'large'}
                />
            </View>
        )
    }

    return (


        <ScrollView
          
        >
            {
                topicList.length > 0 &&
                topicList.map((e, index) =>
                    <CardTopic key={index.toString()}
                        onPress={() => _onSelectTopic(e)}
                        image_path={e.image}
                        topic_vocabulary_number={e.vocabulary_total}
                        topic={e}
                    />

                )
            }



        </ScrollView>
    )
}

export default F_FlashCardTopicScreen

const styles = StyleSheet.create({})
