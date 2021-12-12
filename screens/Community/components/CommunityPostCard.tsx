import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { Button, LinearProgress } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import Constants from '../../../app/constants/Constant'
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actions-sheet'
import CommunityCommentList from './CommunityCommentList'
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import RNFS from 'react-native-fs';
import CommunityHandler from '../CommunityHandler'


interface PostCardItemI {
    onPress?: TouchableOpacityProps['onPress'],
    onPlayingPress?: TouchableOpacityProps['onPress']
}

const audioRecorderPlayer = new AudioRecorderPlayer();

const CommunityPostCard = (props: PostCardItemI) => {
    const _refActionSheetCommentList = useRef<ActionSheet>()
    const [isPlaying, setIsPlaying] = useState(false)

    const { startPlay, stopPlay, playingTime } = CommunityHandler()

    const showPostCommentsList = () => {
        onStopPlay()
        _refActionSheetCommentList.current.setModalVisible(true)
    }

    const onStopPlay = () => {
        stopPlay()
    };

    const onStartPlay = async () => {
        startPlay()
    };
    return (
        <View style={[styles.container]}>
            <View>
                <Text>{new Date().toISOString()}</Text>
            </View>
            <TouchableOpacity onPress={props.onPress}>
                <View style={[styles.header]}>
                    <FastImage
                        source={{ uri: Constants.masterData.communityData.avatarUrl }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            marginRight: 12,
                            marginVertical: 12
                        }}
                    />
                    <View>
                        <Text>Dominique Palmer</Text>
                        <Text>American</Text>
                    </View>
                </View>
                <View>
                    <FastImage
                        source={{ uri: Constants.masterData.communityData.pageReaderUrl }}
                        style={{
                            width: '100%',
                            height: 120,
                            marginVertical: 12
                        }}
                        resizeMode='center'
                    />
                    <Text numberOfLines={2}>{Constants.masterData.communityData.descriptions}</Text>
                </View>

            </TouchableOpacity>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 20
            }}>
                <Button
                    type='clear'
                    icon={
                        <Icon name={isPlaying ? Constants.ionicon.audioPause : Constants.ionicon.audioPlay} size={28} color={Constants.COLORS.primary} />
                    }
                    onPress={onStartPlay}
                />
                <LinearProgress variant='determinate' color="primary" style={{ marginHorizontal: 8, width: '90%' }} />
                <Text>{playingTime}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.likeThumb} size={18} color={Constants.COLORS.primary} />
                    }
                    title={'12'}
                />
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.dislikeThumb} size={18} color={Constants.COLORS.primary} />
                    }
                    title={'6'}
                />
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.comment} size={18} color={Constants.COLORS.primary} />
                    }
                    title={'21'}
                    onPress={showPostCommentsList}
                />
            </View>

            <ActionSheet ref={_refActionSheetCommentList} >
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.down} size={22} color={Constants.COLORS.primary} />
                    }
                    onPress={() => _refActionSheetCommentList.current?.setModalVisible(false)}
                />

                <CommunityCommentList />

            </ActionSheet >
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
