import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Dimensions } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { BOXSHADOW } from '../../../app/constants/themes'
import CommonColor from '../../../utils/CommonColor'

const ListItem = ({
    onItemPress,
    desk
}) => {
    return (
        <TouchableOpacity
            style={[styles.container]}

            onPress={onItemPress}
        >
            <Text style={{ color: CommonColor.primary, fontSize: 18, fontWeight: '700' }}
                numberOfLines={2}
            >
                {desk?.name}
            </Text>
            {/* <Text>32</Text>
            <Text>60%</Text> */}
        </TouchableOpacity>
    )
}

export default ListItem

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'white',
        height: 80,
        marginVertical: 2,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        paddingHorizontal: 8,
        marginHorizontal: 4,
        borderRadius: 6,
        ...BOXSHADOW.normal
    }
})
