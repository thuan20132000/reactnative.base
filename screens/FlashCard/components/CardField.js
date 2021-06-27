import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import CommonImages from '../../../utils/CommonImages'
import { url_absolute } from '../../../config/api_config.json';
import config from '../../../app/constants/config';
const CardField = ({
    label,
    labelStyle,
    image_path,
    onItemPress,

}) => {



    const image_url = image_path ?? 'https://picsum.photos/700';

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    paddingHorizontal: 12,
                    marginHorizontal: 6,
                    marginVertical: 2,
                    borderRadius: 6,
                    alignItems: 'center',
                    flexDirection: 'row'
                }
            ]}
            onPress={onItemPress}
        >
            {
                image_path &&
                <Image
                    source={{
                        uri: image_url
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
                    styles.textStyle,
                    {
                        marginLeft: 2
                    }
                ]}
                numberOfLines={2}
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
        minHeight: 120,

    },
    textStyle: {
        fontWeight: '700',
        fontSize: 16
    }
})
