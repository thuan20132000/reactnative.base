import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import CardTopic from './components/CardTopic'
import * as flashcardAction from '../../store/actions/flashcardActions';
import { useDispatch, useSelector } from 'react-redux';
import { getFieldTopic, getTopicList, getTopicVocabulary } from '../../utils/api_v1';
import { getLearntVocabularyByTopic, saveLearntVocabularyByTopic, _onPlaySoundLocal } from '../../utils/helper';

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
        const _onFetchTopicList = async () => {
            setIsLoading(true);
            let fetchRes = await getFieldTopic(field?.id);
            if (fetchRes.status) {
                setTopicList(fetchRes.data);
            }
            setIsLoading(false);
        }
        _onFetchTopicList();
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
                let topic_vocabulary_all_list = await getTopicVocabulary(topic.id);
                if (learnt_vocabulary_list == null) {
                    learnt_vocabulary_list = [];
                }
                // get learnt vocabulary ID list
                let fields_id = getFields(learnt_vocabulary_list, 'ID');

                if (topic_vocabulary_all_list.status && topic_vocabulary_all_list.data?.length > 0) {
                    let leave_vocabulary_list = topic_vocabulary_all_list.data.filter((e) => !fields_id.includes(e.ID));

                    dispatch(flashcardAction.setTopicVocabularyList(topic_vocabulary_all_list.data, leave_vocabulary_list, topic.slug));
                    props.navigation.navigate('FlashCardChoice', {
                        topic: topic
                    })
                }

            }

        } catch (error) {
            console.log('error: ', error);
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
