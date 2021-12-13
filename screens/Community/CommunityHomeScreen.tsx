import React, { useCallback, useState, useEffect } from 'react'
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Constants from '../../app/constants/Constant'
import { _refRootNavigation } from '../../app/Router/RootNavigation'
import CommunityPostList from './components/CommunityPostList'
import CommunityHandler from './CommunityHandler'
import Icon from 'react-native-vector-icons/Ionicons';
import RNProgressHud from 'progress-hud';
import CommunityPostModel from '../../app/models/CommunityPostModel'
import CommunityAPI from '../../app/API/CommunityAPI'
import CommunityPostCard from './components/CommunityPostCard'
import { StackActions } from '@react-navigation/native'



const CommunityHomeScreen = () => {

    const { stopPlay } = CommunityHandler({})
    const _onShowAddCommunityPractice = () => {
        stopPlay()
        _refRootNavigation.navigate('RecordingScreen')
    }

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
            _refRootNavigation.dispatch(
                StackActions.replace('Signin')
            )
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
        <SafeAreaView style={{ flex: 1 }}>


            <Button
                onPress={_onShowAddCommunityPractice}
                containerStyle={{
                    marginHorizontal: 12,
                    borderRadius: 12,
                    marginVertical: 12,
                    position: 'absolute',
                    zIndex: 999,
                    alignSelf: 'center',
                    bottom: 0
                }}
                titleStyle={{ fontSize: 18, fontWeight: '700' }}
                type='outline'
                icon={
                    <Icon name={Constants.ionicon.addCircle} size={36} color={Constants.COLORS.primary} />
                }
            />
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
            {/* <CommunityPostList /> */}

        </SafeAreaView>
    )
}

export default CommunityHomeScreen

const styles = StyleSheet.create({})
