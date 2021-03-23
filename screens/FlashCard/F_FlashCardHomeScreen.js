import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CardTopic from './components/CardTopic'

const F_FlashCardHomeScreen = (props) => {


    const _onSelectTopic = (topic) => {
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
