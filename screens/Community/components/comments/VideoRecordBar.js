import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { IconButton } from 'react-native-paper';
import * as PropTypes from 'prop-types';

const VideoRecordBar = ({
    videoUrl,
    _handleOpenPlayVideo,
    _handleSwithCameraType,
    _handleStopVideo,
    isRecordingVideo,
    _handleRecordVideo,

}) => {



    return (
        <View
            style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>


            {
                // videoUrl &&
                <TouchableOpacity
                    style={{}}
                    onPress={_handleOpenPlayVideo}

                >
                    <Image
                        source={{
                            uri: videoUrl
                        }}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

            }

            {
                isRecordingVideo ?

                    <IconButton
                        icon={'record-circle'}
                        color={'red'}
                        size={28}
                        onPress={_handleStopVideo}
                    />

                    :
                    <IconButton
                        icon={'record-circle-outline'}
                        color={'red'}
                        size={28}
                        onPress={_handleRecordVideo}
                    />

            }
            <IconButton
                icon={'camera-retake-outline'}
                color={'coral'}
                size={28}
                onPress={_handleSwithCameraType}
            />

        </View>


    )
}


VideoRecordBar.propTypes = {
    videoUrl: PropTypes.string,
    _handleOpenPlayVideo: PropTypes.func.isRequired,
    _handleRecordVideo: PropTypes.func.isRequired,
    isRecordingVideo: PropTypes.bool.isRequired,
    _handleStopVideo: PropTypes.func.isRequired,
    _handleSwithCameraType: PropTypes.func.isRequired,
}

export default VideoRecordBar



const styles = StyleSheet.create({})
