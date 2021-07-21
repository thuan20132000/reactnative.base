import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ReadingCard from './components/ReadingCard'
import ReadingPostDB from '../../app/DB/ReadingPost';
import ReadingModel from '../../app/models/readingModel';
import AppManager from '../../app/AppManager';
import ButtonText from '../../components/Button/BottonText';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authenticationActions';
import ConversationAPI from '../../app/API/ConversationAPI';
import RNProgressHud from 'progress-hud';


const VideoHome = (props) => {

    const [readingPost, setReadingPosts] = useState([]);

    useEffect(() => {
        // ReadingPostDB.getReadingPost(success => {
        //     if (success && success.length > 0) {
        //         setReadingPosts(success)
        //     }
        // })
        RNProgressHud.show()
        ConversationAPI.getAllConversationPost()
        .then(res => {
            console.warn('res :',res)
            if(res.status_code == 200){
                setReadingPosts(res.data)
            }
        })
        .catch((err) => {
            console.warn('err" ',err)
        })
        .finally(() => RNProgressHud.dismiss())

    }, []);


    useEffect(() => {
        console.warn('dfd')
    }, [AppManager.shared.user?.name])


    const _onOpenPostPractice = (post) => {
        props.navigation.navigate('VideoCall', {
            item: post
        })
    }
    const dispatch = useDispatch();

    return (
        <View>
        
            <FlatList

                data={readingPost}
                renderItem={({ item }) => {
                    return (
                        <ReadingCard
                            title={item.title}
                            image_path={item.image}
                            onPracticePress={() => _onOpenPostPractice(item)}
                        />

                    )
                }}
                keyExtractor={(item) => item?.id}

            />

        </View>
    )
}

export default VideoHome

const styles = StyleSheet.create({})
