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
import CommentModel from '../../app/models/CommentModel';


const audioRecorderPlayer = new AudioRecorderPlayer();

interface CommentI {
    record?: string
}
const CommentHandler = (props: CommentI) => {
    const dirMusic = `${RNFS.ExternalStorageDirectoryPath}/Music`;
    // const practice_audio_path = dirMusic + "/reading_practice.wav";
    const [currentComment, setCurrentComment] = useState<CommentModel>()
    const [isPlaying, setIsPlaying] = useState(false)
    const [playingTime, setPlayingTime] = useState('')
    const [recordPath, setRecordPath] = useState('')
    const stopPlay = () => {
        console.log('onStopPlay');
        setIsPlaying(false)
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setPlayingTime('')
    };

    const startPlay = async (currentComment: CommentModel) => {

        try {
            console.log('onStartPlay');
            stopPlay()
            const msg = await audioRecorderPlayer.startPlayer(currentComment.record);
            // console.log(msg);
            setIsPlaying(true)
            audioRecorderPlayer.addPlayBackListener((e) => {
                // console.log('dd :', Math.ceil(e.duration/1000))
                // console.log(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
                // console.log('ee: ', Math.ceil(e.currentPosition / 1000))
                setPlayingTime((Math.ceil(e.duration / 1000) - Math.ceil(e.currentPosition / 1000)).toString())

                console.log(e.currentPosition)
                if (e.currentPosition >= e.duration) {
                    stopPlay()
                }
                return;
            });

        } catch (error) {
            setIsPlaying(false)
        }
    };


    useEffect(() => {


    }, [])


    return {
        startPlay,
        stopPlay,
        setRecordPath,
        recordPath,
        isPlaying,
        playingTime,
        currentComment,
        setCurrentComment
    }
}

export default CommentHandler

