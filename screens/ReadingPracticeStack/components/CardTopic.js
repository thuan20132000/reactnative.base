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
    image_path,
    topic_vocabulary_number,
    topic
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
                marginHorizontal:6
            }}
        >

            <Card.Cover
                source={{ uri: 'https://picsum.photos/700' }}
                style={{
                    width: 320,
                    height: 120
                }}
            />
            <Card.Content>
                <Title>Card title</Title>
                <Paragraph
                    numberOfLines={3}
                >
                    In the United States, 43 states, Washington D.C., Puerto Rico, and the U.S. Virgin Islands, all have their own lottery. A lottery is used for states to raise money. Licensed stores sell numbered tickets, or people can pay to choose their own numbers. When you let a machine pick your numbers, it is usually called a Quick Pick. Many people play lucky numbers, numbers associated with birthdates or other important numbers to them. The money earned from selling lottery tickets goes to pay for schools, roads, bridges, and other public services. Once a week or more, a drawing is held where the numbers are randomly picked. If your ticket has those numbers, you could win a cash prize.
                </Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button
                    onPress={onPress}
                >
                    READ MORE
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
