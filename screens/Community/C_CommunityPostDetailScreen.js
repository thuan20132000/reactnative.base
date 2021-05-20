import React, { useState } from 'react'
import { Dimensions, Keyboard, StyleSheet, Text, View, KeyboardAvoidingView, Platform, FlatList, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import AudioItem from '../../components/Item/AudioItem';
import CommonIcons from '../../utils/CommonIcons';
import CommonImages from '../../utils/CommonImages';
import Highlighter from 'react-native-highlight-words';
import readingpost from '../../data/readingpost_data.json';
import BottomRecordingNavigation from './components/BottomRecordingNavigation';
import AudioPlay from '../../components/Card/AudioPlay';
import BottomSheetComment from '../../components/BottomSheet/BottomSheetComment';
import HeaderBack from '../../components/Header/HeaderBack';
import CommentInput from '../../components/Comments/CommentInput';
import CommentItem from '../../components/Comments/CommentItem';
import { Header } from '@react-navigation/stack';
import { createPostComment, getPostComments, getPostDetail, handleFavorite } from '../../utils/api_v1';
import { useSelector } from 'react-redux';
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import { local_absolute } from '../../config/api_config.json';
import { millisToMinutesAndSeconds, getDaysBetweenTwoDates } from '../../utils/helper';

const audioRecorderPlayer = new AudioRecorderPlayer();

const C_CommunityPostDetailScreen = (props) => {

    const { userInformation } = useSelector(state => state.authentication);
    const { post } = props.route.params;
    // const [readingPost, setReadingPost] = useState(readingpost);
    const _refBottomSheet = React.useRef();
    const [readStyle, setReadStyle] = useState({
        fontSize: 24,
        speed: 70
    });
    const [communityPost, setCommunityPost] = useState();
    const [postAudio, setPostAudio] = useState();
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


        getPostDetail(post.id, userInformation.access)
            .then((res) => {
                setCommunityPost(res.data?.data?.post);
                setPostAudio(res.data?.data?.audio);
            })
            .catch((error) => {

            })
            .finally(() => {

            })


        return () => {
            audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();

            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true,

            });
        }
    }, []);

    const _onHandleFavoritePress = async () => {
        handleFavorite(communityPost.id, userInformation?.user?.id, userInformation.access)
            .then((res) => {
                let is_favorited = res.data?.post_favorite;
                setCommunityPost({
                    ...communityPost,
                    is_favorited_by_user:is_favorited
                })

            })
            .catch((error) => {
                console.warn('error: ', error);
            })
    }

    const _onRecordPractisePress = async () => {
        props.navigation.navigate('CommunityRecordPractise');
    }

    const _onOpenComments = async () => {
        _refBottomSheet.current.open();
        setIsLoadingComment(true)
        getPostComments(communityPost.id, userInformation.access)
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
    }

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

        createPostComment(userInformation?.user?.id, text, 'text', '', post.id, userInformation.access)
            .then((res) => {
                if (res.status) {
                    setCommentList(prev => {
                        return [{
                            id: Math.floor(Math.random * 100),
                            text: `Comment: ${text}`,
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


    const _onStartPlay = async () => {
        try {

            // const path = Platform.select({
            //     android: 'sdcard/askmeit_dictionary/hello3.wav', // should give extra dir name in android. Won't grant permission to the first level of dir.
            // });

            if (!postAudio.audio) {
                return;
            }

            let audioPath = `${local_absolute}${postAudio.audio}`;
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

    const _onPausePlay = async () => {
        setIsPlaying(false)
        await audioRecorderPlayer.pausePlayer();
    }

    return (
        <>
            <View
                style={{
                    display: 'flex',
                    flex: 1
                }}
            >

                <View
                    style={{
                        height: '90%'
                    }}
                >
                    <ScrollView
                        style={{
                            backgroundColor: 'white',
                            paddingHorizontal: 12
                        }}
                    >
                        <Text
                            style={{
                                fontSize: readStyle.fontSize,
                                lineHeight: 52,
                                textAlign: 'justify',
                            }}
                            // suppressHighlighting={true}
                            // selectable={true}
                            allowFontScaling={true}

                        >
                            {
                                communityPost?.content
                            }

                        </Text>

                    </ScrollView>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >

                        <AudioPlay
                            onPlay={_onStartPlay}
                            onPause={_onPausePlay}
                            isPlaying={isPlaying}
                            currentProgress={currentProgress}
                            durationTime={duration}
                        />

                    </View>
                </View>


                <View
                    style={[
                        styles.row,
                        {
                            justifyContent: 'space-between',
                            paddingHorizontal: 22
                        }
                    ]}
                >
                    <View
                        style={[
                            styles.row,
                            {
                                alignItems: 'center'
                            }
                        ]}
                    >

                        <View
                            style={[
                                styles.row,
                                {
                                    alignItems: 'center'
                                }
                            ]}
                        >
                            <IconButton
                                icon={communityPost?.is_favorited_by_user ? CommonIcons.heart : CommonIcons.heartOutline}
                                color={'coral'}
                                size={24}
                                style={{ marginHorizontal: 6 }}
                                onPress={_onHandleFavoritePress}

                            />
                            <Text style={{ fontWeight: '700' }}>{communityPost?.post_favorite_number}</Text>
                        </View>

                        <View
                            style={[
                                styles.row,
                                {
                                    alignItems: 'center'
                                }
                            ]}
                        >
                            <IconButton
                                icon={CommonIcons.commentProcessingOutline}
                                color={'coral'}
                                size={24}
                                style={{ marginHorizontal: 6 }}
                                onPress={_onOpenComments}

                            />
                            <Text style={{ fontWeight: '700' }}>{communityPost?.post_comments_number}</Text>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.row,
                            {
                                alignItems: 'center'
                            }
                        ]}
                    >
                        <IconButton
                            icon={CommonIcons.microphonePlus}
                            color={'coral'}
                            size={24}
                            style={{ marginHorizontal: 6 }}
                            onPress={_onRecordPractisePress}

                        />
                        <Text style={{ fontWeight: '700' }}>Tập luyện</Text>
                    </View>
                </View>

            </View>

            <BottomSheetComment
                refRBSheet={_refBottomSheet}
                height={deviceHeight}
                openDuration={420}

            >
                <HeaderBack
                    backTitle={'Trở về'}
                    onBackPress={() => _refBottomSheet.current.close()}
                />
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                    }}
                    behavior={'padding'}
                    keyboardVerticalOffset={'0'}


                >

                    <FlatList
                        data={commentList}
                        renderItem={({ item }) =>
                            <CommentItem
                                commentText={item.text}
                                commentDate={`${getDaysBetweenTwoDates(item.created_at)}`}
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
                    />

                </KeyboardAvoidingView>



            </BottomSheetComment>
        </>
    )
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
