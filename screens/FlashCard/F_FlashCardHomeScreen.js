import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CardTopic from './components/CardTopic'
import * as flashcardAction from '../../store/actions/flashcardActions';
import { useDispatch, useSelector } from 'react-redux';
import vocabulary_list from '../../data/flashcard.json';

const F_FlashCardHomeScreen = (props) => {

    const dispatch = useDispatch();

    const flashcard = useSelector(state => state.flashcard);

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            dispatch(flashcardAction.resetLearnVocabularyList());

        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;

    }, [props.navigation]);


    // useEffect(() => {
    //     console.warn('reset: ',flashcard);

    // }, [flashcard])

    const _onSelectTopic = (topic) => {
        dispatch(flashcardAction.setTopicVocabularyList(vocabulary_list));

        props.navigation.navigate('FlashCardChoice', {
            topic: topic
        })
    }

    return (
        <ScrollView>
            <CardTopic
                onPress={() => _onSelectTopic('education')}
            />
            <CardTopic
                onPress={() => _onSelectTopic('education')}
            />
            <CardTopic
                onPress={() => _onSelectTopic('education')}
            />
            <CardTopic
                onPress={() => _onSelectTopic('education')}
            />
            <CardTopic
                onPress={() => _onSelectTopic('education')}
            />
            <CardTopic
                onPress={() => _onSelectTopic('education')}
            />
            <CardTopic
                onPress={() => _onSelectTopic('education')}
            />
            <CardTopic
                onPress={() => _onSelectTopic('education')}
            />
            <CardTopic
                onPress={() => _onSelectTopic('education')}
            />
            <CardTopic
                onPress={() => _onSelectTopic('education')}
            />
            <CardTopic
                onPress={() => _onSelectTopic('education')}
            />



        </ScrollView>
    )
}

export default F_FlashCardHomeScreen

const styles = StyleSheet.create({})
