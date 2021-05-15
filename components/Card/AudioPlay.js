import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton, ProgressBar } from 'react-native-paper'
import CommonIcons from '../../utils/CommonIcons'

const AudioPlay = ({
    onPlay,
    onPause,
    isPlaying = false,
    durationTime,
    currentProgress = 0

}) => {
    return (
        <View
            style={[styles.container]}
        >

            <View
                style={[styles.buttonGroup]}
            >
                {
                    isPlaying ?
                        <IconButton
                            icon={CommonIcons.pauseCircleOutline}
                            size={32}
                            color={'red'}
                            style={{
                                marginHorizontal: 12
                            }}
                            onPress={onPause}
                        /> :
                        <IconButton
                            icon={CommonIcons.playCircleOutline}
                            size={32}
                            color={'red'}
                            style={{
                                marginHorizontal: 12
                            }}
                            onPress={onPlay}
                        />

                }

                <ProgressBar
                    indeterminate={false}
                    style={{
                        width: 220
                    }}
                    focusable={true}
                    progress={currentProgress}
                    color={'grey'}

                />
                <Text
                    style={{
                        marginHorizontal: 12
                    }}
                >
                    {durationTime || '00:00'}
                </Text>
            </View>

        </View>
    )
}

export default AudioPlay

const styles = StyleSheet.create({
    container: {
        display: 'flex',

    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
