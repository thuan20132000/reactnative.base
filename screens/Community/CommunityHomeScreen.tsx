import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import Constants from '../../app/constants/Constant'
import { _refRootNavigation } from '../../app/Router/RootNavigation'
import CommunityPostCard from './components/CommunityPostCard'
import StoryItem from './components/StoryItem'

const CommunityHomeScreen = () => {

    const _onShowRecordingScreen = () => {
        _refRootNavigation.navigate('CommunityPostDetailScreen')
    }
    return (
        <View>
            <FlatList
                data={Array(20).fill({})}
                renderItem={({ item, index, separators }) => <StoryItem />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            <ScrollView>
                <CommunityPostCard
                    onPress={_onShowRecordingScreen}
                />
                <CommunityPostCard

                />
                <CommunityPostCard

                />
            </ScrollView>
        </View>
    )
}

export default CommunityHomeScreen

const styles = StyleSheet.create({})
