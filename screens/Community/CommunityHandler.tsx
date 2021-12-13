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


const audioRecorderPlayer = new AudioRecorderPlayer();

interface CommunityPostI {
    record?: string
}
const CommunityHandler = (props: CommunityPostI) => {
    const dirMusic = `${RNFS.ExternalStorageDirectoryPath}/Music`;
    // const practice_audio_path = dirMusic + "/reading_practice.wav";
    const [isPlaying, setIsPlaying] = useState(false)
    const [playingTime, setPlayingTime] = useState('')
    const [recordPath, setRecordPath] = useState('')
    const stopPlay = () => {
        console.log('onStopPlay');
        setIsPlaying(false)
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
    };

    const startPlay = async () => {

        try {
            console.log('onStartPlay');
            stopPlay()
            const msg = await audioRecorderPlayer.startPlayer(recordPath);
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
        playingTime
    }
}

export default CommunityHandler

