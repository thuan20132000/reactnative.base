import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BOXSHADOW } from '../../../app/constants/themes'
import CommonImages from '../../../utils/CommonImages'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../../utils/CommonIcons'
import UserModel from '../../../app/models/userModel'

const LearnerItem = ({
    onPress,
    user = new UserModel(null)
}) => {
    return (
        <TouchableOpacity
            style={[styles.container]}
            onPress={onPress}
        >
            <View
                style={{
                    width:'10%'
                }}
            >
                <Image

                    source={{
                        uri: user?.profile_pic || CommonImages.avatar
                    }}
                    source={
                        user?.profile_pic?
                        {
                            uri:user.profile_pic
                        }:
                        require('../../../app/assets/images/avatarDefault.png')
                    }

                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10
                    }}
                />

            </View>
            <View
                style={{
                    paddingHorizontal:22,
                    width:'80%'
                }}
            >
                <Text style={{ fontWeight: '700', margin: 4 }}>{user?.fullname}</Text>
                {/* <Text style={{ fontWeight: '500', margin: 4 }}>{address}</Text> */}
                <Text numberOfLines={2} style={{ width: '60%' }}>{user?.descriptions}</Text>
            </View>

            <View
                style={{
                    position: 'absolute',
                    bottom: 6,
                    right: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                {/* <Text style={{ fontWeight: '700' }}>4.5</Text> */}
                {/* <MaterialCommunityIcons name={CommonIcons.star} color={'gold'} size={22} /> */}
            </View>
        </TouchableOpacity>
    )
}

export default LearnerItem

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: 'white',
        margin: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...BOXSHADOW.normal,
        height: 80
    }
})
