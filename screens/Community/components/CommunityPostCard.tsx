import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { Button, LinearProgress } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import Constants from '../../../app/constants/Constant'
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actions-sheet'

import CommunityHandler from '../CommunityHandler'
import CommunityPostModel from '../../../app/models/CommunityPostModel'

interface PostCardItemI {
    onPress?: TouchableOpacityProps['onPress'],
    onStartPlayPress?: TouchableOpacityProps['onPress'],
    onStopPlayPress?: TouchableOpacityProps['onPress'],
    onToggleFavoritePress?: TouchableOpacityProps['onPress'],
    onShowCommentPress?: TouchableOpacityProps['onPress'],
    isPlaying?: boolean,
    playingTime?: string,
    post: CommunityPostModel,
    onRemovePress?: TouchableOpacityProps['onPress']
}

const CommunityPostCard = (props: PostCardItemI) => {
    const _refActionSheetCommentList = useRef<ActionSheet>()
    // const [post, setPost] = useState<CommunityPostModel>(props.post)
    const post = props.post
    // const { startPlay, stopPlay, playingTime, setRecordPath, isPlaying } = CommunityHandler({})

    const showPostCommentsList = () => {
        // onStopPlay()
        _refActionSheetCommentList.current.setModalVisible(true)
    }

    return (
        <View style={[styles.container]}>
            <View>
                <Text style={{ fontSize: 12, color: 'gray', fontStyle: 'italic' }}>{new Date(post?.created_at).toDateString()}</Text>
            </View>
            <TouchableOpacity onPress={props.onPress}>
                <View style={[styles.header, { justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FastImage
                            source={{ uri: post?.author?.profile_pic ? post?.author?.profile_pic : Constants.masterData.communityData.avatarUrl }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                marginRight: 12,
                                marginVertical: 12
                            }}
                        />
                        <View>
                            <Text>{post?.author?.fullname}</Text>
                            {/* <Text>American</Text> */}
                        </View>
                    </View>
                    {
                        props.onRemovePress &&
                        <Button
                            type='clear'
                            icon={
                                <Icon name={Constants.ionicon.trash} size={18} color={'red'} />
                            }
                            onPress={props.onRemovePress}
                        />

                    }
                </View>
                <View>
                    <FastImage
                        source={{ uri: post?.image ?? Constants.masterData.communityData.pageReaderUrl }}
                        style={{
                            width: Constants.device.width,
                            height: 160,
                            marginVertical: 12,
                            alignSelf: 'center'
                        }}
                        resizeMode='cover'
                    />
                    <Text>{post?.title}</Text>
                </View>

            </TouchableOpacity>
            {
                post?.record &&
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 20
                }}>
                    {
                        props.isPlaying ?
                            <Button
                                type='clear'
                                icon={
                                    <Icon name={Constants.ionicon.audioPause} size={28} color={Constants.COLORS.primary} />
                                }
                                onPress={props.onStopPlayPress}
                            />
                            :
                            <Button
                                type='clear'
                                icon={
                                    <Icon name={Constants.ionicon.audioPlay} size={28} color={Constants.COLORS.primary} />
                                }
                                onPress={props.onStartPlayPress}
                            />
                    }
                    <LinearProgress variant={props?.isPlaying ? 'indeterminate' : 'determinate'} color="primary" style={{ marginHorizontal: 8, width: '90%' }} />
                    <Text>{props.playingTime}</Text>
                </View>

            }
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                    type='clear'
                    icon={
                        <Icon name={post.is_user_favorite ? Constants.ionicon.likeThumb : Constants.ionicon.dislikeThumb} size={18} color={Constants.COLORS.primary} />
                    }
                    title={post?.favorite_numbers.toString()}
                    onPress={props.onToggleFavoritePress}
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
                    title={post?.comment_numbers.toString()}
                    onPress={props.onShowCommentPress}
                />
            </View>


        </View >
    )
}

export default CommunityPostCard

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#ffffff',
        marginVertical: 2,
        ...Constants.styles.boxshadow,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})
