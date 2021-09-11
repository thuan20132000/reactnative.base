import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BOXSHADOW, COLORS, SIZES } from '../../../app/constants/themes'
import ConversationGroupModel from '../../../app/models/conversationGroupModel'
import CommonColor from '../../../utils/CommonColor'

const GroupCard = ({
    onPress,
    authorName,
    authorImage,
    conversationName,
    groupName,
    group = new ConversationGroupModel(null)
}) => {

    const getAvatar = () => {
        console.log(group?.author?.profile_pic)
        if (group?.author?.profile_pic && group?.author?.profile_pic != 'undefined' && group?.author?.profile_pic != null) {
            return {
                uri: group?.author?.profile_pic
            }
        } else {
            return require('../../../app/assets/images/avatarDefault.png')
        }
    }

    return (
        <TouchableOpacity
            style={[styles.container]}
            activeOpacity={0.5}
            onPress={onPress}
        >
            <View
                style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image

                    source={getAvatar()}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40
                    }}
                />
            </View>
            <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ fontWeight: '600' }}>{group?.name}</Text>


                    <Text style={{ fontWeight: '400' }}>--{group?.author?.fullname}--</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default GroupCard

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: CommonColor.secondary,
        alignSelf: 'center',
        margin: 4,
        height: 120,
        padding: 8,
        borderRadius: 6,
        marginHorizontal: 22,
        width: SIZES.width - 20,
        ...BOXSHADOW.normal
    }
})
