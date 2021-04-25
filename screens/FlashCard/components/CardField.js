import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import CommonImages from '../../../utils/CommonImages'
import {url_absolute} from '../../../config/api_config.json';
const CardField = ({
    label,
    labelStyle,
    image_url,
    onItemPress,

}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    padding: 12,
                    width: deviceWidth / 2 - 10,
                    marginHorizontal: 2,
                    marginVertical: 2,
                    borderRadius: 6,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            ]}
            onPress={onItemPress}
        >
            {
                image_url &&
                    <Image
                        source={{
                            uri: `${url_absolute}/${image_url}` || CommonImages.avatar
                        }}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 6
                        }}
                        resizeMode={'contain'}
                    />

            }
            <Text
                style={[
                    labelStyle,
                    styles.textStyle
                ]}
            >
                {label}
            </Text>

        </TouchableOpacity>
    )
}

export default CardField
const deviceWidth = Dimensions.get('screen').width;
const deviceHeoght = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        minHeight:160,

    },
    textStyle: {
        fontWeight: '700',
        fontSize: 18
    }
})
