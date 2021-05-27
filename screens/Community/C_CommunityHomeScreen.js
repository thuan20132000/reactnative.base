import React, { useState } from 'react'
import { ActivityIndicator, FlatList, PermissionsAndroid, Platform, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import { FAB, IconButton } from 'react-native-paper';
import { getCommunityPosts, handleFavorite } from '../../utils/api_v1';
import PostCard from './components/card/PostCard';
import Video from 'react-native-video';

import { useSelector } from 'react-redux';
import CommonColor from '../../utils/CommonColor';
import CommonIcons from '../../utils/CommonIcons';
const audioRecorderPlayer = new AudioRecorderPlayer();

const C_CommunityHomeScreen = (props) => {

    const { userInformation } = useSelector(state => state.authentication);
    const [posts, setPosts] = useState([]);
    const [isLoadingMore, setIsLoadMore] = useState(false);
    const [nextLink, setNextLink] = useState('');
    const _onPostDetailPress = (post) => {
        props.navigation.navigate('CommunityPostDetail', {
            post: post
        });
    }
    const [isRefreshing, setIsRefreshing] = useState(false);


    React.useEffect(() => {
        getCommunityPosts(userInformation.access)
            .then((res) => {
                if (res.status) {
                    setPosts(res.data?.data);

                    if (res.data?.next) {
                        setNextLink(res.data?.next);
                    }
                }
            })
            .catch((error) => {
                console.warn('error: ', error)
            });


        props.navigation.setOptions({
            headerRight: () => (
                <IconButton
                    icon={CommonIcons.account}
                    color={CommonColor.primary}
                    size={26}
                    onPress={()=>props.navigation.navigate('CommunityProfile')}
                />
            )
        })

    }, []);



    const _onLoadMore = async () => {
        if (!nextLink) {
            return;
        }
        setIsLoadMore(true);
        const fetchData = await fetch(nextLink, { headers: { Authorization: 'Bearer ' + userInformation.access } });
        if (!fetchData.ok) {
            setIsLoadMore(false);
            return;
        }
        const fetchRes = await fetchData.json();
        if (fetchRes.status) {
            setNextLink(fetchRes.next);
            setPosts(prev => {
                return prev.concat(fetchRes.data)
            })
        }

        setIsLoadMore(false);

    }

    const _onHandleFavoritePress = async (item) => {
        handleFavorite(item.id, userInformation?.user?.id, userInformation.access)
            .then((res) => {
                let is_favorited = res.data?.post_favorite;
                let newPosts = posts.map((e) => {
                    if (e.id === item.id) {
                        e.is_favorited_by_user = is_favorited;
                        if (is_favorited) {
                            e.post_favorite_number = e.post_favorite_number + 1;
                        } else {
                            e.post_favorite_number = e.post_favorite_number - 1;

                        }
                    }
                    return e
                });
                setPosts(newPosts);
            })
            .catch((error) => {
                console.warn('error: ', error);
            })
    }


    const _onRefresh = async () => {
        setIsRefreshing(true);
        getCommunityPosts(userInformation.access)
            .then((res) => {
                if (res.status) {
                    setPosts(res.data?.data);

                    if (res.data?.next) {
                        setNextLink(res.data?.next);
                    }
                }
            })
            .catch((error) => {
                console.warn('error: ', error)
            })
            .finally(() => setIsRefreshing(false));
    }



    const _onOpenUpload = () => {
        props.navigation.navigate('CommunityVideoRecord');
    }


    return (
        <>
            <FlatList
                data={posts}
                renderItem={({ item }) =>
                    <PostCard
                        onPostDetailPress={() => _onPostDetailPress(item)}
                        author={item.author?.username}
                        content={item?.content}
                        practiceNumber={item?.practice_number}
                        onLikePress={() => _onHandleFavoritePress(item)}
                        favoriteNumber={item?.post_favorite_number}
                        favorite_active={item?.is_favorited_by_user}
                        image_url={item?.image_url}
                        commentNumner={item?.post_comments_number}
                    />
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={_onRefresh}
                    />
                }

                onEndReachedThreshold={0.5}
                onEndReached={_onLoadMore}
                ListFooterComponent={

                    <ActivityIndicator
                        animating={isLoadingMore}
                        size={'large'}
                        color={'coral'}
                    />
                }
            />

            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={_onOpenUpload}
            />
        </>
    )
}

export default C_CommunityHomeScreen

const styles = StyleSheet.create({
    buttonPlay: {
        display: 'flex',
        backgroundColor: 'coral',
        padding: 6,
        margin: 6
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 14,
    },

})
