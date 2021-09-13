import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import CommonColor from '../../../utils/CommonColor'

const ListItem = ({
    onPracticePress
}) => {
    return (
        <TouchableOpacity
            style={[styles.container]}

            onPress={onPracticePress}
        >
            <Text style={{ fontSize: 18 }}>Body and Life Style</Text>
            <Text>32</Text>
            <Text>60%</Text>
        </TouchableOpacity>
    )
}

export default ListItem

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: CommonColor.secondary,
        height: 80,
        marginVertical: 2,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        padding: 4
    }
})
