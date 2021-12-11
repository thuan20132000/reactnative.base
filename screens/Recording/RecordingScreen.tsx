import React, { useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, ScrollView, Image, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import { Button } from 'react-native-elements';
import RenderHtml from "react-native-render-html";
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from '../../app/constants/Constant';
import { LinearProgress } from 'react-native-elements';

import ActionSheet from "react-native-actions-sheet";
import ShareRecordingPractice from './components/ShareRecordingPractice';



const RNFS = require('react-native-fs');

interface recordingTime {
    recordSecs: string,
    recordTime: string,
    currentPositionSec: string,
    currentDurationSec: string,
    playingTime: string,
    duration: string,
    isRecording: boolean,
    isPlaying: boolean,
    audioFile: string

}




const audioRecorderPlayer = new AudioRecorderPlayer();
const RecordingScreen = () => {
    const _refActionSheetRecordingShare = useRef<ActionSheet>()
    const [recordingTime, setRecordingtime] = useState<recordingTime>()
    const [isRecording, setIsRecording] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [playingTime, setPlayingTime] = useState('')

    const dirMusic = `${RNFS.ExternalStorageDirectoryPath}/Music`;
    const practice_audio_path = dirMusic + "/reading_practice.wav";
    const [imagePath, setImagepath] = useState('')
    const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const meteringEnabled = false;

    const onStartRecord = async () => {
        // Start recording

        try {

            setIsRecording(true)
            console.warn('start record...')
            const result = await audioRecorderPlayer.startRecorder(practice_audio_path, audioSet);
            audioRecorderPlayer.addRecordBackListener((e) => {
                let x = audioRecorderPlayer.mmss(Math.floor(e.currentPosition));
                setRecordingtime({
                    ...recordingTime,
                    recordSecs: e.currentPosition?.toString(),
                    recordTime: audioRecorderPlayer.mmssss(
                        Math.floor(e.currentPosition),
                    ).slice(1, 5),
                });
            });
            console.log(result);

        } catch (error) {
            console.log('error: ', error)
            setIsRecording(false)

        }
    };

    const onStopRecord = async () => {

        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        console.log(result);
        setIsRecording(false)
        setRecordingtime({ ...recordingTime, audioFile: practice_audio_path })

    };

    const onStartPlay = async () => {

        try {
            console.log('onStartPlay');
            const msg = await audioRecorderPlayer.startPlayer(practice_audio_path);
            // console.log(msg);
            setIsPlaying(true)
            audioRecorderPlayer.addPlayBackListener((e) => {
                // console.log('dd :', Math.ceil(e.duration/1000))
                console.log(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
                console.log('ee: ', Math.ceil(e.currentPosition / 1000))
                setPlayingTime((Math.ceil(e.duration / 1000) - Math.ceil(e.currentPosition / 1000)).toString())
                setRecordingtime({
                    ...recordingTime,
                    currentPositionSec: e.currentPosition?.toString(),
                    currentDurationSec: e.duration?.toString(),
                    playingTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
                    duration: Math.ceil(e.duration).toString(),
                    recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)).slice(1, 5)
                });
                console.log(e.currentPosition)
                if (e.currentPosition >= e.duration) {
                    onStopPlay()
                }
                return;
            });

        } catch (error) {
            setIsPlaying(false)
        }
    };

    const onPausePlay = async () => {
        await audioRecorderPlayer.pausePlayer();
    };

    const onStopPlay = () => {
        console.log('onStopPlay');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setIsPlaying(false)
    };

    const _onPickImage = () => {
        ImagePicker.openCamera({

            cropping: true,

        }).then(image => {
            console.log(image);
            setImagepath(image.path)
        });
    }

    const _onSharePress = () => {
        _refActionSheetRecordingShare.current.setModalVisible(true)
    }
    return (
        <View style={{}}>
            <View style={{ alignItems: 'center' }}>
                <ImageBackground
                    source={{ uri: imagePath == '' || !imagePath ? 'https://upload.wikimedia.org/wikipedia/commons/7/75/Southern_Life_in_Southern_Literature_text_page_322.jpg' : imagePath }}
                    style={{
                        width: Constants.device.width * 0.9,
                        height: Constants.device.height * 0.7,

                    }}
                    resizeMode={'contain'}
                />
                <Button
                    title="Open Camera"
                    onPress={_onPickImage}


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
                        onPress={onStartPlay}
                        type='clear'
                        icon={
                            <Icon name={isPlaying ? Constants.ionicon.audioPause : Constants.ionicon.audioPlay} size={28} />
                        }
                        disabled={isRecording}
                    />
                    <LinearProgress color="primary" style={{ marginHorizontal: 8 }} />
                    <Text>{recordingTime?.recordTime}</Text>
                </View>
            </View>



            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'flex-end',

                }}
            >
                <Button
                    title="Save"
                    type='clear'
                />

                <View>
                    {
                        !isRecording ?
                            <Button
                                // title="Start Record"
                                onPress={onStartRecord}
                                icon={
                                    <Icon name={Constants.ionicon.micro} size={42} color={'#000000'} />
                                }
                                type={'clear'}
                                disabled={isPlaying}
                            />
                            :
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {/* <Text>{recordingTime?.recordTime}</Text> */}
                                <Button
                                    onPress={onStopRecord}
                                    icon={
                                        <Icon name={Constants.ionicon.recordingStop} size={42} color={'red'} />
                                    }
                                    type='clear'
                                />
                            </View>

                    }
                </View>

                <Button
                    title="Share"
                    onPress={_onSharePress}
                    type='clear'

                />
            </View>



            <ActionSheet ref={_refActionSheetRecordingShare}>
                <View style={{ height: Constants.device.height * 0.5 }}>
                    <ShareRecordingPractice />
                </View>
            </ActionSheet>
        </View>
    )
}

export default RecordingScreen

const styles = StyleSheet.create({})
