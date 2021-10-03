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
    icon,
    iconSize = 24,
    descriptions
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: disabled ? 'gray' : CommonColor.btnSubmit,
                    flexDirection: 'row',
                    width,
                    padding: 8,
                    height: 40

                },
                containerStyle

            ]}
            onPress={onItemPress}
            disabled={disabled}
        >
            <View>
                <Text
                    style={[
                        styles.text,
                        labelStyle,

                    ]}
                >
                    {label}
                </Text>
                {
                    descriptions &&
                    <Text style={{ color: CommonColor.border }}>{descriptions}</Text>

                }

            </View>
            {
                icon &&
                <MaterialCommunityIcons
                    name={icon}
                    size={iconSize}
                    color={'white'}
                />
            }
            {
                rightIcon &&
                <MaterialCommunityIcons
                    name={CommonIcons.arrowRightChevron}
                    size={iconSize}
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
        fontSize: 10
    }
})
