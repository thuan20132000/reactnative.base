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
import CommunityCommentList from './components/CommunityCommentList';

const CommunityPostDetailScreen = () => {
    const _refActionSheetCommentList = useRef<ActionSheet>()
    const [imagePath, setImagepath] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [isRecording, setIsRecording] = useState(false)

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

            </View>


            <View style={{ alignItems: 'center' }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: Constants.device.width - 100,
                }}>
                    <Button
                        type='clear'
                        icon={
                            <Icon name={isPlaying ? Constants.ionicon.audioPause : Constants.ionicon.audioPlay} size={28} />
                        }
                        disabled={isRecording}
                    />
                    <LinearProgress color="primary" style={{ marginHorizontal: 8 }} />
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.likeThumb} size={22} color={Constants.COLORS.primary} />
                    }
                    title={'12'}
                />
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.dislikeThumb} size={22} color={Constants.COLORS.primary} />
                    }
                    title={'6'}
                />
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.comment} size={22} color={Constants.COLORS.primary} />
                    }
                    title={'21'}
                    onPress={() => _refActionSheetCommentList.current?.setModalVisible()}
                />
            </View>

            <ActionSheet ref={_refActionSheetCommentList} >
                <CommunityCommentList containerStyle={{ height: Constants.device.height - 100 }} />
            </ActionSheet>
        </View>
    )
}

export default CommunityPostDetailScreen

const styles = StyleSheet.create({})
