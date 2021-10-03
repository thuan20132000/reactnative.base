import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Chip, IconButton } from 'react-native-paper'
import CommonColor from '../../utils/CommonColor'
import CommonIcons from '../../utils/CommonIcons'

const VocabularyCard = ({
    containerStyle,
    children,
    title,
    wordTypes = '',
    example,
    onFlipPress,
    isAnswered,
    onSearch

}) => {

    return (
        <View
            style={[
                styles.vocabularyBox,
                containerStyle
            ]}
        >
            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: '500',
                        color: 'black',
                        marginHorizontal: 6
                    }}
                    numberOfLines={4}
                >
                    {title}
                </Text>
                {
                    wordTypes?.length > 0 &&
                    <Chip

                        style={{ backgroundColor: CommonColor.primary }}
                        textStyle={{ color: 'white', fontWeight: '700' }}

                    >
                        {wordTypes}
                    </Chip>

                }
            </View>

            {
                example &&
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '400',
                        color: 'gray',
                        fontStyle: 'italic'
                    }}
                    numberOfLines={4}
                >
                    {example}
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
            {
                onSearch &&
                <IconButton
                    icon={CommonIcons.search}
                    color={CommonColor.primary}
                    size={32}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 10
                    }}
                    onPress={onSearch}

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
