import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {useSelector} from 'react-redux';


const F_FlashCardPracticeFinishScreen = () => {



    const flashcard = useSelector(state => state.flashcard);
    console.warn(flashcard);

    return (
        <View>
            <Text>Practice Finished</Text>
            <Text>
                {flashcard.learnt_vocabulary_list.length}
            </Text>
        </View>
    )
}

export default F_FlashCardPracticeFinishScreen

const styles = StyleSheet.create({})
