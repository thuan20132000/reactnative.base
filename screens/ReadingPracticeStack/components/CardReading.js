import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CommonColor from '../../../utils/CommonColor'

import CommonImages from '../../../utils/CommonImages'
import { url_absolute } from '../../../config/api_config.json'
import { filterDuplicate, getLearntVocabularyByTopic } from '../../../utils/helper'
import { useSelector } from 'react-redux';
import { getTopicVocabulary } from '../../../utils/api_v1'
import * as flashcardAction from '../../../store/actions/flashcardActions';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { config } from '../../../app/constants'


const CardReading = ({
    onPress,
    topic_vocabulary_number,
    topic,
    onVocabularyPress,
    onPracticePress,
    summary,
    title,
    image_path,

}) => {




    const image_url = image_path?`${config.api_url}${image_path}`:'https://picsum.photos/700';

    return (
        <Card
            style={{
                display: 'flex',
                alignItems: 'center',
                marginVertical: 6,
                marginHorizontal: 6,
                justifyContent: 'center',
                overflow:'hidden'
            }}
        >

            <Image
             
                source={{
                    uri:image_url
                }}
                style={{
                    width: deviceWidth,
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
                    style={{
                        padding:8,
                        minWidth:120
                    }}
                >
                    Nghe
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
const deviceWidth = Dimensions.get('screen').width;

export default CardReading

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
