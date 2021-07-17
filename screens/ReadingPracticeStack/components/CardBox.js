import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import CommonImages from '../../../utils/CommonImages'
import CommonColor from '../../../utils/CommonColor'
import { url_absolute } from '../../../config/api_config.json'
import { config } from '../../../app/constants'

const CardBox = ({
    label,
    labelStyle,
    onItemPress,
    disabled = false,
    containerStyle,
    image_path
}) => {

    const image_url = config?.aws_url+image_path;
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: 'white',
                },
                containerStyle

            ]}
            onPress={onItemPress}
            disabled={disabled}
        >
            <Text
                style={[
                    styles.text,
                    labelStyle,
                ]}
            >
                {label}
            </Text>
            <Image
                source={{
                    uri: image_url
                }}
                style={{
                    width: 70,
                    height: 60
                }}
                resizeMode={'contain'}
            />
        </TouchableOpacity>
    )
}

export default CardBox

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
            height: 3,
        },
        shadowOpacity: 0.34,
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
        fontSize: 14
    }
})
