import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CommunityPostCard from './CommunityPostCard'
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import RNFS from 'react-native-fs';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { _refRootNavigation } from '../../../app/Router/RootNavigation';
import CommunityHandler from '../CommunityHandler';

interface PostListI {
    data?: any,
    getData?: Function
}
const audioRecorderPlayer = new AudioRecorderPlayer();
const CommunityPostList = (props: PostListI) => {

    const { stopPlay } = CommunityHandler()

    const [postList, setPostList] = useState([])

    const _onShowRecordingScreen = () => {
        stopPlay()
        _refRootNavigation.navigate('CommunityPostDetailScreen')
    }

    useEffect(() => {
        let x = Math.ceil(Math.random() * 10)
        setPostList(Array(x).fill({}))
    }, [])
    return (
        <View>
           
            {
                postList.map((item, index) =>
                    <CommunityPostCard onPress={_onShowRecordingScreen} />
                )
            }
        </View>
    )
}

export default CommunityPostList

const styles = StyleSheet.create({})
