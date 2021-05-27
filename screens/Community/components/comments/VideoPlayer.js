import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Video from 'react-native-video';
import { local_absolute } from '../../../../config/api_config.json';

const VideoPlayer = ({
    video_url,
    containerStyle
}) => {

    const _refVideo = React.useRef();

    return (
        <View>
            <Video
                ref={_refVideo}                                      // Store reference
                // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                // onError={this.videoError}               // Callback when video cannot be loaded
                // style={styles.backgroundVideo}
                source={{
                    uri: video_url,

                }}
                rate={1.0}
                volume={3.0}
                isMuted={false}
                resizeMode="contain"
                style={[
                    styles.preview,
                   containerStyle
                ]}

                controls={true}
                bufferConfig={{
                    minBufferMs: 15000,
                    maxBufferMs: 50000,
                    bufferForPlaybackMs: 2500,
                    bufferForPlaybackAfterRebufferMs: 5000
                }}

            />
        </View>
    )
}

export default VideoPlayer

const styles = StyleSheet.create({
    preview: {
        height: 420,
    }
})
