import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BOXSHADOW } from '../../app/constants/themes'
import CommonIcons from '../../utils/CommonIcons'

const ItemSetting = ({
    label,
    onPress,
    iconName
}) => {
    return (
        <TouchableOpacity
            style={[styles.container]}
            onPress={onPress}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <MaterialCommunityIcons
                    name={iconName}
                    size={22}
                    color={'gray'}
                    style={{
                        marginRight: 12
                    }}
                />
                <Text style={{ fontSize: 18, color: 'gray' }}>{label}</Text>
            </View>
            <MaterialCommunityIcons
                name={CommonIcons.arrowRightChevron}
                size={32}
                color={'gray'}
            />
        </TouchableOpacity>
    )
}

export default ItemSetting

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
