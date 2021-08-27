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
    rightIcon,
    width,
    icon
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: disabled ? 'gray' : CommonColor.btnSubmit,
                    flexDirection: 'row',
                    width,
                    padding: 8

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
                icon &&
                <MaterialCommunityIcons
                    name={icon}
                    size={24}
                    color={'white'}
                />
            }
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
        minWidth: 60,
        minHeight: 30,
        marginVertical: 4,
        marginHorizontal: 4,

        padding: 6,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 12
    }
})
