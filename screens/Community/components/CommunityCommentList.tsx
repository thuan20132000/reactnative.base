import React from 'react'
import { ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { ScrollableComponent } from 'react-native-keyboard-aware-scroll-view'
import Constants from '../../../app/constants/Constant'
import CommonTextInput from '../../../components/Input/CommonTextInput'
import SendingInput from '../../../components/Input/SendingInput'
import UserComment from '../../../components/Input/UserComment'

interface CommentListI {
    containerStyle?: ViewStyle
}

const CommunityCommentList = (props: CommentListI) => {
    return (
        <View style={[styles.container, props.containerStyle]}>
            <ScrollView style={{ flex: 1, paddingHorizontal: 12 }}>
                {
                    Constants.masterData.comments.map((item, index) =>
                        <UserComment />
                    )
                }

            </ScrollView>
            <SendingInput containerStyle={{ paddingBottom: 30 }} multiline placeholder='Add a comment to post...' />
        </View>
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
