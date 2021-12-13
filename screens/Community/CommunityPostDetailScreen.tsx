import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, ScrollView, Image, ImageBackground, SafeAreaView, Keyboard, KeyboardEvent } from 'react-native'

import { Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';
import Constants from '../../app/constants/Constant';
import { LinearProgress } from 'react-native-elements';

import ActionSheet from "react-native-actions-sheet";
import CommunityCommentList from './components/CommunityCommentList';

import CommunityPostModel from '../../app/models/CommunityPostModel';
import RNProgressHud from 'progress-hud';
import CommunityAPI from '../../app/API/CommunityAPI';
import { _refRootNavigation } from '../../app/Router/RootNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/Router/RootStackScreenList';
import CommunityHandler from './CommunityHandler';

type Props = NativeStackScreenProps<RootStackParamList, 'CommunityPostDetailScreen'>;

const CommunityPostDetailScreen = ({ route, navigation }: Props) => {
    const _refActionSheetCommentList = useRef<ActionSheet>()
    const [imagePath, setImagepath] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [post, setPost] = useState<CommunityPostModel>()
    const { stopPlay, startPlay, isPlaying, setRecordPath, playingTime } = CommunityHandler({ record: post?.record })

    const [isCommentFocussing, setIsCommentFocussing] = useState(false)

    const getPostDetail = async () => {
        try {
            RNProgressHud.show()
            let response = await CommunityAPI.getPostDetail(route.params.post_id)
            let post = new CommunityPostModel(response['data'])
            setPost(post)
            setRecordPath(post.record)

        } catch (error) {

        }
        finally {
            RNProgressHud.dismiss()
        }
    }

    const onTogglePostFavorite = async () => {
        try {
            let reponse = await CommunityAPI.togglePostFavorite(post?.id)
            // let Post = new CommunityPostModel({})
            let response = await CommunityAPI.getPostDetail(route.params.post_id)
            let newPost = new CommunityPostModel(response['data'])
            console.log(newPost)
            setPost(newPost)
            setRecordPath(newPost.record)
        } catch (error) {

        } finally {
        }
    }



    useEffect(() => {
        getPostDetail()
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setIsCommentFocussing(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setIsCommentFocussing(false);
        });



        return () => {
            showSubscription.remove();
            hideSubscription.remove();
            stopPlay()
        };
    }, [])

    const onStartPlayRecord = () => {
        startPlay()
    }
    return (

        <ScrollView style={{ flex: 1 }}>

            <View style={{ alignItems: 'center' }}>
                <ImageBackground
                    source={{ uri: post?.image ? post?.image : 'https://upload.wikimedia.org/wikipedia/commons/7/75/Southern_Life_in_Southern_Literature_text_page_322.jpg' }}
                    style={{
                        width: Constants.device.width * 0.9,
                        height: Constants.device.height * 0.7,

                    }}
                    resizeMode={'contain'}
                />

            </View>

            <View style={{ alignItems: 'center' }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: Constants.device.width - 100,
                }}>
                    <Button
                        type='clear'
                        icon={
                            <Icon name={isPlaying ? Constants.ionicon.audioPause : Constants.ionicon.audioPlay} size={28} />
                        }
                        disabled={isRecording}
                        onPress={onStartPlayRecord}
                    />
                    <LinearProgress color="primary" style={{ marginHorizontal: 8 }} />
                    <Text>{playingTime}</Text>

                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Button
                    type='clear'
                    icon={
                        <Icon name={post?.is_user_favorite ? Constants.ionicon.likeThumb : Constants.ionicon.dislikeThumb} size={18} color={Constants.COLORS.primary} />
                    }
                    title={post?.favorite_numbers?.toString()}
                    onPress={onTogglePostFavorite}
                />
                {/* <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.dislikeThumb} size={18} color={Constants.COLORS.primary} />
                    }
                    title={'6'}
                /> */}
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.comment} size={18} color={Constants.COLORS.primary} />
                    }
                    title={post?.comment_numbers?.toString()}
                    onPress={() => _refActionSheetCommentList.current?.setModalVisible()}
                />
            </View>

            <ActionSheet ref={_refActionSheetCommentList} >
                <View
                    style={{
                        height: Constants.device.height * (isCommentFocussing ? 0.6 : 0.8),
                        justifyContent: 'space-between',
                        paddingTop: 4
                    }}
                >
                    {/* <Button
                        // type='clear'
                        icon={
                            <Icon name={Constants.ionicon.down} size={22} color={Constants.COLORS.primary} />
                        }
                        onPress={() => _refActionSheetCommentList.current?.setModalVisible(false)}
                    /> */}
                    <CommunityCommentList post={post} isComment />


                </View>

            </ActionSheet>

        </ScrollView>
    )
}

export default CommunityPostDetailScreen

const styles = StyleSheet.create({})
