import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BOXSHADOW } from '../../../app/constants/themes'

const SelectionItem = ({
    label,
    imagePath,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={[styles.container]}
            onPress={onPress}
        >
            <Image
                source={imagePath}
                style={{
                    width: 100,
                    height: 60
                }}
                resizeMode={'contain'}
            />
            <Text style={{fontWeight:'700'}}>{label}</Text>
        </TouchableOpacity>
    )
}

export default SelectionItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 120,
        height: 80,
        margin: 8,
        borderRadius: 8,
        ...BOXSHADOW.normal,
        alignItems:'center',
        padding:2
    }
})
