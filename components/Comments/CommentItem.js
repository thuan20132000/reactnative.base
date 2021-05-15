import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper';

const CommentItem = ({
    commentText,
    commentDate
}) => {
    return (
        <View
        style={[
            styles.container
        ]}
    >
        <Avatar.Image
            size={50}
            source={
                require('../../utils/photos/avatar1.jpeg')
            }
            style={[
                styles.avatar
            ]}
        />
        <View
            style={[
                styles.content
            ]}
        >
            <Text style={[styles.textComment]}>
                {commentText}
            </Text>
            <Text style={[styles.textDate]}>
                {commentDate}
            </Text>
        </View>
    </View>
    )
}

export default CommentItem

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        margin:4
    },
    content:{
        width:'80%',
        backgroundColor:'lightblue',
        padding:4,
        marginHorizontal:4,
        borderRadius:6
    },
   
})
