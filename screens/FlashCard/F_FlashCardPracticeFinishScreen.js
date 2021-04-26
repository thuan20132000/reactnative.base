import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { useSelector } from 'react-redux';
import Sound from 'react-native-sound';
import CommonColor from '../../utils/CommonColor';
import { getLearntVocabularyByTopic, saveLearntVocabularyByTopic } from '../../utils/helper';

import { InterstitialAd,RewardedAd,RewardedAdEventType, AdEventType, TestIds } from '@react-native-firebase/admob';


import {admob_android_app_id} from '../../config/api_config.json'

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : admob_android_app_id;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords:['education','ielts','toeic','english','tiếng anh','học tiếng anh']
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


        const eventListener = rewarded.onAdEvent((type, error, reward) => {
            if (type === RewardedAdEventType.LOADED) {
                setAdvLoaded(true);
            }
            if (type === RewardedAdEventType.EARNED_REWARD) {
                console.log('User earned reward of ', reward);
              }
        });

        // Start loading the interstitial straight away
        rewarded.load();


        props.navigation.setOptions({
            headerBackTitleVisible:false,
            headerShown:false
        })

        // Unsubscribe from events on unmount
        return () => {
            eventListener();
        };

    }, []);


    const [advClicked, setAdvClicked] = React.useState(false);

    const _onLoadAdv = () => {
        rewarded.show();
        setAdvClicked(true);
    }


    const _onBackHome = async () => {

        //flashcard.topic ==> topic is a slug name already
        let res = await saveLearntVocabularyByTopic(flashcard?.topic, flashcard.learnt_vocabulary_list);
        
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
                onPress={advClicked ? _onBackHome : _onLoadAdv}
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
