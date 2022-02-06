import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, ScrollView, Image, ImageBackground, TouchableOpacityProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from '../../app/constants/Constant';
import { LinearProgress, Button, ButtonProps } from 'react-native-elements';

import ActionSheet from "react-native-actions-sheet";
import 'react-native-get-random-values'
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';
import RNFS from 'react-native-fs';
import AppManager from '../../app/AppManager';
import RNProgressHud from 'progress-hud';
import { _refRootNavigation } from '../../app/Router/RootNavigation';
import { BannerAd, TestIds, BannerAdSize, InterstitialAd } from '@react-native-firebase/admob';

import CommunityPostModel from '../../app/models/CommunityPostModel';
import AudioModel from '../../app/models/AudioModel';


const adUnitId = __DEV__ ? TestIds.BANNER : Constants.config.adbmod_banner;
const adUnitIdIntertitial = __DEV__ ? TestIds.INTERSTITIAL : Constants.config.adbmod_fullpage;


interface recordingTime {
    recordSecs?: string,
    recordTime?: string,
    currentPositionSec?: string,
    currentDurationSec?: string,
    playingTime?: string,
    duration?: string,
    isRecording?: boolean,
    isPlaying?: boolean,
    audioFile?: string,
    audioComment?: any,
    setAudioComment?: any,
    post: CommunityPostModel,
    onSaveRecording?: ButtonProps['onPress'],
    onSaveRecordingPress?: ButtonProps['onPress']

}

const interstitial = InterstitialAd.createForAdRequest(adUnitIdIntertitial.toString(), {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'books', 'travel', 'medicine', 'fitness'],
});


const audioRecorderPlayer = new AudioRecorderPlayer();
const CommunityAudioCommentScreen = (Props: recordingTime) => {


    const _refActionSheetRecordingShare = useRef<ActionSheet>()
    const [recordingTime, setRecordingtime] = useState<recordingTime>()
    const [isRecording, setIsRecording] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [playingTime, setPlayingTime] = useState('')
    const dirMusic = `${RNFS.ExternalStorageDirectoryPath}/Music`;
    const practice_audio_path = dirMusic + `/practice_audio.wav`;
    const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const meteringEnabled = false;
    const [recordComment, setRecordComment] = useState<AudioModel>({
        uri: ``,
        type: 'audio/wav',
        name: '',
    })

    const onStartRecord = async () => {
        // Start recording

        try {

            setIsRecording(true)
            const result = await audioRecorderPlayer.startRecorder();
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
        let record = {
            uri: result,
            type: 'audio/wav',
            name: `${uuidv4()}-${new Date().getTime()}.wav`,
        }
        setRecordComment(record)
        Props.setAudioComment(record)
        console.log(result);
        setIsRecording(false)
        setRecordingtime({ ...recordingTime, audioFile: practice_audio_path })

    };


    const onStartPlay = async () => {

        try {
            const msg = await audioRecorderPlayer.startPlayer(recordComment?.uri);
            // console.log(msg);
            setIsPlaying(true)
            audioRecorderPlayer.addPlayBackListener((e) => {
                // console.log('dd :', Math.ceil(e.duration/1000))
                setPlayingTime((Math.ceil(e.duration / 1000) - Math.ceil(e.currentPosition / 1000)).toString())
                setRecordingtime({
                    ...recordingTime,
                    currentPositionSec: e.currentPosition?.toString(),
                    currentDurationSec: e.duration?.toString(),
                    playingTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
                    duration: Math.ceil(e.duration).toString(),
                    recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)).slice(1, 5)
                });
                if (e.currentPosition >= e.duration) {
                    onStopPlay()
                }
                return;
            });

        } catch (error) {
            setIsPlaying(false)
            onStopPlay()

        }
    };


    const onStopPlay = () => {
        console.log('onStopPlay');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setIsPlaying(false)
    };



    useEffect(() => {

        return () => {
            onStopPlay()
        }
    }, [])

    return (
        <View style={{}}>
            <ScrollView>
                <View
                    style={{
                        display: 'flex',
                        alignSelf: 'center',
                        backgroundColor: 'transparent'
                    }}
                >
                    <BannerAd
                        unitId={adUnitId?.toString()}
                        size={BannerAdSize.BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />

                </View>

                <View style={{ alignItems: 'center' }}>
                    <ImageBackground
                        source={{ uri: Props.post?.image ?? 'https://upload.wikimedia.org/wikipedia/commons/7/75/Southern_Life_in_Southern_Literature_text_page_322.jpg' }}
                        style={{
                            width: Constants.device.width * 0.9,
                            height: Constants.device.height * 0.65,

                        }}
                        resizeMode={'contain'}
                    />
                    {/* <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <Button
                            onPress={_onPickImage}
                            containerStyle={{ marginHorizontal: 4 }}
                            icon={
                                <Icon name={Constants.ionicon.camera} color={Constants.COLORS.primary} size={22} />
                            }
                            type='clear'
                        />
                        <Button
                            onPress={_onPickLibrary}
                            containerStyle={{ marginHorizontal: 4 }}
                            icon={
                                <Icon name={Constants.ionicon.folder} color={Constants.COLORS.primary} size={22} />
                            }
                            type='clear'

                        />
                    </View> */}
                </View>


                <View style={{ alignItems: 'center' }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: Constants.device.width - 100,
                    }}>
                        {
                            isPlaying ?
                                <Button
                                    onPress={onStopPlay}
                                    type='clear'
                                    icon={
                                        <Icon name={Constants.ionicon.audioPause} color={Constants.COLORS.primary} size={28} />
                                    }
                                    disabled={isRecording}
                                />
                                :
                                <Button
                                    onPress={onStartPlay}
                                    type='clear'
                                    icon={
                                        <Icon name={Constants.ionicon.audioPlay} color={Constants.COLORS.primary} size={28} />
                                    }
                                    disabled={isRecording}
                                />

                        }
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


                    <View>
                        {
                            !isRecording ?
                                <Button
                                    // title="Start Record"
                                    onPress={onStartRecord}
                                    icon={
                                        <Icon name={Constants.ionicon.micro} size={42} color={Constants.COLORS.primary} />
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
                        title="Save"
                        type='clear'
                        containerStyle={{ position: 'absolute', right: 0 }}
                        onPress={Props.onSaveRecording}

                    />
                </View>
            </ScrollView>


        </View>
    )
}

export default CommunityAudioCommentScreen

const styles = StyleSheet.create({})