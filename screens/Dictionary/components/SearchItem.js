import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CommonColor from '../../../utils/CommonColor'

const SearchItem = ({
    title,
}) => {

    return (
        <View
            style={[styles.container]}
        >
            <Text
                style={[styles.itemText]}
            >
                {title}
            </Text>
        </View>
    )
}

export default SearchItem

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:CommonColor.btnSubmit,
        marginVertical:1,
        paddingVertical:8,
        paddingHorizontal:6
    },
    itemText:{
        fontWeight:'600',
        color:'white',
        fontSize:18,
    }
})
