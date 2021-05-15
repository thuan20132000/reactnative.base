import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ButtonText from '../../components/Button/BottonText';
import CommonIcons from '../../utils/CommonIcons';
import * as readingActions from '../../store/actions/readingActions';
import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';

import { adbmod_android_app_id } from '../../config/api_config.json';


const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : adbmod_android_app_id;

const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-7783640686150605/2202116538', {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['education', 'ielts', 'toeic', 'english', 'tiếng anh', 'học tiếng anh']
});

const ReadingVocabularyPracticeFinishScreen = (props) => {
    const dispatch = useDispatch();
    const [advLoaded, setAdvLoaded] = useState(false);
    const [advClicked, setAdvClicked] = useState(false);
    const { learnt_vocabulary_list } = props.route?.params;

    React.useEffect(() => {
        dispatch(readingActions.resetLearnVocabularyList());

        const eventListener = interstitial.onAdEvent(type => {
            // if (type === AdEventType.LOADED) {
            //     setAdvLoaded(true);
            // }
            if (type === AdEventType.LOADED) {
                console.log('InterstitialAd adLoaded');
                setAdvLoaded(true);
            } else if (type === AdEventType.ERROR) {
                console.log('InterstitialAd => Error');
            } else if (type === AdEventType.OPENED) {
                console.log('InterstitialAd => adOpened');
            } else if (type === AdEventType.CLICKED) {
                console.log('InterstitialAd => adClicked');
            } else if (type === AdEventType.LEFT_APPLICATION) {
                console.log('InterstitialAd => adLeft_App');
            } else if (type === AdEventType.CLOSED) {
                console.log('InterstitialAd => adClosed');
                interstitial.load();
            }
        });

        // Start loading the interstitial straight away
        interstitial.load();

        // Unsubscribe from events on unmount
        return () => {
            eventListener();
        };
    }, []);

    // No advert ready to show yet


    const _onNextPress = () => {

        // setTimeout(() => {
        props.navigation.goBack();

        // }, 5000);
    }

    const _onLoadAdv = () => {
        try {
            if (interstitial.loaded) {
                interstitial.show();
                setAdvClicked(true);
            }
        } catch (error) {
            console.log("ERROR: ", error);
        }
    }
    // No advert ready to show yet

    return (
        <View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image
                    source={
                        require('../../utils/gif/congratulation.gif')
                    }
                    style={{
                        width: 220,
                        height: 220
                    }}
                    resizeMode={'contain'}
                />

                <Text
                    style={{
                        fontSize: 14,
                        textAlign: 'center',
                        fontWeight: '700',
                    }}
                >
                    Chúc mừng , bạn đã học thêm <Text style={{ color: "red" }}>{learnt_vocabulary_list?.length} </Text> từ vựng.
            </Text>
                <Text
                    style={{
                        fontSize: 14,
                        textAlign: 'center',
                        fontWeight: '700',
                    }}
                >
                    Tiếp tục luyện đọc nhé.
            </Text>


                <ButtonText
                    label={'Luyện đọc'}
                    labelStyle={{ fontWeight: '700' }}

                    onItemPress={advClicked ? _onNextPress : _onLoadAdv}
                />
            </View>


            <ScrollView>

                {
                    learnt_vocabulary_list?.map((e, index) =>
                        <List.Item key={e.ID}

                            left={props => <List.Icon {...props} icon={CommonIcons.checkboxCircleMark} color={'green'} />}
                            title={`${e.name} (${e.word_type})`}
                            titleStyle={{ fontSize: 16, fontWeight: '500' }}
                            description={`${e.phon_us} - ${e.meaning}`}
                            descriptionStyle={{ color: 'red' }}

                        />




                    )
                }

            </ScrollView>

        </View>
    )
}

export default ReadingVocabularyPracticeFinishScreen

const styles = StyleSheet.create({})
