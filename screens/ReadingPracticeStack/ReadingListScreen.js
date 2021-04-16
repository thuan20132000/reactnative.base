import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CardTopic from './components/CardTopic'

const ReadingListScreen = (props) => {



    const _onNavigateToDetail = () => {
        props.navigation.navigate('ReadingPractice');
    }

    return (
        <ScrollView>
            <Text></Text>

            {
                Array(10).fill({}).map((e,index) =>
                    <CardTopic
                        key={index.toString()}
                        onPress={()=>_onNavigateToDetail()}
                    />
                )
            }

        </ScrollView>
    )
}

export default ReadingListScreen

const styles = StyleSheet.create({})
