import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CommonColor from '../../../utils/CommonColor'

import CommonImages from '../../../utils/CommonImages'

const CardTopic = ({
    onPress
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container
            ]}
            onPress={onPress}
        >
            <Image
                source={{
                    uri: CommonImages.avatar
                }}
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40
                }}
            />
            <View
                style={[
                    styles.column,
                    {
                        justifyContent: 'center',
                        marginHorizontal: 22
                    }
                ]}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: 'dodgerblue'
                    }}
                >
                    Education
                </Text>
                <Text
                    style={{
                        color: CommonColor.primary,
                        fontSize: 16,
                    }}
                >
                    0/75
                </Text>

            </View>
        </TouchableOpacity>
    )
}

export default CardTopic

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        backgroundColor: 'white',
        marginHorizontal: 8,
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 4

    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    }
})
