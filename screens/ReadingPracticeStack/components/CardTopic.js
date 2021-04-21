import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CommonColor from '../../../utils/CommonColor'

import CommonImages from '../../../utils/CommonImages'
import { url_absolute } from '../../../config/api_config.json'
import { filterDuplicate, getLearntVocabularyByTopic } from '../../../utils/helper'
import { useSelector } from 'react-redux';
import { getTopicVocabulary } from '../../../utils/api_v1'
import * as flashcardAction from '../../../store/actions/flashcardActions';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


const CardTopic = ({
    onPress,
    topic_vocabulary_number,
    topic,
    onVocabularyPress,
    onPracticePress,
    summary,
    title,
    image_path,

}) => {

    const flashcard = useSelector(state => state.flashcard);
    const [learntVocabularyList, setLearntVocabularyList] = React.useState([]);
    const [leaveVocabularyList, setLeaveVocabularyList] = React.useState(0);


    React.useEffect(() => {
        let topic_name = topic?.slug?.toLowerCase();
        getLearntVocabularyByTopic(topic_name).then(value => {
            if (value) {
                // setLearntVocabulary(value.length);
                // filterDuplicate(value).then(value => console.warn('filterd: ',value.length));
                setLearntVocabularyList(value);
            }
        });


    }, [flashcard.learnt_vocabulary_list]);



    return (
        <Card
            style={{
                display: 'flex',
                alignItems: 'center',
                marginVertical: 6,
                marginHorizontal: 6,
                justifyContent: 'center'
            }}
        >

            <Image
                source={{ uri: 'https://picsum.photos/700' }}
                style={{
                    width: 320,
                    height: 120,
                    alignSelf:'center'
                }}
            />
            <Card.Content>
                <Title 
                    numberOfLines={2}
                > {title}</Title>
                <Paragraph
                    numberOfLines={3}
                >
                    {summary}
                </Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button
                    onPress={onVocabularyPress}
                >
                    Học từ vựng
                </Button>
                <Button
                    onPress={onPracticePress}
                >
                    Luyện đọc
                </Button>
            </Card.Actions>
        </Card>
    )
}

export default CardTopic

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        backgroundColor: 'white',
        marginHorizontal: 8,
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 2,
        paddingVertical: 6,
        paddingHorizontal: 6,
        borderRadius: 6

    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    }
})
