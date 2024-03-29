import React from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { List, Modal, Portal, Provider } from 'react-native-paper';
import Highlighter from 'react-native-highlight-words';
import ButtonText from '../../components/Button/BottonText';
import AudioPlay from '../../components/Card/AudioPlay';
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import { millisToMinutesAndSeconds, _onGetRamdonBetweenInt } from '../../utils/helper';

import * as readingActions from '../../store/actions/readingActions';
import { useDispatch } from 'react-redux';
import { getReadingPostDetail, getTopicVocabulary } from '../../utils/api_v1';

import { url_absolute } from '../../config/api_config.json';
import sample_data from '../../data/sample_data.json';
import CommonColor from '../../utils/CommonColor';
import QuizAPI from '../../app/API/QuizAPI';
import { config } from '../../app/constants';
import ReadingAPI from '../../app/API/ReadingAPI';
import ReadingPostDB from '../../app/DB/ReadingPost';
import ReadingModel from '../../app/models/readingModel';

const audioRecorderPlayer = new AudioRecorderPlayer();

const ReadingVocabularyScreen = (props) => {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);
    const { readingpost } = props.route?.params;


    const [readingPost, setReadingPost] = React.useState(new ReadingModel());
    const [readingPostVocabulary, setReadingPostVocabulary] = React.useState([]);

    const [highlightVocabulary, setHighlightVocabulary] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [duration, setDuration] = React.useState();
    const [currentProgress, setCurrentProgress] = React.useState(0);


    const _onStartPlay = async () => {
        if (!readingPost.practice_audio) {
            return;
        }

        setIsPlaying(true);
        try {


            let reading_audio_path = config.aws_url + `${readingPost.practice_audio}`;
            let e = await audioRecorderPlayer.startPlayer(reading_audio_path);

            await audioRecorderPlayer.setVolume(1.0);
            audioRecorderPlayer.addPlayBackListener((e) => {
             
                let leave_time = e.duration - e.currentPosition;
                let xx = millisToMinutesAndSeconds(leave_time);
              
                setDuration(xx);
                let progress = e.currentPosition / e.duration;
                if (progress) {
                    setCurrentProgress(progress);

                }

                // console.log('playing...', xx);


                if (e.currentPosition >= e.duration) {

                    audioRecorderPlayer.stopPlayer()
                        .then(() => {
                            console.log('stopped play')
                            audioRecorderPlayer.removePlayBackListener();
                        })
                        .catch((err) => {
                            console.log('error: ', err);
                            // setIsPlaying(false);

                        })
                        .finally(() => {
                            setIsPlaying(false);
                        })
              
                }

            });



        } catch (error) {
            console.log('error: ', error);
        }
    }



    const _onPausePlay = async () => {
        setIsPlaying(false)
        await audioRecorderPlayer.pausePlayer();
    }


    React.useEffect(() => {
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();

        ReadingPostDB.getReadingPostDetail(readingpost?.id, res => {
            if (res) {
                let readingPost = new ReadingModel(res)
                setReadingPost(readingPost);
            }
        })

        ReadingPostDB.getReadingPostVocabulary(readingpost?.id, res => {
            if (res && res.length > 0) {
                setReadingPostVocabulary(res);
                let highlightVocabulary = res.map(e => e.name)
                setHighlightVocabulary(highlightVocabulary)
            }
        })

        dispatch(readingActions.resetLearnVocabularyList())


        props.navigation.setOptions({
            title: readingpost.title
        })

        return () => {
            audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
            audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
        }

    }, []);



    const _onNavigateToVocabularyPractice = async () => {

        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        if (readingPost.reading_post_vocabulary?.length <= 0) {
            return;
        }

        setIsLoading(true);
        let random_topic_id = _onGetRamdonBetweenInt(17, 30);

        QuizAPI.getTopicVocabulary(random_topic_id)
            .then((res) => {
                if (res.status_code === 200 && res.data?.length > 0) {
                    dispatch(readingActions.setReadingVocabularyList(readingPost.reading_post_vocabulary, res.data))
                }
                else {
                    dispatch(readingActions.setReadingVocabularyList(readingPost.reading_post_vocabulary, sample_data))
                }
            })
            .then(() => {
                props.navigation.navigate('ReadingVocabularyPractice', {
                    readingpost: readingpost
                });
            })
            .catch((err) => {
                console.log('error: ', err);
            })
            .finally(() => setIsLoading(false));



    }

    const _onNavigateToReadingPractice = () => {
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();

        props.navigation.replace('ReadingPractice', {
            readingpost: readingpost
        });
    }


    React.useLayoutEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        })

       
    }, [])


    return (

        <Provider>
            <Portal>
                <Modal
                    visible={isLoading}
                    contentContainerStyle={{
                        padding: 20,
                        marginHorizontal: 40
                    }}
                    dismissable={false}
                >
                    <ActivityIndicator
                        animating={true}
                        color={CommonColor.btnSubmit}
                        size={'large'}
                    />
                </Modal>
            </Portal>

            <ScrollView>

                <List.Accordion

                    title="Vocabulary List"
                    titleStyle={{
                        fontWeight: '700'
                    }}

                    style={{
                        margin: 6,
                        backgroundColor: 'white',

                    }}

                >

                    {
                        readingPostVocabulary?.map((e, index) =>
                            <List.Item key={e.ID}
                                title={`${e.name} (${e.word_type})`}
                                titleStyle={{ fontSize: 16, fontWeight: '500' }}
                                description={`${e.phon_us} - ${e.meaning}`}
                                descriptionStyle={{ color: 'red' }}

                            />




                        )
                    }

                </List.Accordion>



                <View
                    style={{
                        backgroundColor: 'white',
                        paddingHorizontal: 12
                    }}
                >




                    <Text
                        style={{
                            fontSize: 18,
                            lineHeight: 52,
                            textAlign: 'justify',
                        }}
                        // suppressHighlighting={true}
                        // selectable={true}
                        allowFontScaling={true}

                    >
                        {
                            (readingPost?.content && readingPost.content || '') &&
                            <Highlighter
                                highlightStyle={{ color: 'red', fontWeight: '700' }}
                                searchWords={highlightVocabulary || []}
                                textToHighlight={readingPost?.content || ''}
                            />

                        }

                    </Text>

                </View>
            </ScrollView>
            <AudioPlay
                onPlay={_onStartPlay}
                onPause={_onPausePlay}
                isPlaying={isPlaying}
                durationTime={duration}
                currentProgress={currentProgress}
            />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 2,
                    position: 'absolute',
                    bottom: 80,
                    right: 0,
                    alignSelf: 'center'
                }}
            >
                {/* <ButtonText
                        label={`Học từ vựng`}
                        labelStyle={{
                            fontWeight: '700'
                        }}
                        onItemPress={_onNavigateToVocabularyPractice}
                    /> */}

                <ButtonText
                    label={`Luyện đọc`}
                    labelStyle={{
                        fontWeight: '700'
                    }}
                    onItemPress={_onNavigateToReadingPractice}
                    rightIcon
                />
            </View>
        </Provider>

    )
}

export default ReadingVocabularyScreen

const styles = StyleSheet.create({})
