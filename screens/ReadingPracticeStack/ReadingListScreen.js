import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CardTopic from './components/CardTopic'
import * as readingActions from '../../store/actions/readingActions';
import { useDispatch } from 'react-redux';

const ReadingListScreen = (props) => {

    const dispatch = useDispatch();


    const _onNavigateToDetail = () => {
        props.navigation.navigate('ReadingPractice');
    }

    let data = [
        {
            "ID": "a9a502f3-9957-48b4-90b9-f20d71d80c64",
            "name": "sensitive",
            "word_type": "adjective",
            "phon_us": "/ˈsensətɪv/",
            "phon_uk": "/ˈsensətɪv/",
            "sound_us": "/media/audio/sensitive%2Badjective%2Bus.mp3",
            "sound_uk": "/media/audio/sensitive%2Badjective%2Buk.mp3",
            "meaning": null,
            "definition": "aware of and able to understand other people and their feelings",
            "example": "a sensitive and caring man",
            "status": "published",
            "created_at": "2021-04-15T23:56:59.175764+07:00",
            "updated_at": "2021-04-15T23:56:59.175790+07:00",
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
            "ID": "b9bf5846-6669-4cd3-99fe-8d4c4f7b412c",
            "name": "sensible",
            "word_type": "adjective",
            "phon_us": "/ˈsensəbl/",
            "phon_uk": "/ˈsensəbl/",
            "sound_us": "/media/audio/sensible%2Badjective%2Bus.mp3",
            "sound_uk": "/media/audio/sensible%2Badjective%2Buk.mp3",
            "meaning": null,
            "definition": "able to make good judgements based on reason and experience rather than emotion; practical",
            "example": "She's a sensible sort of person.",
            "status": "published",
            "created_at": "2021-04-15T23:56:20.164918+07:00",
            "updated_at": "2021-04-15T23:56:20.164939+07:00",
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
            "ID": "d38feaa9-b57f-44fa-9487-79cdaeba6b7a",
            "name": "medicine",
            "word_type": "noun",
            "phon_us": "/ˈmedɪsn/",
            "phon_uk": "/ˈmedsn/",
            "sound_us": "/media/audio/medicine%2Bnoun%2Bus.mp3",
            "sound_uk": "/media/audio/medicine%2Bnoun%2Buk.mp3",
            "meaning": null,
            "definition": "the study and treatment of diseases and injuries",
            "example": "advances in modern medicine",
            "status": "published",
            "created_at": "2021-04-15T23:55:56.891422+07:00",
            "updated_at": "2021-04-15T23:55:56.891444+07:00",
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

    const _onNavigateToReadingVocabulary = () => {


        dispatch(readingActions.setReadingVocabularyList(data,sample_data))

        props.navigation.navigate('ReadingVocabularyPractice');

    }

    return (
        <ScrollView>
            <Text></Text>

            {
                Array(10).fill({}).map((e, index) =>
                    <CardTopic
                        key={index.toString()}
                        onPracticePress={() => _onNavigateToDetail()}
                        onVocabularyPress={() => _onNavigateToReadingVocabulary()}

                    />
                )
            }

        </ScrollView>
    )
}

export default ReadingListScreen

const styles = StyleSheet.create({})
