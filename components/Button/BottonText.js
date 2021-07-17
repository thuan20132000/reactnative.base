import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CommonColor from '../../utils/CommonColor'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../utils/CommonIcons'

const ButtonText = ({
    label,
    labelStyle,
    onItemPress,
    disabled = false,
    containerStyle,
    rightIcon
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: disabled ? 'gray' : CommonColor.btnSubmit,
                    flexDirection:'row'
                },
                containerStyle

            ]}
            onPress={onItemPress}
            disabled={disabled}
        >
            <Text
                style={[
                    styles.text,
                    labelStyle,
                ]}
            >
                {label}
            </Text>
            {
                rightIcon &&
                <MaterialCommunityIcons
                    name={CommonIcons.arrowRightChevron}
                    size={24}
                    color={'white'}
                />
            }
        </TouchableOpacity>
    )
}

export default ButtonText

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        minWidth: 120,
        minHeight: 30,
        marginVertical: 4,
        marginHorizontal: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        padding: 6,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14
    }
})
