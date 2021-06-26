import React, { useState } from 'react'
import { Dimensions, Keyboard, StyleSheet,PermissionsAndroid, Text, View, KeyboardAvoidingView, Platform, FlatList, ActivityIndicator } from 'react-native'

import CommentInput from '../../components/Comments/CommentInput';
import CommentItem from '../../components/Comments/CommentItem';
import { Header } from '@react-navigation/stack';
import { createPostComment, getPostComments, getPostDetail, handleFavorite } from '../../utils/api_v1';
import { useSelector } from 'react-redux';
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import { local_absolute } from '../../config/api_config.json';
import { millisToMinutesAndSeconds, getDaysBetweenTwoDates, _onGetRandomNameByTime } from '../../utils/helper';
import VideoPlayer from './components/comments/VideoPlayer';
import { Modal, Provider, Portal, ProgressBar } from 'react-native-paper'
import CommonColor from '../../utils/CommonColor';
const audioRecorderPlayer = new AudioRecorderPlayer();





const C_CommunityPostDetailScreen = (props) => {
    const path = Platform.select({
        android: 'sdcard/askmeit_dictionary/hello3.mp3', // should give extra dir name in android. Won't grant permission to the first level of dir.
    });


    const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
    };
    const [audioPath,setAudioPath] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const { userInformation } = useSelector(state => state.authentication);
    const { post } = props.route.params;
    // const [readingPost, setReadingPost] = useState(readingpost);
    const _refBottomSheet = React.useRef();
    const [readStyle, setReadStyle] = useState({
        fontSize: 24,
        speed: 70
    });
    const [communityPost, setCommunityPost] = useState();
    const [postVideo, setPostVideo] = useState();
    const [commentList, setCommentList] = useState([]);
    const [isLoadingComment, setIsLoadingComment] = useState(false);
    const [nextCommentLink, setNextCommentLink] = useState('');
    const [isPlaying, setIsPlaying] = useState();
    const [duration, setDuration] = React.useState();
    const [currentProgress, setCurrentProgress] = React.useState(0);


    const [highlightVocabulary, setHighlightVocabulary] = React.useState([]);

    React.useEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false,
        });
        props.navigation.setOptions({
            title: ''
        })

        getPostDetail(post.id, userInformation.access)
            .then((res) => {
                setCommunityPost(res.data?.data?.post);
                setPostVideo(res.data?.data?.video);
                console.warn(res.data.data.video.video_url);
            })
            .catch((error) => {

            })
            .finally(() => {

            })

        setIsLoadingComment(true)
        getPostComments(post.id, userInformation.access)
            .then((res) => {
                if (res.status) {
                    setCommentList(res.data.data);
                    setNextCommentLink(res.data?.next);
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
            .finally(() => {
                setIsLoadingComment(false);
            })

        return () => {
            audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
            _onStopRecord();

            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true,

            });
        }
    }, []);


    const _onLoadMoreComments = async () => {

        if (nextCommentLink) {
            setIsLoadingComment(true);
            fetch(nextCommentLink, {
                headers: {
                    Authorization: `Bearer ${userInformation.access}`
                }
            })
                .then(res => res.json())
                .then((res) => {
                    if (res.status_code === 200) {
                        setCommentList(prev => {
                            return prev.concat(res.data)
                        })
                        if (res.next) {
                            setNextCommentLink(res.next);
                        } else {
                            setNextCommentLink(null)
                        }
                    }
                })
                .catch((error) => {
                    console.warn('error: ', error)
                })
                .finally(() => setIsLoadingComment(false))
        }
    }

    const _onSendComment = async (text) => {
       
        let comment_type = 'text';
        let file = '';
        if(isRecording){
            comment_type = 'audio';
            // let name = _onGetRandomNameByTime(20,'');
            // console.warn('name: ',name);

            file = {
                uri: `file:///${path}`,
                name: `csacasc.mp3`,
                type: 'audio/wav',
            }
            _onStopRecord();
            console.warn('f: ',file);
        }else{
            if(!text){
                return;
            }
        }
        let file_audio = {"name": "vdsvds.mp3", "type": "audio/wav", "uri": "file:///sdcard/askmeit_dictionary/hello3.mp3"}
    
        createPostComment(userInformation?.user?.id, text,comment_type,file, post.id, userInformation.access)
            .then((res) => {
                if (res.status) {
                    setCommentList(prev => {
                        return [{
                            id: Math.floor(Math.random * 100),
                            text: `${text}`,
                            created_at: new Date()
                        }, ...prev]
                    });
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
            .finally(() => {
                console.log('finnaly')
            })


        Keyboard.dismiss();
    }


    const _onStartPlay = async (audio_path) => {
        try {

            // const path = Platform.select({
            //     android: 'sdcard/askmeit_dictionary/hello3.wav', // should give extra dir name in android. Won't grant permission to the first level of dir.
            // });

            if (!audio_path) {
                return;
            }

            let audioPath = `${local_absolute}${audio_path}`;
            setIsPlaying(true);
            let e = await audioRecorderPlayer.startPlayer(audioPath);


            await audioRecorderPlayer.setVolume(1.0);
            audioRecorderPlayer.addPlayBackListener((e) => {
                // console.log(e.current_position);
                // console.log('playing...', e.current_position);
                let leave_time = e.duration - e.current_position;
                let xx = millisToMinutesAndSeconds(leave_time);
                setDuration(xx);
                let progress = e.current_position / e.duration;
                setCurrentProgress(progress);

                if (e.current_position === e.duration) {

                    audioRecorderPlayer.stopPlayer()
                        .then(() => {
                            // console.log('stopped play')
                            audioRecorderPlayer.removePlayBackListener();
                        })
                        .catch((err) => console.log('error: ', err))
                        .finally(() => {
                            setIsPlaying(false);
                        })
                    // audioRecorderPlayer.removePlayBackListener()
                    // return;
                }

            });



        } catch (error) {
            // console.log('error: ', error);
            throw error
        }
    }

    const _onStartRecord = async () => {
        setIsRecording(true)
        try {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                        {
                            title: 'Permissions for write access',
                            message: 'Give permission to your storage to write a file',
                            buttonPositive: 'ok',
                        },
                    );


                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('You can use the record');
                        let audio_uri = await audioRecorderPlayer.startRecorder(path, audioSet);
                        console.log('au: ',audio_uri);
                        setAudioPath(audio_uri);
                        audioRecorderPlayer.addRecordBackListener(e => {
                            console.log('Recording . . . ', e.current_position);
                            return;
                        });

                        // console.log(`uri: ${audio_uri}`);
                        // setAudioPath(audio_uri);

                    } else {
                        console.log('permission denied');
                        return;
                    }
                } catch (err) {
                    console.warn(err);
                    setIsRecording(false)

                    return;
                }
            }

        } catch (error) {
            console.warn('error: ', error);
        }
    };

    const _onStopRecord = async () => {
        try {
            let a = await audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
            setIsRecording(false)

        } catch (error) {

            console.warn('error', error);
        }
    };


    const _onPausePlay = async () => {
        setIsPlaying(false)
        await audioRecorderPlayer.pausePlayer();
    }
    const _onStopPlay = async () => {
        setIsPlaying(false);
        audioRecorderPlayer.stopPlayer();
    }
    const [visible, setVisible] = React.useState(false);


    const containerStyle = { backgroundColor: 'white', padding: 20, marginHorizzontal: 20 };
    return (
        <Provider>
            <Portal>
                <Modal visible={isPlaying} onDismiss={_onStopPlay} contentContainerStyle={{
                    backgroundColor: 'white',
                    padding: 20,
                    marginHorizzontal: 20,
                    marginHorizontal: 22,
                    borderRadius: 22
                }}>
                    <ProgressBar
                        indeterminate={true}
                        color={CommonColor.btnSubmit}
                    />
                </Modal>
            </Portal>
            <View
                style={{
                    display: 'flex',
                    flex: 1
                }}
            >

                <View
                    style={{
                        height: '40%',
                        backgroundColor:'lightgrey'
                    }}
                >

                    <VideoPlayer
                        video_url={postVideo?.video_url || 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'}
                        containerStyle={{
                            height: '100%',
                        }}
                    />

                    {/* </ScrollView> */}


                </View>


                <FlatList
                    data={commentList}
                    renderItem={({ item }) =>
                        <CommentItem
                            commentText={item.text}
                            commentDate={`${getDaysBetweenTwoDates(item.created_at)}`}
                            commentType={item.comment_type}
                            commentAudio={item?.audio}
                            onPlay={() => _onStartPlay(item.audio)}
                        />
                    }
                    keyExtractor={(item, idnex) => idnex.toString()}
                    inverted={true}
                    onEndReachedThreshold={0.1}
                    onEndReached={_onLoadMoreComments}
                    ListFooterComponent={
                        <ActivityIndicator
                            color={'coral'}
                            animating={isLoadingComment}
                        />
                    }

                />

                <CommentInput
                    onSendPress={_onSendComment}
                    onStartRecord={_onStartRecord}
                    onStopRecord={_onStopRecord}
                    isRecording={isRecording}
                />
            </View>
        </Provider>)
}
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
export default C_CommunityPostDetailScreen


const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',

    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    }
})
