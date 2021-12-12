import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, ScrollView, Image, ImageBackground, SafeAreaView, Keyboard, KeyboardEvent } from 'react-native'

import { Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';
import Constants from '../../app/constants/Constant';
import { LinearProgress } from 'react-native-elements';

import ActionSheet from "react-native-actions-sheet";
import CommunityCommentList from './components/CommunityCommentList';
import SendingInput from '../../components/Input/SendingInput';
import CommonTextInput from '../../components/Input/CommonTextInput';

interface PostDetailI {

}

const CommunityPostDetailScreen = (props: PostDetailI) => {
    const _refActionSheetCommentList = useRef<ActionSheet>()
    const [imagePath, setImagepath] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [isRecording, setIsRecording] = useState(false)

    const [isCommentFocussing, setIsCommentFocussing] = useState(false)

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setIsCommentFocussing(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setIsCommentFocussing(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [])
    return (

        <ScrollView style={{ flex: 1 }}>

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
                        <Icon name={Constants.ionicon.likeThumb} size={18} color={Constants.COLORS.primary} />
                    }
                    title={'12'}
                />
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.dislikeThumb} size={18} color={Constants.COLORS.primary} />
                    }
                    title={'6'}
                />
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.comment} size={18} color={Constants.COLORS.primary} />
                    }
                    title={'21'}
                    onPress={() => _refActionSheetCommentList.current?.setModalVisible()}
                />
            </View>

            <ActionSheet ref={_refActionSheetCommentList} >
                <Button
                    type='clear'
                    icon={
                        <Icon name={Constants.ionicon.down} size={22} color={Constants.COLORS.primary} />
                    }
                    onPress={() => _refActionSheetCommentList.current?.setModalVisible(false)}
                />
                <View style={{
                    height: Constants.device.height * (isCommentFocussing ? 0.6 : 0.9),
                    justifyContent: 'flex-end',
                    paddingTop: 4
                }}>
                    <CommunityCommentList />

                    <SendingInput
                        multiline
                        placeholder='Add a comment to post...'
                        style={{

                        }}
                        containerStyle={{
                            borderTopWidth: 1,
                            borderTopColor: Constants.COLORS.primary,
                            paddingVertical: 4,
                        }}
                    />
                </View>

            </ActionSheet>

        </ScrollView>
    )
}

export default CommunityPostDetailScreen

const styles = StyleSheet.create({})
