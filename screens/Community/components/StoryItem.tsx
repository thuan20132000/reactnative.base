import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from '../../../app/constants/Constant'

const StoryItem = () => {
    return (
        <View style={[styles.container]}>
            <Text>Story</Text>
        </View>
    )
}

export default StoryItem

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        backgroundColor: '#ffffff',
        margin: 8,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        ...Constants.styles.boxshadow
    }
})
