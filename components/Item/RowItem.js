import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../utils/CommonIcons'
const RowItem = ({

}) => {
    return (
        <View>
            <MaterialCommunityIcon
                name={CommonIcons.account}
                size={22}
                color={'coral'}
            />

            <Text>
                svdsvds cdsds
            </Text>
        </View>
    )
}

export default RowItem

const styles = StyleSheet.create({})
