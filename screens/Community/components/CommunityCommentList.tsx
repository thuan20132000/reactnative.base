import React from 'react'
import { ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Constants from '../../../app/constants/Constant'
import SendingInput from '../../../components/Input/SendingInput'

import UserComment from '../../../components/Input/UserComment'

interface CommentListI {
    containerStyle?: ViewStyle
}

const CommunityCommentList = (props: CommentListI) => {
    return (
            <FlatList

                data={Constants.masterData.comments}
                renderItem={({ item }) => <UserComment />}
            />


    )
}

export default CommunityCommentList

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 22
    }
})
