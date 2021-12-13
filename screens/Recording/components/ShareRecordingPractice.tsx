import React from 'react'
import { StyleSheet, Text, TextInputProps, View } from 'react-native'
import { Button, ButtonProps } from 'react-native-elements'
import CommonTextInput from '../../../components/Input/CommonTextInput'


interface ShareRecordingI {
    value: string,
    onChangeText: TextInputProps['onChangeText'],
    onSharePress: ButtonProps['onPress']

}

const ShareRecordingPractice = (props: ShareRecordingI) => {
    return (
        <View style={{ ...styles.container }}>
            <CommonTextInput
                style={{
                    height: 220,
                    textAlignVertical: 'top',
                    padding: 12
                }}
                placeholder='Write somethings about your practices.'
                labelStyles={{
                    fontSize: 14,
                    padding: 6
                }}
                multiline={true}
                value={props.value}
                onChangeText={props.onChangeText}
            />
            <Button
                title="Share"
                containerStyle={{
                    marginHorizontal: 20,
                    borderRadius: 20,
                    marginVertical: 20
                }}
                onPress={props.onSharePress}
            />
        </View>
    )
}

export default ShareRecordingPractice

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 12,
        paddingTop: 60
    }
})
