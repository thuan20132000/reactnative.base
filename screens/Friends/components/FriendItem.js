import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BOXSHADOW } from '../../../app/constants/themes'
import CommonImages from '../../../utils/CommonImages'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../../utils/CommonIcons'
import CommonColor from '../../../utils/CommonColor'
import UserModel from '../../../app/models/userModel'

const FriendItem = ({
    onPress,
    name,
    address,
    description,
    star,
    imagePath,
    onInvitePress,
    canInvite,
    user = new UserModel(null)
}) => {
    return (
        <TouchableOpacity
            style={[styles.container]}
            onPress={onPress}
        >
            <View
                style={{
                    width: '10%'
                }}
            >
                <Image
                    source={{
                        uri: imagePath || CommonImages.avatar
                    }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10
                    }}
                />

            </View>
            <View
                style={{
                    paddingHorizontal: 22,
                    width: '50%'
                }}
            >
                <Text style={{ fontWeight: '700', margin: 4 }}>{name}</Text>
                {/* <Text style={{ fontWeight: '500', margin: 4 }}>{address}</Text> */}
                <Text numberOfLines={2} style={{ width: '60%' }}>{description}</Text>
            </View>
            {
                canInvite &&
                <TouchableOpacity
                    style={{
                        right: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 120,
                        padding: 6,
                        backgroundColor: CommonColor.btnSubmit,
                        marginHorizontal: 12,
                        borderRadius: 6
                    }}
                    onPress={onInvitePress}
                >
                    <Text style={{ fontWeight: '700', textAlign: 'center', color: 'white' }}>Invite</Text>
                </TouchableOpacity>

            }
        </TouchableOpacity>
    )
}

export default FriendItem

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
