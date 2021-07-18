import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ReadingCard from './components/ReadingCard'
import ReadingPostDB from '../../app/DB/ReadingPost';
import ReadingModel from '../../app/models/readingModel';
const VideoHome = (props) => {

    const [readingPost, setReadingPosts] = useState([]);

    useEffect(() => {
        ReadingPostDB.getReadingPost(success => {
            if (success && success.length > 0) {
                setReadingPosts(success)
            }
        })
    }, []);



    const _onOpenPostPractice = (post) => {
        props.navigation.navigate('VideoCall', {
            item: post
        })
    }

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
