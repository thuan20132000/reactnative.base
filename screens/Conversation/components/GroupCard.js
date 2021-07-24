import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BOXSHADOW, COLORS, SIZES } from '../../../app/constants/themes'

const GroupCard = ({ onPress,authorName, authorImage, conversationName, groupName }) => {
    return (
        <TouchableOpacity
            style={[styles.container]}
            activeOpacity={0.5}
            onPress={onPress}
        >
            <Text style={{ color: 'white', fontWeight: '600' }}>{conversationName}</Text>
            <View>
                <Text style={{ color: 'white', fontWeight: '600' }}>{groupName}</Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >

                <Image
                    source={{
                        uri: authorImage
                    }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20
                    }}
                />
                <Text style={{ color: 'white', fontWeight: '600' }}>{authorName}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default GroupCard

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: COLORS.secondary,
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
