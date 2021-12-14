import React, { useEffect, useState } from 'react'
import { Keyboard, ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import CommunityAPI from '../../app/API/CommunityAPI'
import Constants from '../../app/constants/Constant'
import CommentModel from '../../app/models/CommentModel'
import SendingInput from '../../components/Input/SendingInput'
import RNProgressHud from 'progress-hud';
import UserComment from '../../components/Input/UserComment'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../app/Router/RootStackScreenList'
import { SafeAreaView } from 'react-native-safe-area-context'


type Props = NativeStackScreenProps<RootStackParamList, 'CommunityPostCommentScreen'>;

const CommunityPostCommentScreen = ({ route, navigation }: Props) => {

    const [comments, setComments] = useState([])
    const [inputComment, setInputComment] = useState('')


    const onGetPostComments = async () => {
        try {
            let response = await CommunityAPI.getPostComments(route.params.post?.id)
            let commentsList = response['data'].map(e => new CommentModel(e))
            setComments(commentsList)
        } catch (error) {
            // console.warn(error)
        }
    }

    const onToggleCommentFavorite = async (comment: CommentModel) => {
        try {
            let response = await CommunityAPI.togglePostCommentFavorite(route.params.post?.id, comment.id)
            let newComments = comments.map(e => {
                if (e.id === comment.id) {
                    if (response?.status_code == 1) {
                        e.favorite_numbers = e.favorite_numbers + 1
                    } else {
                        e.favorite_numbers = e.favorite_numbers - 1

                    }
                }
                return new CommentModel(e)
            })
            setComments(newComments)
        } catch (error) {
            // console.log(error)
        }
    }

    const onSendCommentPress = async () => {
        try {
            Keyboard.dismiss()
            RNProgressHud.show()
            let response = await CommunityAPI.addPostComment(route.params.post.id, inputComment)
            setComments(comments => {
                return [...comments, new CommentModel(response['data'])]
            })
            setInputComment('')
        } catch (error) {

        } finally {
            RNProgressHud.dismiss()
        }
    }

    useEffect(() => {
        onGetPostComments()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', }} >

            <FlatList

                data={comments}
                renderItem={({ item }) => <UserComment comment={item} onFavoritePress={() => onToggleCommentFavorite(item)} />}
            />
            {
                <SendingInput
                    multiline
                    placeholder='Add a comment to post...'
                    style={{

                    }}
                    containerStyle={{
                        borderTopWidth: 1,
                        borderTopColor: Constants.COLORS.primary,
                        paddingVertical: 4,
                    }}
                    value={inputComment}
                    onChangeText={(text) => setInputComment(text)}
                    onSendPress={onSendCommentPress}
                />

            }
        </View>

    )
}

export default CommunityPostCommentScreen

const styles = StyleSheet.create({})
