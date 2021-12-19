import React, { useEffect, useRef, useState } from 'react'
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
import ActionSheet from 'react-native-actions-sheet'
import CommunityAudioCommentScreen from './CommunityAudioComment'
import AudioModel from '../../app/models/AudioModel'
import CommentHandler from './CommentHandler'
import AppManager from '../../app/AppManager'


type Props = NativeStackScreenProps<RootStackParamList, 'CommunityPostCommentScreen'>;

const CommunityPostCommentScreen = ({ route, navigation }: Props) => {

    const [comments, setComments] = useState([])
    const [inputComment, setInputComment] = useState('')
    const [audioComment, setAudioComment] = useState<AudioModel>()
    const _refActionSheetRecordingShare = useRef<ActionSheet>()
    const { stopPlay, startPlay, isPlaying, playingTime, setRecordPath, currentComment, setCurrentComment } = CommentHandler({})


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
            if (inputComment?.trim().length <= 0) {
                return
            }
            Keyboard.dismiss()
            RNProgressHud.show()
            let response = await CommunityAPI.addPostComment(route.params.post.id, inputComment, audioComment)
            setComments(comments => {
                return [new CommentModel(response['data']), ...comments]
            })
            setAudioComment(null)
            setInputComment('')
        } catch (error) {

        } finally {
            RNProgressHud.dismiss()
        }
    }

    const _onStartPlayComment = (comment: CommentModel) => {
        setCurrentComment(comment)
        startPlay(comment)
    }


    const _onStopPlayComment = () => {
        stopPlay()
    }

    const onShowAudioCommentPress = async () => {
        // navigation.navigate('CommunityAudioCommentScreen')
        _refActionSheetRecordingShare.current.setModalVisible(true)
    }

    const _onSaveAudioComment = async () => {
        _refActionSheetRecordingShare.current?.setModalVisible(false)
    }
    useEffect(() => {
        onGetPostComments()

        return () => {
            _onStopPlayComment()
        }
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', }} >

            <FlatList

                data={comments}
                renderItem={({ item }) =>
                    <UserComment
                        comment={item}
                        onFavoritePress={() => onToggleCommentFavorite(item)}
                        onStartPlayPress={() => _onStartPlayComment(item)}
                        onStopPlayPress={_onStopPlayComment}
                        isPlaying={(isPlaying && currentComment.id == item?.id) ? true : false}
                        playingTime={currentComment?.id == item?.id && playingTime}

                    />}
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
                    onShowAudioCommentPress={onShowAudioCommentPress}
                    audio={audioComment}


                />

            }

            <ActionSheet ref={_refActionSheetRecordingShare}>
                <View style={{ height: Constants.device.height * 0.9 }}>
                    <CommunityAudioCommentScreen
                        post={route?.params?.post}
                        setAudioComment={setAudioComment}
                        onSaveRecording={_onSaveAudioComment}
                    />
                </View>
            </ActionSheet>
        </View>

    )
}

export default CommunityPostCommentScreen

const styles = StyleSheet.create({})
