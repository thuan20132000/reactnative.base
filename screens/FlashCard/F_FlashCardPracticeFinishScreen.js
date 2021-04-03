import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { useSelector } from 'react-redux';
import Sound from 'react-native-sound';
import CommonColor from '../../utils/CommonColor';
import { getLearntVocabularyByTopic, saveLearntVocabularyByTopic } from '../../utils/helper';


const F_FlashCardPracticeFinishScreen = (props) => {



    const flashcard = useSelector(state => state.flashcard);


    React.useEffect(() => {
        setTimeout(() => {
            var sound = new Sound('congratulation.mp3', Sound.MAIN_BUNDLE, (error) => {
                /* ... */
                if (error) {
                    console.log('error: ', error);
                    sound.release()

                }
            });
            setTimeout(() => {
                sound.play((success) => {
                    /* ... */
                    sound.release();

                });
            }, 100);
        }, 100);

    }, []);



    const _onBackHome = async () => {


        let res = await saveLearntVocabularyByTopic(flashcard.topic, flashcard.learnt_vocabulary_list);

        if(!res){
            console.warn('error: ',res);
            return;
        }
        props.navigation.goBack();

    }

    return (
        <View
            style={[
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: 'white'
                }
            ]}
        >
            <View>
                <Image
                    source={
                        require('../../utils/gif/congratulation.gif')
                    }
                    style={{
                        width: 220,
                        height: 220
                    }}
                />
            </View>
            <Text
                style={{
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: '700',
                    padding: 16
                }}
            >
                Chúc mừng , bạn đã học thêm <Text style={{ color: "red" }}>{flashcard.learnt_vocabulary_list.length} </Text> từ vựng hôm nay.
            </Text>

            <TouchableOpacity
                style={{
                    padding: 12,
                    backgroundColor: CommonColor.primary,
                    paddingHorizontal: 22,
                    borderRadius: 6
                }}
                onPress={_onBackHome}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: 'white'
                    }}
                >
                    Tiếp tục
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default F_FlashCardPracticeFinishScreen

const styles = StyleSheet.create({})
