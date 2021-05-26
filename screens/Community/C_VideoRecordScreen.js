import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import ModalPreview from '../../components/Modal/ModalPreview';
import Video from 'react-native-video';
import { IconButton } from 'react-native-paper';
import VideoRecordBar from './components/comments/VideoRecordBar';
import VideoPreviewBar from './components/comments/VideoPreviewBar';
import { secondsToMinutes } from '../../utils/helper';
var RNFS = require('react-native-fs');


const C_VideoRecordScreen = (props) => {
    const _refCamera = React.useRef();
    const _refVideo = React.useRef();

    const [videoUrl, setVideoUrl] = React.useState(null);
    const [isRecordingVideo, setIsRecordingVideo] = React.useState(false);
    const [isShowVideo, setIsShowVideo] = React.useState(false);
    const [isOpenVideo, setIsOpenVideo] = React.useState(false);
    const path = Platform.select({
        android: 'sdcard/askmeit_dictionary/hello3.mp4', // should give extra dir name in android. Won't grant permission to the first level of dir.
    });
    const [videoData, setVideoData] = React.useState({
        url: null,
        duration: 0,
        name: 'test audio'
    })

    const [cameraConfig, setCameraConfig] = React.useState({
        type: 'front',
        quality: RNCamera.Constants.VideoQuality['1080p'],
        mirrorVideo: true,
        uri: path,
        maxDuration: 180
    })

    let timeInteval;

    const dirMusic = `${RNFS.PicturesDirectoryPath}`;

    const handleRecordVideo = async (camera) => {
        try {
            setVideoUrl(null);
            setIsOpenVideo(false)
            setIsRecordingVideo(true);
            // const options = { quality: 0.5, base64: true };
            // let res = await _refCamera.current.resumePreview();
            // console.warn('res: ', res);
            let x = 0;
            let duration = '';
            timeInteval = setInterval(() => {
                x = x + 1;
                duration = secondsToMinutes(x);

                setVideoData({
                    ...videoData,
                    duration: duration
                })
            }, 1000);

            let data = await _refCamera.current.recordAsync(cameraConfig);

            clearInterval(timeInteval);
            setVideoData({ ...videoData, duration: '' })

            setVideoUrl(data.uri);



        } catch (error) {
            console.warn('error: ', error);
            setVideoData({
                ...videoData,
                duration: 0
            })
            setIsRecordingVideo(false);
            clearInterval(timeInteval);
        }
    }

    const handleStopVideo = async () => {
        try {
            setIsRecordingVideo(false)
            // const options = { quality: 0.5, base64: true };
            // let res = await _refCamera.current.resumePreview();
            // console.warn('res: ', res);

            let data = await _refCamera.current.stopRecording();
            console.warn('res: ', data);

        } catch (error) {
            console.warn('error: ', error);
        }
    }
    const _handleCloseModal = () => {

    }


    const _handleSwithCameraType = () => {
        if (cameraConfig.type === 'front') {
            setCameraConfig({ ...cameraConfig, type: 'back' })
        } else {
            setCameraConfig({ ...cameraConfig, type: 'front' })
        }
    }

    const _handleOpenPlayVideo = () => {
        if (videoUrl) {
            setIsOpenVideo(true)
        }
    }


    const _handleSaveVideoToLibrary = () => {

        let options = {
            toFile: `${dirMusic}/video24.mp4`
        }

        RNFS.copyFile(videoUrl, options.toFile)
            .then((success) => {
                console.log('Save File successfully! ', options);
                // setSaveAudioVisible(false);
            })
            .catch((err) => {
                console.log('error: ', err.message);
            });
    }

    const _handleRemoveVideo = () => {
        RNFS.unlink(videoUrl)
            .then(() => {
                console.log('FILE DELETED');
                setIsOpenVideo(false);
                setVideoUrl(null);
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
                console.log(err.message);
            });

    }

    React.useEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        })
    }, [])


    return (
        <View
            style={{ display: 'flex', flex: 1 }}
        >



            {
                (videoUrl && isOpenVideo) ?
                    <Video
                        ref={_refVideo}                                      // Store reference
                        // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        // onError={this.videoError}               // Callback when video cannot be loaded
                        // style={styles.backgroundVideo}
                        source={{ uri: videoUrl || "" }}   // Can be a URL or a local file.
                        rate={1.0}
                        volume={3.0}
                        isMuted={false}
                        resizeMode="cover"
                        style={[
                            styles.preview
                        ]}

                        controls={true}


                    />
                    :
                    <RNCamera

                        ref={_refCamera}
                        style={styles.preview}
                        // type={RNCamera.Constants.VideoQuality['480p']}
                        captureAudio={true}
                        defaultTouchToFocus
                        type={cameraConfig.type}
                        flashMode={RNCamera.Constants.FlashMode.on}
                    // androidCameraPermissionOptions={{
                    //     title: 'Permission to use camera',
                    //     message: 'We need your permission to use your camera',
                    //     buttonPositive: 'Ok',
                    //     buttonNegative: 'Cancel',
                    // }}
                    // androidRecordAudioPermissionOptions={{
                    //     title: 'Permission to use audio recording',
                    //     message: 'We need your permission to use your audio',
                    //     buttonPositive: 'Ok',
                    //     buttonNegative: 'Cancel',
                    // }}

                    />


            }

            {
                isOpenVideo ?
                    <VideoPreviewBar
                        _handleOpenCamera={() => setIsOpenVideo(false)}
                        _handleSave={_handleSaveVideoToLibrary}
                        _handleRemoveVideo={_handleRemoveVideo}
                    />
                    :
                    <VideoRecordBar
                        videoUrl={videoUrl}
                        _handleOpenPlayVideo={_handleOpenPlayVideo}
                        _handleRecordVideo={handleRecordVideo}
                        isRecordingVideo={isRecordingVideo}
                        _handleStopVideo={handleStopVideo}
                        _handleSwithCameraType={_handleSwithCameraType}
                        recordTime={videoData.duration}

                    />
            }


        </View>
    )
}

export default C_VideoRecordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },


})
