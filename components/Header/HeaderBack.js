import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const HeaderBack = ({
    backTitle,
    onBackPress
}) => {
    return (
        <View
            style={[styles.container]}
        >
            <TouchableOpacity
                style={[
                    styles.backButton
                ]}
                onPress={onBackPress}
            >
                <Text>{backTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HeaderBack

const styles = StyleSheet.create({
    backButton:{

    },
    container:{
        display:'flex',
        justifyContent:'center',
        height:60,
        paddingHorizontal:8
    }
})
