import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { IconButton } from 'react-native-paper';
import * as PropTypes from 'prop-types';
import CommonIcons from '../../../../utils/CommonIcons'


const VideoPreviewBar = ({
    videoUrl,
    _handleOpenCamera,
    _handleSave,
    _handleRemoveVideo,


}) => {
    return (
        <View
            style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>


            <IconButton
                icon={CommonIcons.removeTrash}
                color={'red'}
                size={28}
                onPress={_handleRemoveVideo}
            />
            <IconButton
                icon={CommonIcons.cameraplus}
                color={'red'}
                size={28}
                onPress={_handleOpenCamera}
            />
            <IconButton
                icon={CommonIcons.saveFile}
                color={'red'}
                size={28}
                onPress={_handleSave}
            />



            {/* 
            <IconButton
                icon={CommonIcons.shareVariant}
                color={'coral'}
                size={28}
                onPress={_handleSwithCameraType}
            /> */}

        </View>
    )
}

export default VideoPreviewBar

VideoPreviewBar.propTypes = {
    //  _handleSwithCameraType: PropTypes.func.isRequired,
    _handleOpenCamera: PropTypes.func.isRequired,
    _handleSave:PropTypes.func.isRequired,
    _handleRemoveVideo:PropTypes.func.isRequired
}

const styles = StyleSheet.create({})
