import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, IconButton } from 'react-native-paper';
import CommonColor from '../../utils/CommonColor';
import CommonIcons from '../../utils/CommonIcons';
import AudioPlay from '../Card/AudioPlay';

const CommentItem = ({
    commentText,
    commentDate,
    commentType,
    commentAudio = 'audio',
    onPlay
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
            {


                <View
                    style={[
                        styles.content
                    ]}
                >
                    {
                        commentType != 'audio' ?
                            <Text style={[styles.textComment]}>
                                {commentText}
                            </Text> :
                            <IconButton 
                                icon={CommonIcons.playCircleOutline}
                                color={CommonColor.btnSubmit}
                                onPress={onPlay}
                            />
                    }
                    <Text style={[styles.textDate]}>
                        {commentDate}
                    </Text>
                </View>

            }
        </View>
    )
}

export default CommentItem

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4
    },
    content: {
        width: '80%',
        backgroundColor: 'lightblue',
        padding: 4,
        marginHorizontal: 4,
        borderRadius: 6
    },

})
