import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { List } from 'react-native-paper';
import Highlighter from 'react-native-highlight-words';
import ButtonText from '../../components/Button/BottonText';
import AudioPlay from '../../components/Card/AudioPlay';
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption } from 'react-native-audio-recorder-player';
import { millisToMinutesAndSeconds } from '../../utils/helper';

import * as readingActions from '../../store/actions/readingActions';
import { useDispatch } from 'react-redux';


const audioRecorderPlayer = new AudioRecorderPlayer();

const ReadingVocabularyScreen = (props) => {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);
    const { readingpost } = props.route?.params;


    let data = [
        {
            "ID": "74c35223-549f-47f6-96a3-bf452673c0b8",
            "name": "bookshop",
            "word_type": "noun",
            "phon_us": "/ˈbʊkʃɑːp/",
            "phon_uk": "/ˈbʊkʃɒp/",
            "sound_us": "/media/audio/bookshop%2Bnoun%2Bus.mp3",
            "sound_uk": "/media/audio/bookshop%2Bnoun%2Buk.mp3",
            "meaning": null,
            "definition": "a shop that sells books",
            "example": "I asked the bookshop to order several titles which were not in stock.",
            "status": "published",
            "created_at": "2021-04-13T22:32:12.393965+07:00",
            "updated_at": "2021-04-13T22:32:12.394121+07:00",
            "topics": [
                {
                    "id": 25,
                    "name": "Place: Buildings",
                    "slug": "place-buildings",
                    "image": "/media/upload/flashcard/cartoon-transportation-collection-vector-5097879_5w7NPHT.jpeg",
                    "status": "published",
                    "created_at": "2021-04-13T22:30:36.092026+07:00",
                    "updated_at": "2021-04-13T22:30:36.092047+07:00",
                    "field": {
                        "id": 4,
                        "name": "1000 TỪ VỰNG THƯỜNG DÙNG",
                        "slug": "1000-t-vng-thng-dung",
                        "image": "/media/upload/flashcard/download_2.jpeg",
                        "status": "published",
                        "created_at": "2021-04-11T20:54:24.410958+07:00",
                        "updated_at": "2021-04-11T20:54:24.410978+07:00"
                    }
                }
            ]
        },
        {
            "ID": "c735b5ae-48a2-49a7-96e1-114557a31475",
            "name": "building",
            "word_type": "noun",
            "phon_us": "/ˈbɪldɪŋ/",
            "phon_uk": "/ˈbɪldɪŋ/",
            "sound_us": "/media/audio/building%2Bnoun%2Bus.mp3",
            "sound_uk": "/media/audio/building%2Bnoun%2Buk.mp3",
            "meaning": null,
            "definition": "a structure such as a house or school that has a roof and walls",
            "example": "a tall/high-rise/ten-storey building",
            "status": "published",
            "created_at": "2021-04-13T22:32:15.949058+07:00",
            "updated_at": "2021-04-13T22:32:15.949080+07:00",
            "topics": [
                {
                    "id": 25,
                    "name": "Place: Buildings",
                    "slug": "place-buildings",
                    "image": "/media/upload/flashcard/cartoon-transportation-collection-vector-5097879_5w7NPHT.jpeg",
                    "status": "published",
                    "created_at": "2021-04-13T22:30:36.092026+07:00",
                    "updated_at": "2021-04-13T22:30:36.092047+07:00",
                    "field": {
                        "id": 4,
                        "name": "1000 TỪ VỰNG THƯỜNG DÙNG",
                        "slug": "1000-t-vng-thng-dung",
                        "image": "/media/upload/flashcard/download_2.jpeg",
                        "status": "published",
                        "created_at": "2021-04-11T20:54:24.410958+07:00",
                        "updated_at": "2021-04-11T20:54:24.410978+07:00"
                    }
                }
            ]
        },
        {
            "ID": "de9aa498-cc03-491a-9833-5969e7d2a7d3",
            "name": "apartment",
            "word_type": "noun",
            "phon_us": "/əˈpɑːrtmənt/",
            "phon_uk": "/əˈpɑːtmənt/",
            "sound_us": "/media/audio/apartment%2Bnoun%2Bus.mp3",
            "sound_uk": "/media/audio/apartment%2Bnoun%2Buk.mp3",
            "meaning": null,
            "definition": "a set of rooms for living in, usually on one floor of a building",
            "example": "an apartment building",
            "status": "published",
            "created_at": "2021-04-13T22:32:17.073864+07:00",
            "updated_at": "2021-04-13T22:32:17.073888+07:00",
            "topics": [
                {
                    "id": 25,
                    "name": "Place: Buildings",
                    "slug": "place-buildings",
                    "image": "/media/upload/flashcard/cartoon-transportation-collection-vector-5097879_5w7NPHT.jpeg",
                    "status": "published",
                    "created_at": "2021-04-13T22:30:36.092026+07:00",
                    "updated_at": "2021-04-13T22:30:36.092047+07:00",
                    "field": {
                        "id": 4,
                        "name": "1000 TỪ VỰNG THƯỜNG DÙNG",
                        "slug": "1000-t-vng-thng-dung",
                        "image": "/media/upload/flashcard/download_2.jpeg",
                        "status": "published",
                        "created_at": "2021-04-11T20:54:24.410958+07:00",
                        "updated_at": "2021-04-11T20:54:24.410978+07:00"
                    }
                }
            ]
        },
        {
            "ID": "ac0d6f14-6c72-4754-b62e-602c9298664d",
            "name": "block",
            "word_type": "noun",
            "phon_us": "/blɑːk/",
            "phon_uk": "/blɒk/",
            "sound_us": "/media/audio/block%2Bnoun%2Bus.mp3",
            "sound_uk": "/media/audio/block%2Bnoun%2Buk.mp3",
            "meaning": null,
            "definition": "a large piece of a solid material that is square or rectangular in shape and usually has flat sides",
            "example": "The houses are made of concrete blocks with tin roofs.",
            "status": "published",
            "created_at": "2021-04-13T22:32:21.094201+07:00",
            "updated_at": "2021-04-13T22:32:21.094226+07:00",
            "topics": [
                {
                    "id": 25,
                    "name": "Place: Buildings",
                    "slug": "place-buildings",
                    "image": "/media/upload/flashcard/cartoon-transportation-collection-vector-5097879_5w7NPHT.jpeg",
                    "status": "published",
                    "created_at": "2021-04-13T22:30:36.092026+07:00",
                    "updated_at": "2021-04-13T22:30:36.092047+07:00",
                    "field": {
                        "id": 4,
                        "name": "1000 TỪ VỰNG THƯỜNG DÙNG",
                        "slug": "1000-t-vng-thng-dung",
                        "image": "/media/upload/flashcard/download_2.jpeg",
                        "status": "published",
                        "created_at": "2021-04-11T20:54:24.410958+07:00",
                        "updated_at": "2021-04-11T20:54:24.410978+07:00"
                    }
                }
            ]
        },
    ]

    let sample_data = [
        {
            "ID": "75d22bec-282d-4126-9aa7-890ca1f7e678",
            "name": "contain",
            "word_type": "verb",
            "phon_us": "/kənˈteɪn/",
            "phon_uk": "/kənˈteɪn/",
            "sound_us": "/media/audio/contain%2Bverb%2Bus.mp3",
            "sound_uk": "/media/audio/contain%2Bverb%2Buk.mp3",
            "meaning": null,
            "definition": "if something contains something else, it has that thing inside it or as part of it",
            "example": "This drink doesn't contain any alcohol.",
            "status": "published",
            "created_at": "2021-04-15T23:46:07.926580+07:00",
            "updated_at": "2021-04-15T23:46:07.926603+07:00",
            "topics": [
                {
                    "id": 45,
                    "name": "Body and Lifestyle",
                    "slug": "body-and-lifestyle",
                    "image": "/media/upload/flashcard/domestic-appliances-icons-set-cartoon-style-vector-17227915_MSg5Zf9.jpeg",
                    "status": "published",
                    "created_at": "2021-04-15T23:44:43.620845+07:00",
                    "updated_at": "2021-04-15T23:44:43.620867+07:00",
                    "field": {
                        "id": 1,
                        "name": "IELTS",
                        "slug": "ielts",
                        "image": "/media/upload/flashcard/download_2.png",
                        "status": "published",
                        "created_at": "2021-04-11T20:26:05.176014+07:00",
                        "updated_at": "2021-04-11T20:26:05.176038+07:00"
                    }
                }
            ]
        },
        {
            "ID": "9843ed70-b7c0-4004-aa9d-4b522366f77f",
            "name": "breathe",
            "word_type": "verb",
            "phon_us": "/briːð/",
            "phon_uk": "/briːð/",
            "sound_us": "/media/audio/breathe%2Bverb%2Bus.mp3",
            "sound_uk": "/media/audio/breathe%2Bverb%2Buk.mp3",
            "meaning": null,
            "definition": "to take air into your lungs and send it out again through your nose or mouth",
            "example": "He breathed deeply before speaking again.",
            "status": "published",
            "created_at": "2021-04-15T23:46:06.716933+07:00",
            "updated_at": "2021-04-15T23:46:06.716960+07:00",
            "topics": [
                {
                    "id": 45,
                    "name": "Body and Lifestyle",
                    "slug": "body-and-lifestyle",
                    "image": "/media/upload/flashcard/domestic-appliances-icons-set-cartoon-style-vector-17227915_MSg5Zf9.jpeg",
                    "status": "published",
                    "created_at": "2021-04-15T23:44:43.620845+07:00",
                    "updated_at": "2021-04-15T23:44:43.620867+07:00",
                    "field": {
                        "id": 1,
                        "name": "IELTS",
                        "slug": "ielts",
                        "image": "/media/upload/flashcard/download_2.png",
                        "status": "published",
                        "created_at": "2021-04-11T20:26:05.176014+07:00",
                        "updated_at": "2021-04-11T20:26:05.176038+07:00"
                    }
                }
            ]
        },
        {
            "ID": "d94a0402-25b3-42cf-ac47-f8b798408cfd",
            "name": "balance",
            "word_type": "noun",
            "phon_us": "/ˈbæləns/",
            "phon_uk": "/ˈbæləns/",
            "sound_us": "/media/audio/balance%2Bnoun%2Bus.mp3",
            "sound_uk": "/media/audio/balance%2Bnoun%2Buk.mp3",
            "meaning": null,
            "definition": "a situation in which different things exist in equal, correct or good amounts",
            "example": "This newspaper maintains a good balance in its presentation of different opinions.",
            "status": "published",
            "created_at": "2021-04-15T23:45:59.385800+07:00",
            "updated_at": "2021-04-15T23:45:59.385823+07:00",
            "topics": [
                {
                    "id": 45,
                    "name": "Body and Lifestyle",
                    "slug": "body-and-lifestyle",
                    "image": "/media/upload/flashcard/domestic-appliances-icons-set-cartoon-style-vector-17227915_MSg5Zf9.jpeg",
                    "status": "published",
                    "created_at": "2021-04-15T23:44:43.620845+07:00",
                    "updated_at": "2021-04-15T23:44:43.620867+07:00",
                    "field": {
                        "id": 1,
                        "name": "IELTS",
                        "slug": "ielts",
                        "image": "/media/upload/flashcard/download_2.png",
                        "status": "published",
                        "created_at": "2021-04-11T20:26:05.176014+07:00",
                        "updated_at": "2021-04-11T20:26:05.176038+07:00"
                    }
                }
            ]
        },
        {
            "ID": "9ae37a8d-9b92-49d8-958f-a6a8dd49c58b",
            "name": "benefit",
            "word_type": "noun",
            "phon_us": "/ˈbenɪfɪt/",
            "phon_uk": "/ˈbenɪfɪt/",
            "sound_us": "/media/audio/benefit%2Bnoun%2Bus.mp3",
            "sound_uk": "/media/audio/benefit%2Bnoun%2Buk.mp3",
            "meaning": null,
            "definition": "an advantage that something gives you; a helpful and useful effect that something has",
            "example": "Freedom of information brings great benefits. ",
            "status": "published",
            "created_at": "2021-04-15T23:45:57.542893+07:00",
            "updated_at": "2021-04-15T23:45:57.542925+07:00",
            "topics": [
                {
                    "id": 45,
                    "name": "Body and Lifestyle",
                    "slug": "body-and-lifestyle",
                    "image": "/media/upload/flashcard/domestic-appliances-icons-set-cartoon-style-vector-17227915_MSg5Zf9.jpeg",
                    "status": "published",
                    "created_at": "2021-04-15T23:44:43.620845+07:00",
                    "updated_at": "2021-04-15T23:44:43.620867+07:00",
                    "field": {
                        "id": 1,
                        "name": "IELTS",
                        "slug": "ielts",
                        "image": "/media/upload/flashcard/download_2.png",
                        "status": "published",
                        "created_at": "2021-04-11T20:26:05.176014+07:00",
                        "updated_at": "2021-04-11T20:26:05.176038+07:00"
                    }
                }
            ]
        }
    ]

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [duration, setDuration] = React.useState();
    const [currentProgress, setCurrentProgress] = React.useState(0);
    const _onStartPlay = async () => {
        setIsPlaying(true);
        try {


            let e = await audioRecorderPlayer.startPlayer('https://www.eslfast.com/kidsenglish/audio/ke002op.mp3');

            console.log('ee: ', audioRecorderPlayer.le);

            await audioRecorderPlayer.setVolume(1.0);
            audioRecorderPlayer.addPlayBackListener((e) => {
                // console.log(e.current_position);

                let leave_time = e.duration - e.current_position;
                let xx = millisToMinutesAndSeconds(leave_time);
                // setCurrentProgress(1/Number(leave_time));
                let progress = e.current_position / e.duration;
                // console.log()
                console.log('progress: ', progress);
                setCurrentProgress(progress);

                setDuration(xx);
                // console.log('playing...', xx);


                if (e.current_position >= e.duration) {

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
                    // audioRecorderPlayer.removePlayBackListener()
                    // return;
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
        console.log('starting : ')
        return () => {
            audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener();
            audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();
        }

    }, []);



    const _onNavigateToVocabularyPractice = () => {
        dispatch(readingActions.setReadingVocabularyList(data, sample_data))

        props.navigation.navigate('ReadingVocabularyPractice', {
            readingpost: readingpost
        });
    }

    const _onNavigateToReadingPractice = () => {
        props.navigation.navigate('ReadingPractice', {
            readingpost: readingpost
        });
    }


    return (
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
                    data.map((e, index) =>
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
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 2
                }}
            >
                <ButtonText
                    label={`Học từ vựng`}
                    labelStyle={{
                        fontWeight: '700'
                    }}
                    onItemPress={_onNavigateToVocabularyPractice}
                />
                <ButtonText
                    label={`Luyện đọc`}
                    labelStyle={{
                        fontWeight: '700'
                    }}
                    onItemPress={_onNavigateToReadingPractice}
                />
            </View>

            <View
                style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 12
                }}
            >

                <AudioPlay
                    onPlay={_onStartPlay}
                    onPause={_onPausePlay}
                    isPlaying={isPlaying}
                    durationTime={duration}
                    currentProgress={currentProgress}
                />


                <Text
                    style={{
                        fontSize: 16,
                        lineHeight: 52,
                        textAlign: 'justify',
                    }}
                    // suppressHighlighting={true}
                    // selectable={true}
                    allowFontScaling={true}

                >
                    <Highlighter
                        highlightStyle={{ backgroundColor: 'yellow' }}
                        searchWords={['everywhere', 'unattractive', 'action', 'lottery']}
                        textToHighlight={readingpost.content}
                    />

                </Text>

            </View>
        </ScrollView>
    )
}

export default ReadingVocabularyScreen

const styles = StyleSheet.create({})
