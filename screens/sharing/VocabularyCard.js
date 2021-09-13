import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import CommonColor from '../../utils/CommonColor'
import CommonIcons from '../../utils/CommonIcons'

const VocabularyCard = ({
    containerStyle,
    children,
    title,
    onFlipPress,
    isAnswered

}) => {
    return (
        <View
            style={[
                styles.vocabularyBox,
                containerStyle
            ]}
        >
            {
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: '500',
                        color: 'black'
                    }}
                    numberOfLines={4}
                >
                    {title}
                </Text>
            }
            {
                isAnswered &&
                <IconButton
                    icon={CommonIcons.rotateCircle}
                    color={CommonColor.primary}
                    size={32}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 10
                    }}
                    onPress={onFlipPress}

                />

            }

        </View>
    )
}

export default VocabularyCard

const styles = StyleSheet.create({

    vocabularyBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        backgroundColor: 'white',
        padding: 6,
        margin: 6,
        borderRadius: 6,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
