import React from 'react'
import { StyleSheet, Text, View, TextInput, TextInputProps, StyleSheetProperties, TextPropTypes, TextProps } from 'react-native'
import Constants from '../../app/constants/Constant'

interface TextInputI {
    style?: TextInputProps['style'],
    label?: String,
    labelStyles?: TextProps['style'],
    value?: String,
    placeholder?: TextInputProps['placeholder']
    multiline?: TextInputProps['multiline'],
    onChangeText?: TextInputProps['onChangeText'],
}
const CommonTextInput = (props: TextInputI) => {
    return (
        <View style={{ ...styles.container, ...Constants.styles.boxshadow }}>
            {
                props.label &&
                <Text style={[styles.label, props.labelStyles]}>{props.label}</Text>

            }
            <TextInput
                placeholder={props.placeholder}
                style={[styles.input, props.style]}
                onChangeText={props.onChangeText}
                multiline={props.multiline}
            />
        </View>
    )
}

export default CommonTextInput

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        marginHorizontal: 12,
        borderRadius: 6
    },
    input: {
        height: 40,
        paddingHorizontal:8
    },
    label: {

    }
})
