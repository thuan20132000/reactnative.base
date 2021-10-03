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
                    width: 60,
                    height: 50
                }}
                resizeMode={'contain'}
            />
            <Text style={{fontWeight:'700',fontSize:14}}>{label}</Text>
        </TouchableOpacity>
    )
}

export default SelectionItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 80,
        margin: 8,
        borderRadius: 8,
        ...BOXSHADOW.normal,
        alignItems:'center',
        padding:2,
        flex:1
    }
})
