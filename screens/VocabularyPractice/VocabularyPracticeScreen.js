import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import CardFlip from 'react-native-card-flip';
import { IconButton } from 'react-native-paper';
import { COLORS } from '../../app/constants/themes';
import VocabularyPracticeController from '../../app/controller/VocabularyPractice';
import PracticeVocabularyModel from '../../app/models/PracticeVocabularyModel';
import ButtonText from '../../components/Button/BottonText';
import CommonColor from '../../utils/CommonColor';
import CommonIcons from '../../utils/CommonIcons';
import CardDefinition from '../FlashCard/components/CardDefinition';
import VocabularyCard from '../sharing/VocabularyCard';
import { StackActions, useNavigation, useRoute } from '@react-navigation/core'
import { TouchableOpacity } from 'react-native';
import SpeechToText from '../sharing/SpeechToText'
import { BannerAd, TestIds, BannerAdSize, InterstitialAd, AdEventType } from '@react-native-firebase/admob';
import { config } from '../../app/constants'

const adUnitIdIntertitial = __DEV__ ? TestIds.INTERSTITIAL : config.adbmod_fullpage;
const interstitial = InterstitialAd.createForAdRequest(adUnitIdIntertitial, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'books', 'travel', 'medicine', 'fitness'],
});


const OPTIONS = {
    HARD: 'hard',
    AGAIN: 'again',
    EASY: 'easy'
}

const VocabularyPracticeScreen = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const { data } = route?.params
    const [practiceVocabulary, setPracticeVocabulary] = useState(new PracticeVocabularyModel(null));
    const [isAnswered, setIsAnswered] = useState(false);
    const [currentVocabulary, setCurrentVocabulary] = useState()
    const [vocabularyPosition, setVocabularyPosition] = useState(0)
    const _refCardFlip = useRef();
    const [isDisabled, setIsDisabled] = useState(false)
    const [learningVocabularyNumber, setLearningVocabularyNumber] = useState(0)

    const [vocabularyList, setVocabularyList] = useState(data)
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setPracticeVocabulary(vocabularyList[vocabularyPosition])
        setLearningVocabularyNumber(vocabularyList.length)

        interstitial.load();
        // Adv
        const eventListener = interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
                setLoaded(true);
            }
        });
        // Start loading the interstitial straight away
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            try {
                interstitial.show()
            } catch (error) {
                console.warn('error: adv has not loaded yet')
            }

        });

        // Unsubscribe from events on unmount
        return () => {
            unsubscribe()
            eventListener()

        };
    }, [])


    const _onSelectOptionPress = (option) => {

        try {

            let vocab = new VocabularyPracticeController(practiceVocabulary, vocabularyList)
            switch (option) {
                case OPTIONS.HARD:
                    vocab.handleHardOption()
                    break;
                case OPTIONS.AGAIN:
                    vocab.handleAgainOption()
                    break;
                case OPTIONS.EASY:
                    vocab.handleIgnoreOption()
                    break;

                default:
                    break;
            }
            setVocabularyList(vocab.getVocabularyList())

            _refCardFlip.current.flip()
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    setIsAnswered(false)
                    resolve();
                }, 500);
            }).then(() => {
                if (vocab.getNextVocabulary()) {
                    setPracticeVocabulary(vocab.getNextVocabulary())
                    setLearningVocabularyNumber(vocab.getLearningVocabularyNumber())
                } else {
                    navigation.goBack()
                }

            })

        } catch (error) {
            console.log(error)
        }

    }

    const _onShowAnswerPress = () => {
        if (vocabularyPosition >= vocabularyList.length - 1) {
            setIsAnswered(true)
            return
        }
        _refCardFlip.current.flip()
        setIsAnswered(true)
    }

    const _onShowWebView = () => {

        let countWord = practiceVocabulary?.name?.trim().split(' ')
        let word
        if (countWord.length > 1) {
            word = practiceVocabulary.name?.toLowerCase().replace(' ', '-')
        } else {
            word = practiceVocabulary.name?.toLowerCase()
        }

        navigation.navigate('Webview', {
            url: `https://www.oxfordlearnersdictionaries.com/definition/english/${word}`
        })
    }

    return (
        <View
            style={{ flex: 1 }}
        >
            <View
                style={{
                    display: 'flex',
                    alignSelf: 'center',
                }}
            >
                <BannerAd
                    unitId={__DEV__ ? TestIds.BANNER : config.adbmod_banner}
                    size={BannerAdSize.BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </View>
            <ScrollView>
                {/* <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text>{learningVocabularyNumber}</Text>
                    <TouchableOpacity
                        onPress={_onShowWebView}
                    >
                        <Text style={{ fontSize: 24 }}>Web</Text>
                    </TouchableOpacity>
                </View> */}
                <View>
                    <CardFlip
                        ref={_refCardFlip}
                        style={{
                            height: 220
                        }}
                    >
                        <VocabularyCard

                            title={practiceVocabulary?.name}
                            wordTypes={practiceVocabulary?.word_type?.toLowerCase()}
                            example={practiceVocabulary?.example}
                            isAnswered={isAnswered}
                            onFlipPress={() => _refCardFlip.current.flip()}
                            onSearch={_onShowWebView}

                        />

                        <VocabularyCard

                            title={practiceVocabulary?.native_name}
                            isAnswered={isAnswered}
                            onFlipPress={() => _refCardFlip.current.flip()}

                        />
                    </CardFlip>

                </View>

                {
                    !isAnswered &&
                    <View>
                        <ButtonText
                            label={'Show Answer'}
                            containerStyle={styles.buttonCreate}
                            labelStyle={{
                                color: COLORS.secondary,
                                fontSize: 16,
                                fontWeight: '700'
                            }}
                            onItemPress={_onShowAnswerPress}
                        />
                    </View>

                }


                {
                    isAnswered &&

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ButtonText
                            label={'Hard'}
                            descriptions={'< 2 Minutes'}
                            containerStyle={styles.buttonCreate}
                            labelStyle={{
                                color: COLORS.secondary,
                                fontSize: 16,
                                fontWeight: '700'
                            }}
                            onItemPress={() => _onSelectOptionPress(OPTIONS.HARD)}
                        />
                        <ButtonText
                            label={'Again'}
                            descriptions={'< 6 Minutes'}
                            containerStyle={styles.buttonCreate}
                            labelStyle={{
                                color: COLORS.secondary,
                                fontSize: 16,
                                fontWeight: '700'
                            }}
                            onItemPress={() => _onSelectOptionPress(OPTIONS.AGAIN)}

                        />
                        <ButtonText
                            label={'Easy'}
                            containerStyle={styles.buttonCreate}
                            labelStyle={{
                                color: COLORS.secondary,
                                fontSize: 16,
                                fontWeight: '700'
                            }}
                            onItemPress={() => _onSelectOptionPress(OPTIONS.EASY)}

                        />
                    </View>
                }

                <SpeechToText disabled={true} />
            </ScrollView>

        </View>
    )
}

export default VocabularyPracticeScreen

const styles = StyleSheet.create({
    buttonCreate: {
        backgroundColor: 'white',
        borderWidth: 0.6,
        borderColor: COLORS.secondary,
        marginBottom: 32,
        minHeight: 60,
        flex: 1
    }
})
