import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '../sharing/SearchBar'
import SpeechToText from '../sharing/SpeechToText'

const VocabularySearchScreen = () => {
    return (
        <SafeAreaView
            style={[styles.container]}
        >
            <SearchBar />


        </SafeAreaView>
    )
}

export default VocabularySearchScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1
    }
})
