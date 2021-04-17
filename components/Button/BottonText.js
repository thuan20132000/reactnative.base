import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CommonColor from '../../utils/CommonColor'

const ButtonText = ({
    label,
    labelStyle,
    onItemPress
}) => {
    return (
       <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor:CommonColor.btnSubmit
                },
            ]}
            onPress={onItemPress}
       >
           <Text
            style={[
                styles.text
            ]}
           >
               {label}
            </Text>
       </TouchableOpacity>
    )
}

export default ButtonText

const styles = StyleSheet.create({
    container:{
        borderRadius:6,
        width:120,
        marginVertical:4
    },
    text:{
        color:'white',
        fontWeight:'700',
        textAlign:'center',
        fontSize:22
    }
})
