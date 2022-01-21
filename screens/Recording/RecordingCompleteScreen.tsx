import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ShareRecordingPractice from './components/ShareRecordingPractice';
import CommunityAPI from '../../app/API/CommunityAPI';
import { _refRootNavigation } from '../../app/Router/RootNavigation';
import { StackActions } from '@react-navigation/native';
import AppManager from '../../app/AppManager';
import RNProgressHud from 'progress-hud';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/Router/RootStackScreenList';

type Props = NativeStackScreenProps<RootStackParamList, 'RecordingCompleteScreen'>;

const RecordingCompleteScreen = ({ route, navigation }: Props) => {
    const { post } = route?.params
    // const [post, setPost] = useState({
    //     image: {
    //         uri: '',
    //         type: 'image/jpeg',
    //         name: 'photo.jpg',
    //     },
    //     title: '',
    //     record: {
    //         uri: ``,
    //         type: 'audio/wav',
    //         name: '',
    //     }
    // })
    const [postContent, setPostContent] = useState('')

    const _onSharePress = async () => {
        if (postContent == '' || postContent?.trim().length <= 0) {
            return
        }
        try {
            RNProgressHud.show()
            let data = {
                title: postContent
            }
            if (post?.image?.uri != '') {
                data['image'] = post.image
            }
            if (post?.record?.name != '') {
                data['record'] = post?.record
            }
            let response = await CommunityAPI.createPost(data)
            _refRootNavigation.dispatch(
                StackActions.popToTop()
            )
        } catch (error) {
            AppManager.shared.handleErrorMessage("Something Went Wrong!!!")
        }
        finally {
            RNProgressHud.dismiss()
        }
    }


    return (
        <View>
            <ShareRecordingPractice
                value={post.title}
                onChangeText={(text) => setPostContent(text)}
                onSharePress={_onSharePress}
            />
        </View>
    );
};

export default RecordingCompleteScreen;

const styles = StyleSheet.create({});
