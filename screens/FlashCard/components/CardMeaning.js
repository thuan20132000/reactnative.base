import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CardMeaning = ({
    onItemPress,
    containerStyle,
    children
}) => {
    return (
        <View
            style={[
                styles.vocabularyBox,
                containerStyle
            ]}
            onPress={onItemPress}
        >
            <Text>Accurate</Text>

        {
            children
        }
        </View>
    )
}

export default CardMeaning

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
