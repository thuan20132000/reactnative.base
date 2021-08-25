import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CommonImages from '../../../utils/CommonImages'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../../utils/CommonIcons'
import { formatDistance } from 'date-fns'

const NotificationItem = ({
    title,
    body,
    image,
    onItemPress,
    notification
}) => {


    const getNotificationTime = () => {
        const result = formatDistance(new Date(notification?.created_at), new Date(), {
            addSuffix: true
        })

        return result
    }


    return (
        <View
            style={{
                display: 'flex',
                backgroundColor: 'white',
                display: 'flex',
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

            }}
        >
            <TouchableOpacity
                style={[
                    styles.container,
                    {
                        marginHorizontal: 6,
                        paddingHorizontal: 6,
                        alignItems: 'center',
                        height: 60
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
                    {/* <Image
                    source={{
                        uri: image || CommonImages.avatar
                    }}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30
                    }}
                /> */}
                    <MaterialCommunityIcons
                        name={CommonIcons.bell}
                        size={22}
                        color={'gold'}
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
                            textAlign: 'left',
                            fontWeight: "500",
                            color: 'gray'
                        }}
                    >
                        {notification?.title}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{
                            color: 'gray',
                            fontStyle: 'italic'
                        }}
                        ellipsizeMode={'tail'}
                    >
                        {notification?.body}
                    </Text>

                </View>
                <MaterialCommunityIcons
                    name={CommonIcons.arrowRightChevron}
                    size={28}
                />


            </TouchableOpacity>

            <View
                style={[
                    styles.body,
                    {
                        paddingHorizontal: 6,
                        flex: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                    }
                ]}
            >
                <MaterialCommunityIcons
                    name={CommonIcons.clockOutline}
                    size={14}
                    color={'black'}
                />
                <Text
                    style={{
                        textAlign: 'left',
                        fontWeight: "500",
                        color: 'gray',
                        fontSize: 12,
                        fontStyle: 'italic',
                        marginHorizontal: 6
                    }}
                >
                    {
                        getNotificationTime()
                    }
                </Text>


            </View>
        </View>
    )
}

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export default NotificationItem

const styles = StyleSheet.create({
    container: {

        flexDirection: 'row',


    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

    }
})
