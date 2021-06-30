import React, { useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View, ActivityIndicator, RefreshControl } from 'react-native'
import { Avatar, Badge, IconButton } from 'react-native-paper'
import CommonImages from '../../utils/CommonImages'
import PostCard from './components/card/PostCard'
import { useSelector, useDispatch } from 'react-redux'

import { deletePost, getUserPosts } from '../../services/community/post';
import CommonIcons from '../../utils/CommonIcons'
import CommonColor from '../../utils/CommonColor'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { updateAvatar } from '../../services/community/updateAvatar';
import { updateUserProfile } from '../../store/actions/authenticationActions'
import { local_absolute } from '../../config/api_config.json';

async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
}


const C_CommunityProfileScreen = (props) => {
    const dispatch = useDispatch();
    const { userInformation } = useSelector(state => state.authentication);
    const [userPosts, setUserPosts] = React.useState([]);
    const [isLoadingMore, setIsLoadMore] = useState(false);
    const [nextLink, setNextLink] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [userProfile, setUserProfile] = React.useState(null);

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


    const _onOpenPhotoLibrary = async () => {
        launchImageLibrary({
            'mediaType': 'photo',
            'selectionLimit': 1
        }, (res) => {


            if (res.errorCode) {
                console.warn('error: ', res.errorMessage)
            }

            if (res.assets) {
                // console.warn('res: ',res.assets);
                setUserProfile({
                    ...userProfile,
                    avatar: res.assets[0]
                });
                _onUpdateProfile(res.assets[0]);

            }

        })

    }


    const _onUpdateProfile = async (avatar) => {
        updateAvatar(avatar.uri, avatar.type, 'test', userInformation.access)
            .then((res) => {
                // console.warn('res: ',res);

                if (res.status_code === 201) {
                    dispatch(updateUserProfile(res.data));
                }
            })
            .catch((err) => {
                console.warn('err" ', err);
            })
    }


    const _onDeletePost = async (post_id) => {

        deletePost(post_id, userInformation.access)
            .then((res) => {
                if (res.status_code === 204) {
                    getUserPosts(userInformation.access)
                        .then((res) => {
                            if (res.status) {
                                setUserPosts(res.data?.data)
                            }
                        })
                        .catch((err) => {
                            console.warn('err: ', err)
                        })
                        .finally(() => {

                        });
                }
            })
            .catch((err) => {
                console.warn('err: ', err);
            });

    }

    React.useEffect(() => {
        getUserPosts(userInformation.access)
            .then((res) => {
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

    React.useEffect(() => {
        console.warn(userInformation);
    }, [userInformation]);

    return (
        <View
            style={{
                backgroundColor: 'white',
                zIndex: -1,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomRightRadius: 12,
                    borderBottomLeftRadius: 12,
                    backgroundColor: 'lightcoral',
                    paddingVertical: 6,
                }}
            >
                <View

                >
                    <Avatar.Image
                        source={{
                            uri: userInformation?.user?.profile_image ? `${local_absolute}${userInformation?.user.profile_image}` : CommonImages.avatar
                        }}
                        size={102}

                    />
                    <IconButton
                        icon={CommonIcons.cameraplus}
                        color={'white'}
                        style={{
                            bottom: -10,
                            right: -10,
                            position: 'absolute'
                        }}
                        onPress={_onOpenPhotoLibrary}
                    />

                </View>
                <Text style={{ fontSize: 22, fontWeight: '700', color: 'white' }}>{userInformation?.user?.username}</Text>

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
                        onEditPress={() => _onDeletePost(item.id)}
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
