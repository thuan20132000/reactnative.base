import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { useSelector } from 'react-redux';
import Sound from 'react-native-sound';
import CommonColor from '../../utils/CommonColor';
import { getLearntVocabularyByTopic, saveLearntVocabularyByTopic } from '../../utils/helper';

import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';


import config from '../../app/constants/config';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : config.adbmod_android_fullpage;


const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

const F_FlashCardPracticeFinishScreen = (props) => {



    const flashcard = useSelector(state => state.flashcard);
    const [advLoaded, setAdvLoaded] = React.useState(false);


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



        const eventListener = interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
                setAdvLoaded(true);
            }
        });

        // Start loading the interstitial straight away
        const unsubscribe = props.navigation.addListener('beforeRemove', () => {
            interstitial.show()
        });


        // Start loading the interstitial straight away
        interstitial.load();




        props.navigation.setOptions({
            headerBackTitleVisible: false,
            headerShown: false
        })

        // Unsubscribe from events on unmount
        return () => {
            eventListener();
            unsubscribe();
        };

    }, []);





    const _onBackHome = async () => {

        //flashcard.topic ==> topic is a slug name already
        let res = await saveLearntVocabularyByTopic(flashcard?.topic, flashcard.learnt_vocabulary_list);

        if (!res) {
            console.warn('error: ', res);
            return;
        }
        props.navigation.goBack();

    }



    if (!advLoaded) {
        return <View />;
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
