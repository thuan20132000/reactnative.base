import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'



import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import RNFS from 'react-native-fs';
import CommunityPostModel from '../../app/models/CommunityPostModel';


const audioRecorderPlayer = new AudioRecorderPlayer();

interface CommunityPostI {
    record?: string
}
const CommunityHandler = (props: CommunityPostI) => {
    const dirMusic = `${RNFS.ExternalStorageDirectoryPath}/Music`;
    // const practice_audio_path = dirMusic + "/reading_practice.wav";
    const [currentPost, setCurrentPost] = useState<CommunityPostModel>()
    const [isPlaying, setIsPlaying] = useState(false)
    const [playingTime, setPlayingTime] = useState('')
    const [recordPath, setRecordPath] = useState('')
    const stopPlay = () => {
        setIsPlaying(false)
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setPlayingTime('')
    };

    const startPlay = async (post: CommunityPostModel) => {

        try {
            stopPlay()
            const msg = await audioRecorderPlayer.startPlayer(post.record);
            setIsPlaying(true)
            audioRecorderPlayer.addPlayBackListener((e) => {
                let pltime = (Math.ceil(e.duration / 1000) - Math.ceil(e.currentPosition / 1000)).toString()
                setPlayingTime(pltime)
                if (e.currentPosition >= e.duration) {
                    stopPlay()
                }
                return;
            });

        } catch (error) {
            setIsPlaying(false)
        }
    };

    return {
        startPlay,
        stopPlay,
        setRecordPath,
        recordPath,
        isPlaying,
        playingTime,
        currentPost,
        setCurrentPost
    }
}

export default CommunityHandler

