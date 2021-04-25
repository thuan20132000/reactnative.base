import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CommonImages from '../../../utils/CommonImages'

const NotificationItem = ({
    title,
    body,
    image,
    onItemPress
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    marginHorizontal: 6,
                    paddingHorizontal: 6
                }
            ]}
            onPress={onItemPress}
        >
            <View
                style={{
                    display: 'flex',
                    flex: 1
                }}
            >
                <Image
                    source={{
                        uri: image || CommonImages.avatar
                    }}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30
                    }}
                />
            </View>
            <View
                style={[
                    styles.body,
                    {
                        paddingHorizontal: 6,
                        flex: 5
                    }
                ]}
            >
                <Text
                    style={{
                        textAlign: 'left'
                    }}
                >
                    {title}
                </Text>
                <Text
                    numberOfLines={1}
                    style={{

                    }}
                    ellipsizeMode={'tail'}
                >
                    {body}
                </Text>

            </View>
        </TouchableOpacity>
    )
}

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default NotificationItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.36,
        shadowRadius: 4.68,

        elevation: 3,
        marginHorizontal: 4,
        marginVertical: 2,
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 4

    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

    }
})
