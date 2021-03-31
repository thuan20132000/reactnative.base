import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { useSelector } from 'react-redux';


const F_FlashCardPracticeFinishScreen = () => {



    const flashcard = useSelector(state => state.flashcard);
    console.warn(flashcard);

    return (
        <View
            style={[
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: 'white'
                }
            ]}
        >
            <View>
                <Image
                    source={
                        require('../../utils/photos/congratulation1.png')
                    }
                    style={{
                        width: 120,
                        height: 120
                    }}
                />
            </View>
            <Text>Congratulation, You just learnt  {flashcard.learnt_vocabulary_list.length} vocabulary today.</Text>

        </View>
    )
}

export default F_FlashCardPracticeFinishScreen

const styles = StyleSheet.create({})
