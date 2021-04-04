import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CommonColor from '../../../utils/CommonColor'

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from '../../../utils/CommonIcons';

const RowItem = ({
    label,
    leftIconName = CommonIcons.account, 
    leftIconStyle, 
    leftIconSize = 18,
    containerStyle,
    labelStyle,
    rightIcon,
    rightIconSize,
    rightIconColor,
    onItemPress,
    children,
    rowPressDisable=false

}) => {
    return (
        <TouchableOpacity
            style={[styles.container, containerStyle]}
            onPress={onItemPress}
            disabled={rowPressDisable}
        >
            <View
                style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }]}
            >
                {
                    <MaterialCommunityIcon
                        color={CommonColor.primary}
                        size={leftIconSize}
                        name={leftIconName}
                        style={leftIconStyle}
                    />

                }
                <Text
                    style={[styles.itemText, labelStyle,
                        {
                            color:'black',
                            fontWeight:'700'
                        }
                    ]}
                >
                    {label}
                </Text>

            </View>

            {
                rightIcon &&
                <MaterialCommunityIcon
                    color={'coral'}
                    name={rightIcon}
                    size={rightIconSize}
                    style={{
                        alignSelf: 'flex-end',
                        justifyContent: 'flex-end'
                    }}
                />
            }
            {children}
        </TouchableOpacity>
    )
}

export default RowItem

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 1,
        paddingVertical: 8,
        paddingHorizontal: 6,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal:4,
        borderRadius:4

    },
    itemText: {
        fontWeight: '600',
        fontSize: 18,
        marginHorizontal: 6,
    }
})
