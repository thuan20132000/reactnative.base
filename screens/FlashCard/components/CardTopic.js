import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CommonColor from '../../../utils/CommonColor'

import CommonImages from '../../../utils/CommonImages'
import { url_absolute } from '../../../config/api_config.json'
import { filterDuplicate, getLearntVocabularyByTopic } from '../../../utils/helper'
import { useSelector } from 'react-redux';

const CardTopic = ({
    onPress,
    title,
    image_path,
    topic_vocabulary_number
}) => {

    const flashcard = useSelector(state => state.flashcard);

    const [learntVocabulary, setLearntVocabulary] = React.useState(0);

    React.useEffect(() => {
        let topic_name = title.toLowerCase();
        getLearntVocabularyByTopic(topic_name).then(value => {

            console.warn(value);
            let set = new Set();


            // console.warn('set: ',deduplicate)
            if (value) {
                setLearntVocabulary(value.length);
                // value.forEach(element => {
                //     set.add(element);
                // });
                filterDuplicate(value).then(value => setLearntVocabulary(value.length));
            }

            


        });
    }, [flashcard.learnt_vocabulary_list]);
    return (
        <TouchableOpacity
            style={[
                styles.container
            ]}
            onPress={onPress}
        >
            <Image

                source={{
                    uri: image_path ? `${url_absolute}/${image_path}` : CommonImages.avatar
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
                    {title}
                </Text>
                <Text
                    style={{
                        color: CommonColor.primary,
                        fontSize: 16,
                    }}
                >
                    {learntVocabulary}/{topic_vocabulary_number}
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
        marginVertical: 4

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
