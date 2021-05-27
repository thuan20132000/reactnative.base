import React, { useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator, RefreshControl } from 'react-native'
import { Avatar } from 'react-native-paper'
import CommonImages from '../../utils/CommonImages'
import PostCard from './components/card/PostCard'
import { useSelector } from 'react-redux'

import { getUserPosts } from '../../services/community/post';

const C_CommunityProfileScreen = (props) => {

    const { userInformation } = useSelector(state => state.authentication);
    const [userPosts, setUserPosts] = React.useState([]);
    const [isLoadingMore, setIsLoadMore] = useState(false);
    const [nextLink, setNextLink] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const _onPostDetailPress = (post) => {
        props.navigation.navigate('CommunityPostDetail', {
            post: post
        });
    }

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
            setUserPosts(prev => {
                return prev.concat(fetchRes.data)
            })
        }

        setIsLoadMore(false);

    }
    const _onRefresh = async () => {
        setIsRefreshing(true);
        getUserPosts(userInformation.access)
            .then((res) => {
                if (res.status) {
                    setUserPosts(res.data?.data);

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

    

    React.useEffect(() => {
        console.warn('ds');
        getUserPosts(userInformation.access)
            .then((res) => {
                console.warn('res: ', res);
                if (res.status) {
                    setUserPosts(res.data?.data)
                }
            })
            .catch((err) => {
                console.warn('err: ', err)
            })
            .finally(() => {

            });
    }, []);

    return (
        <View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 22
                }}
            >
                <Avatar.Image
                    source={{
                        uri: CommonImages.avatar
                    }}
                    size={102}
                />
                <Text>Profile</Text>

            </View>
            <FlatList
                data={userPosts}
                renderItem={({ item }) =>
                    <PostCard
                        onPostDetailPress={() => _onPostDetailPress(item)}
                        author={item.author?.username}
                        content={item?.content}
                        practiceNumber={item?.practice_number}
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

            {/* My Posts */}


        </View>
    )
}

export default C_CommunityProfileScreen

const styles = StyleSheet.create({})
