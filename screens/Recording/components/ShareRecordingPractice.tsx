import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import CommonTextInput from '../../../components/Input/CommonTextInput'

const ShareRecordingPractice = () => {
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
            />
            <Button
                title="Share"
                containerStyle={{
                    marginHorizontal: 20,
                    borderRadius: 20,
                    marginVertical: 20
                }}

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
