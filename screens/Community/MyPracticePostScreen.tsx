import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { RefreshControl, StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import CommunityAPI from '../../app/API/CommunityAPI';
import CommunityPostModel from '../../app/models/CommunityPostModel';
import { RootStackParamList } from '../../app/Router/RootStackScreenList';
import RNProgressHud from 'progress-hud';
import CommunityPostCard from './components/CommunityPostCard';
import CommunityHandler from './CommunityHandler';
import { _refRootNavigation } from '../../app/Router/RootNavigation';



type Props = NativeStackScreenProps<RootStackParamList, 'MyPracticePostScreen'>;

const MyPracticePostScreen = ({ route, navigation }: Props) => {
    const { stopPlay, startPlay, isPlaying, playingTime, setRecordPath, currentPost, setCurrentPost } = CommunityHandler({})
    const [isRefreshing, setIsRefreshing] = useState(false)

    const [userPosts, setUserPosts] = useState<CommunityPostModel[]>()

    const _onShowRecordingScreen = (post: CommunityPostModel) => {
        stopPlay()
        _refRootNavigation.navigate('CommunityPostDetailScreen', { post_id: post.id })
    }
    const _onShowPostComments = (post: CommunityPostModel) => {
        _refRootNavigation.navigate('CommunityPostCommentScreen', { post: post })
    }

    const _onStartPlayPost = (post: CommunityPostModel) => {
        setCurrentPost(post)
        startPlay(post)
    }

    const _onRemoveUserPost = async (post: CommunityPostModel) => {
        try {
            setIsRefreshing(true)
            let response = await CommunityAPI.deleteUserPost(post.id)
            refreshPostList()
        } catch (error) {

        }
        finally {
            setIsRefreshing(false)
        }
    }

    const _onConfirmDeleteUserPost = (post: CommunityPostModel) => {
        Alert.alert(
            "",
            "Do you want to delete this post",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => _onRemoveUserPost(post) }
            ]
        );

    }

    const _onStopPlayPost = () => {
        stopPlay()
    }
    const refreshPostList = async () => {
        try {
            _onStopPlayPost()
            setIsRefreshing(true)
            let response = await CommunityAPI.getUserPostList()
            setUserPosts(response['data'])
        } catch (error) {

        }
        finally {
            setIsRefreshing(false)
        }
    }

    useEffect(() => {
        RNProgressHud.show()
        CommunityAPI.getUserPostList()
            .then(res => {
                console.log('rr: ', res)
                setUserPosts(res['data'])
            })
            .catch(err => console.log('err: ', err))
            .finally(() => RNProgressHud.dismiss())
    }, [])

    return (

        <FlatList
            data={userPosts}
            renderItem={({ item, index }) =>
                <CommunityPostCard
                    post={item}
                    onPress={() => _onShowRecordingScreen(item)}
                    onStartPlayPress={() => _onStartPlayPost(item)}
                    onStopPlayPress={_onStopPlayPost}
                    isPlaying={(isPlaying && currentPost.id == item?.id) ? true : false}
                    playingTime={currentPost?.id == item?.id && playingTime}
                    onShowCommentPress={() => _onShowPostComments(item)}
                    onRemovePress={() => _onConfirmDeleteUserPost(item)}


                />
            }
            keyExtractor={(item) => item?.id?.toString()}
            // refreshing={true}
            // onRefresh={() => refreshPostList()}
            refreshControl={
                <RefreshControl
                    enabled={true}
                    refreshing={isRefreshing}
                    onRefresh={refreshPostList}
                />
            }
        />
    )
}

export default MyPracticePostScreen

const styles = StyleSheet.create({})
