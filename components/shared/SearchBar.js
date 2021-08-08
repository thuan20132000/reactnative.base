import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BOXSHADOW } from '../../app/constants/themes'
// import Constant, { THEME } from '../../controller/Constant'
const SearchBar = ({
    onSearchPress,
    label
}) => {
    return (
        <TouchableOpacity
            style={[styles.container]}
            onPress={onSearchPress}
        >
            <View
                style={{paddingHorizontal:12}}
            >
                <Text style={{  }}>{label}</Text>
            </View>
            <TouchableOpacity
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Text>Đà Nẵng</Text>
                {/* <MaterialCommunityIcons
                    name={THEME.ICONS.chevronDown}
                    size={THEME.STYLES.iconNormal}
                /> */}
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderWidth: 0.5,
        // borderColor: Constant.color.gray,
        margin: 6,
        padding: 4,
        borderRadius: 4,
        backgroundColor:'white',

    }
})
