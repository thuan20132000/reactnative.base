import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CommonColor from '../../../utils/CommonColor'

const CardWordItem = ({
    name,
    onItemPress,
    isActive = false
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                isActive && {
                    backgroundColor:'coral'
                }
            ]}
            onPress={onItemPress}


        >
            <Text
                style={[
                    styles.textStyle
                ]}
            >
                {name}
            </Text>
            
        </TouchableOpacity>
    )
}

export default CardWordItem

const styles = StyleSheet.create({
    container:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        backgroundColor: 'white',
        marginHorizontal: 6,
        marginVertical:4,
        borderRadius: 6,
        paddingVertical:16,
        paddingHorizontal:8,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    textStyle:{
        fontWeight:'700',
        fontSize:18,
        color:CommonColor.primary
    }
})
