import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import CommonIcons from '../../utils/CommonIcons'

const ControlButton = ({
    iconName,
    label,
    onItemPress
}) => {
    return (
        <View
            style={[
                styles.row,
                {
                    alignItems: 'center'
                }
            ]}
        >
            {
                iconName &&
                <IconButton
                    icon={iconName}
                    color={'coral'}
                    size={24}
                    style={{ marginHorizontal: 6 }}
                    onPress={onItemPress}

                />

            }
            <Text style={{ fontWeight: '700' }}>{label}</Text>
        </View>
    )
}

export default ControlButton

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',

    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    }
})
