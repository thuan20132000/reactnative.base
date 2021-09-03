import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'


const TopicItem = ({
    label,
    labelStyle,
    onItemPress,
    disabled = false,
    containerStyle,
    image_path
}) => {

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    height: 80,
                    minWidth:200
                },
                containerStyle

            ]}
            onPress={onItemPress}
            disabled={disabled}
        >
            <Image
                source={{
                    uri: image_path
                }}
                style={{
                    width: 70,
                    height: 60
                }}
                resizeMode={'contain'}
            />
            <Text
                style={[
                    styles.text,
                    labelStyle,
                ]}
            >
                {label}
            </Text>

        </TouchableOpacity>
    )
}

export default TopicItem

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        minWidth: 120,
        minHeight: 30,
        marginVertical: 4,
        marginHorizontal: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.14,
        shadowRadius: 6.27,

        elevation: 10,
        padding: 6,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '700'
    }
})
