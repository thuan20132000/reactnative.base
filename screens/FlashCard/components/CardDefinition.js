import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CardDefinition = ({
    containerStyle,
    word_type,
    firstDefinition,
    secondDefinition,
    children,
    name

}) => {
    return (
        <View
            style={[
                styles.vocabularyBox,
                containerStyle
            ]}
        >
            <Text style={{ fontSize: 16, fontWeight: '700',color:'grey' }}>Definition</Text>
            {
                word_type &&
                <Text>
                    ({word_type})
                </Text>
            }
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
