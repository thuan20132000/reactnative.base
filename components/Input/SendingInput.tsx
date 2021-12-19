import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TextInputProps, StyleSheetProperties, TextPropTypes, TextProps, ViewStyle, ButtonProps } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import Constants from '../../app/constants/Constant'

interface TextInputI {
    style?: TextInputProps['style'],
    label?: string,
    labelStyles?: TextProps['style'],
    value?: string,
    placeholder?: TextInputProps['placeholder']
    multiline?: TextInputProps['multiline'],
    onChangeText?: TextInputProps['onChangeText'],
    rightIcon?: string,
    containerStyle?: ViewStyle,
    onFocus?: TextInputProps['onFocus'],
    onSendPress?: ButtonProps['onPress'],
    onShowAudioCommentPress?: ButtonProps['onPress'],
    audio?: any

}
const SendingInput = (props: TextInputI) => {
    return (
        <View style={[styles.container, Constants.styles.boxshadow, props.containerStyle]}>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 8 }}>
                {
                    props.audio &&
                    <Button
                        type='clear'
                        icon={
                            <Icon name={Constants.ionicon.radio} size={22} color={Constants.COLORS.primary} />
                        }
                        onPress={props.onShowAudioCommentPress}
                    />

                }
                <TextInput
                    placeholder={props.placeholder}
                    style={[styles.input, props.style]}
                    onChangeText={props.onChangeText}
                    multiline={props.multiline}
                    importantForAutofill='no'
                    onFocus={props.onFocus}
                    value={props.value}
                />

                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.micro} size={22} color={Constants.COLORS.primary} />
                    }
                    onPress={props.onShowAudioCommentPress}
                />
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.send} size={22} color={Constants.COLORS.primary} />
                    }
                    onPress={props.onSendPress}
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
