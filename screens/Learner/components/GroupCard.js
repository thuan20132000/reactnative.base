import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BOXSHADOW, COLORS, SIZES } from '../../../app/constants/themes'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../../utils/CommonIcons'

const GroupCard = ({ onPress, authorName, authorImage, conversationName, groupName }) => {
    return (
        <TouchableOpacity
            style={[styles.container]}
            activeOpacity={0.5}
            onPress={onPress}
        >
            <View>
                <Text style={{ color: 'white', fontWeight: '600' }}>{groupName}</Text>
                <Text style={{ color: 'white', fontWeight: '300' }}>{conversationName}</Text>

            </View>

            <MaterialCommunityIcons
                name={CommonIcons.arrowRightChevron}
                size={34}
                color={'white'}
            />
        </TouchableOpacity>
    )
}

export default GroupCard

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'deepskyblue',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 4,
        height: 60,
        padding: 8,
        borderRadius: 6,
        marginHorizontal: 22,
        width: SIZES.width - 20,
        ...BOXSHADOW.normal
    }
})
