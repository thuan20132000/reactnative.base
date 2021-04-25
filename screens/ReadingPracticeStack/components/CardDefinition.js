import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import CommonImages from '../../../utils/CommonImages'

const CardDefinition = ({
    containerStyle,
    word_type,
    firstDefinition,
    secondDefinition,
    children,
    name,
    meaning

}) => {
    return (
        <View
            style={[
                styles.vocabularyBox,
                containerStyle
            ]}
        >
          
            {
                meaning &&
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: '700',
                        color: 'black'
                    }}
                >
                    {meaning}
                </Text>
            }
            {
                word_type &&
                <Text
                    style={{
                        fontStyle: 'italic'
                    }}
                >
                    ({word_type})
                </Text>
            }
            <View
                style={{
                    marginVertical:6
                }}
            >
                
                {
                    name &&
                    <Text>{name}</Text>
                }
                {
                    firstDefinition &&
                    <Text
                        style={{
                            fontSize: 16,
                            marginTop: 6,
                            fontStyle: 'italic'
                        }}
                    >
                        {firstDefinition}
                    </Text>

                }

            </View>
            {/* <Text> {secondDefinition}</Text> */}
            {
                children
            }
        </View>
    )
}

export default CardDefinition

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
