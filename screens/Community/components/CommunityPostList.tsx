import React, { useEffect, useState } from 'react'
import { RefreshControl, StyleSheet, Text, View, FlatList } from 'react-native'
import CommunityPostCard from './CommunityPostCard'
import { _refRootNavigation } from '../../../app/Router/RootNavigation';
import CommunityHandler from '../CommunityHandler';
import CommunityAPI from '../../../app/API/CommunityAPI';
import CommunityPostModel from '../../../app/models/CommunityPostModel';
import RNProgressHud from 'progress-hud';

interface PostListI {
    data?: any,
    getData?: Function
}
const CommunityPostList = (props: PostListI) => {

    const { stopPlay } = CommunityHandler({})

    const [postList, setPostList] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    const _onShowRecordingScreen = (post: CommunityPostModel) => {
        stopPlay()
        _refRootNavigation.navigate('CommunityPostDetailScreen', { post_id: post.id })
    }

    const getPostList = async () => {
        try {
            RNProgressHud.show()
            let response = await CommunityAPI.getPostList()
            let postData = response['data'].map(e => new CommunityPostModel(e))
            setPostList(postData)

        } catch (error) {

        }
        finally {
            RNProgressHud.dismiss()
        }
    }

    const refreshPostList = async () => {
        try {
            setIsRefreshing(true)
            let response = await CommunityAPI.getPostList()
            let postData = response['data'].map(e => new CommunityPostModel(e))
            setPostList(postData)
        } catch (error) {

        }
        finally {
            setIsRefreshing(false)
        }
    }


    const onTogglePostFavorite = async (post: CommunityPostModel) => {
        try {
            let reponse = await CommunityAPI.togglePostFavorite(post?.id)
            // let Post = new CommunityPostModel({})
            let response = await CommunityAPI.getPostList()
            let postData = response['data'].map(e => new CommunityPostModel(e))
            setPostList(postData)
        } catch (error) {

        } finally {
        }
    }

    useEffect(() => {
        getPostList()
    }, [])
    return (
        <FlatList
            data={postList}
            renderItem={({ item, index }) =>
                <CommunityPostCard
                    post={item}
                    onPress={() => _onShowRecordingScreen(item)}
                    onToggleFavoritePress={() => onTogglePostFavorite(item)}

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

export default CommunityPostList

const styles = StyleSheet.create({})
