import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import CommonColor from '../../../utils/CommonColor'
import CommonIcons from '../../../utils/CommonIcons'

const CardVocabulary = ({
    onItemPress,
    onSoundPress,
    containerStyle,
    children,
    name,
    type,
    phon,
    isPlayingSound = false
}) => {
    return (
        <View
            style={[styles.row, styles.vocabularyBox, containerStyle]}
            onPress={onItemPress}
        >
            {
                isPlayingSound ?
                    <Image
                        source={
                            require('../../../utils/gif/sound_playing.gif')
                        }
                        style={{
                            width: 80,
                            height: 80,
                        }}
                    />
                    :
                    <IconButton
                        icon={CommonIcons.volumnHigh}
                        color={CommonColor.primary}
                        size={43}
                        onPress={onSoundPress}
                        disabled={isPlayingSound}

                    />
            }

            <View
                style={[styles.column]}
            >
                <Text>({type})</Text>
                <Text
                    style={{
                        fontWeight: '700',
                        fontSize: 18
                    }}
                >
                    {name}
                </Text>
                <Text>{phon}</Text>

            </View>
            {
                children
            }
        </View>
    )
}

export default CardVocabulary

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    vocabularyBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        backgroundColor: 'white',
        padding: 12,
        margin: 6,
        borderRadius: 6,
    }
})
