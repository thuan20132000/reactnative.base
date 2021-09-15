import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BOXSHADOW, COLORS } from '../../../app/constants/themes'

const VocabularyItem = ({
    title,
    status = 'hard',
    onItemPress
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container
            ]}
            onPress={onItemPress}
        >

            <View
                style={{ flex: 3 }}
            >
                <Text style={{ fontSize: 18, marginHorizontal: 4 }}>
                    {title}
                </Text>

            </View>
            <View
                style={{ flex: 1 }}
            >
                <Text>{status}</Text>

            </View>
        </TouchableOpacity>
    )
}

export default VocabularyItem

const styles = StyleSheet.create({
    container: {
        padding: 4,
        marginHorizontal: 4,
        marginVertical: 2,
        backgroundColor: 'white',
        borderRadius: 8,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        ...BOXSHADOW.normal,
    },
    button: {
        padding: 6,
        borderWidth: 1,
        borderColor: 'red'
    }
})
