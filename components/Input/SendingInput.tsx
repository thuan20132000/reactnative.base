import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TextInputProps, StyleSheetProperties, TextPropTypes, TextProps, ViewStyle } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import Constants from '../../app/constants/Constant'

interface TextInputI {
    style?: TextInputProps['style'],
    label?: String,
    labelStyles?: TextProps['style'],
    value?: String,
    placeholder?: TextInputProps['placeholder']
    multiline?: TextInputProps['multiline'],
    onChangeText?: TextInputProps['onChangeText'],
    rightIcon?: String,
    containerStyle?: ViewStyle,
    onFocus?: TextInputProps['onFocus']

}
const SendingInput = (props: TextInputI) => {
    return (
        <View style={[styles.container, Constants.styles.boxshadow, props.containerStyle]}>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 8 }}>
                <TextInput
                    placeholder={props.placeholder}
                    style={[styles.input, props.style]}
                    onChangeText={props.onChangeText}
                    multiline={props.multiline}
                    importantForAutofill='no'
                    onFocus={props.onFocus}
                />

                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.send} size={22} color={Constants.COLORS.primary} />
                    }
                />



            </View>
        </View>
    )
}

export default SendingInput

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 6
    },
    input: {
        height: 40,
        paddingHorizontal: 8,
        flex: 1
    },
    label: {

    }
})
