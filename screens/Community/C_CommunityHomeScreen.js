import React, { useState } from 'react'
import { ActivityIndicator, FlatList, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import { FAB } from 'react-native-paper';
import { getCommunityPosts } from '../../utils/api_v1';
import PostCard from './components/card/PostCard';

import { useSelector } from 'react-redux';
const audioRecorderPlayer = new AudioRecorderPlayer();

const C_CommunityHomeScreen = (props) => {

    const { userInformation } = useSelector(state => state.authentication);
    const [posts, setPosts] = useState([]);
    const [isLoadingMore,setIsLoadMore] = useState(false);
    const [nextLink, setNextLink] = useState('');
    const _onPostDetailPress = (post) => {
        props.navigation.navigate('CommunityPostDetail',{
            post:post
        });
    }


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
            })

    }, []);



    const _onLoadMore = async () => { 
        if(!nextLink){
            return;
        }
        setIsLoadMore(true);
        const fetchData = await fetch(nextLink,{headers:{Authorization:'Bearer '+userInformation.access}});
        if(!fetchData.ok){
            setIsLoadMore(false);
            return;
        }
        const fetchRes = await fetchData.json();
        if(fetchRes.status){
            setNextLink(fetchRes.next);
            setPosts(prev => {
                return prev.concat(fetchRes.data)
            })
        }

        setIsLoadMore(false);

    }


    return (
        <>
            <FlatList
                data={posts}
                renderItem={({ item }) =>
                    <PostCard
                        onPostDetailPress={()=>_onPostDetailPress(item)}
                        author={item.author?.username}
                        content={item.content}
                        practiceNumber={item?.practice_number}
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
                onPress={() => console.log('Pressed')}
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
