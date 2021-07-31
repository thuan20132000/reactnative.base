import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CommonColor from '../../../utils/CommonColor'

import CommonImages from '../../../utils/CommonImages'
import { filterDuplicate, getLearntVocabularyByTopic } from '../../../utils/helper'
import { useSelector } from 'react-redux';
import { config } from '../../../app/constants'
import { IconButton } from 'react-native-paper'
import Quiz from '../../../app/DB/Quiz'


const CardTopic = ({
    onPress,
    image_path,
    topic_vocabulary_number,
    topic
}) => {

    const flashcard = useSelector(state => state.flashcard);
    const [learntVocabularyList, setLearntVocabularyList] = React.useState([]);
    const [leaveVocabularyList, setLeaveVocabularyList] = React.useState(0);
    const [vocabularyTotal, setVocabularyTotal] = React.useState(0);
    const [imagePath, setImagePath] = React.useState('');
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


    React.useEffect(() => {
        Quiz.getTopicVocabularyTotal(topic?.id)
            .then((res) => {
                setVocabularyTotal(res);

            })
        setImagePath(config.aws_url + image_path)
    }, []);



    return (
        <TouchableOpacity
            style={[
                styles.container,
            ]}

            onPress={onPress}


        >
            <Image
                source={{
                    uri: imagePath
                }}

                style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40
                }}

            />
            <View
                style={[
                    styles.column,
                    {
                        justifyContent: 'center',
                        marginHorizontal: 22
                    }
                ]}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: 'dodgerblue'
                    }}
                >
                    {topic?.name}
                </Text>
                <Text
                    style={{
                        color: 'red',
                        fontSize: 16,
                        fontWeight: '700',
                    }}
                >
                    {learntVocabularyList.length}/{vocabularyTotal}
                </Text>

            </View>
        </TouchableOpacity>
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
