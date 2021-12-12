import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import Constants from '../../../app/constants/Constant'

interface StoryI {
    name?: String,
    onPress?: TouchableOpacityProps['onPress'],
    containerStyle?: TouchableOpacityProps['style']
}
const StoryItem = (props: StoryI) => {
    return (
        <TouchableOpacity style={[styles.container, props.containerStyle]}
            onPress={props.onPress}
        >
            <Text>{props.name}</Text>
        </TouchableOpacity>
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
