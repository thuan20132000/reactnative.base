import React, { useCallback, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Constants from '../../app/constants/Constant'
import { _refRootNavigation } from '../../app/Router/RootNavigation'
import CommunityPostCard from './components/CommunityPostCard'
import StoryItem from './components/StoryItem'
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import RNFS from 'react-native-fs';
import CommunityPostList from './components/CommunityPostList'
import CommunityHandler from './CommunityHandler'


const audioRecorderPlayer = new AudioRecorderPlayer();

const CommunityHomeScreen = () => {

    const { stopPlay } = CommunityHandler()
    const _onShowAddCommunityPractice = () => {
        stopPlay()
        _refRootNavigation.navigate('RecordingScreen')
    }


    return (
        <SafeAreaView>

            <ScrollView>

                <Button
                    onPress={_onShowAddCommunityPractice}
                    title={`Add your practice `}
                    containerStyle={{
                        marginHorizontal: 12,
                        borderRadius: 12,
                        marginVertical: 12
                    }}
                    titleStyle={{ fontSize: 18, fontWeight: '700' }}
                />

                <CommunityPostList />
            </ScrollView>
        </SafeAreaView>
    )
}

export default CommunityHomeScreen

const styles = StyleSheet.create({})
