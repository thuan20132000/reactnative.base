import React from 'react'
import { StyleSheet, Text, TouchableOpacityProps, View } from 'react-native'
import { Button, ButtonProps, LinearProgress } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import Constants from '../../app/constants/Constant'
import Icon from 'react-native-vector-icons/Ionicons';
import CommentModel from '../../app/models/CommentModel'

interface PostCommentI {
    comment: CommentModel,
    onFavoritePress?: ButtonProps['onPress'],
    onPress?: TouchableOpacityProps['onPress'],
    onStartPlayPress?: TouchableOpacityProps['onPress'],
    onStopPlayPress?: TouchableOpacityProps['onPress'],
    onToggleFavoritePress?: TouchableOpacityProps['onPress'],
    onShowCommentPress?: TouchableOpacityProps['onPress'],
    isPlaying?: boolean,
    playingTime?: string,

}
const UserComment = (props: PostCommentI) => {
    return (
        <View style={[styles.container]}>
            <View style={[styles.header]}>
                <FastImage
                    source={{ uri: props.comment?.user?.profile_pic ?? Constants.masterData.communityData.avatarUrl }}
                    style={{
                        width: 50,
                        height: 50,
                        marginRight: 12,
                        marginVertical: 12,
                        borderRadius: 25
                    }}
                />
                <View>
                    <Text>{props.comment?.user?.fullname}</Text>
                    {/* <Text>American</Text> */}
                </View>


                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.personAdd} size={22} color={Constants.COLORS.primary} />
                    }
                    containerStyle={{ borderRadius: 20, position: 'absolute', top: 0, right: 0 }}
                />
            </View>
            <View style={{ marginBottom: 22 }}>
                <Text>{props.comment?.body}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Button
                    icon={
                        <Icon name={Constants.ionicon.likeThumb} size={16} color={Constants.COLORS.primary} />
                    }
                    type='clear'
                    containerStyle={{ borderRadius: 20, width: 100, height: 40 }}
                    title={props.comment?.favorite_numbers?.toString()}
                    onPress={props.onFavoritePress}
                />
                {/* <Button
                    icon={
                        <Icon name={Constants.ionicon.dislikeThumb} size={16} color={Constants.COLORS.white} />
                    }
                    containerStyle={{ borderRadius: 20, width: 100 }}
                    title={'34'}
                /> */}

            </View>
            {
                props.comment?.record &&
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
            <Text style={{ marginTop: 6, color: 'gray', fontStyle: 'italic' }}>{new Date(props.comment?.created_at).toDateString()}</Text>
        </View>
    )
}

export default UserComment

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        ...Constants.styles.boxshadow,
        marginHorizontal: 2,
        marginVertical: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})
