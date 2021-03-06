import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import CommonIcons from '../../../utils/CommonIcons'

const BottomRecordingNavigation = ({
    onStartRecordPress,
    onStopRecordPress,
    onPauseRecordPress,
    isRecording = false,
    recordingTime,
    children,
}) => {
    return (
        <View
            style={[
                styles.container,
                {
                    display: 'flex',
                    flexDirection: 'column',

                }
            ]}
        >
            <View
                style={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                }
            >
               
                {
                    recordingTime &&
                        <Text>{recordingTime}</Text>
                }
            </View>
            {children}
            
        </View>
    )
}

export default BottomRecordingNavigation

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        minHeight: 160,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22
    }
})
