import React, { useRef, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Searchbar, IconButton } from 'react-native-paper'
import { searchVocabulary } from '../../utils/api_v1';
import CommonColor from '../../utils/CommonColor';
import CommonIcons from '../../utils/CommonIcons';
import SearchItem from './components/SearchItem';
import Sound from 'react-native-sound';

import { url_absolute } from '../../config/api_config.json';
import { getNearestSearchVocabulary, saveSearchedVocabulary } from '../../utils/helper';
import CardDefinition from './components/CardDefinition';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import {  BannerAd, TestIds, BannerAdSize, Rewa, AdEventType } from '@react-native-firebase/admob';

import {adbmod_android_app_id} from '../../config/api_config.json';

const adUnitId = __DEV__ ? TestIds.BANNER : adbmod_android_app_id;




const D_HomeSearchScreen = (props) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const typingTimeoutRef = useRef(null);
    const [searchData, setSearchData] = useState(null);
    const _refCardFlip = useRef();

    // console.warn(interstitial.show())
    const [nearestVocabulary, setNearestVocabulary] = useState();




    const _onNavigateWordDefinition = async (e) => {
        await saveSearchedVocabulary(e);
        props.navigation.navigate('VocabularyDefinition', {
            vocabulary: e
        })
    }

    const _onSearchVocabulary = async (text) => {
        let searchData = await searchVocabulary(text);
        // console.log('searchData: ', searchData);
        setSearchData(searchData.data);
    }

    const _onInputSearchText = async (text) => {
        setSearchQuery(text);
        const value = text.toLowerCase();

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            if (value) {
                _onSearchVocabulary(value);
            } else {
                setSearchData(null);
            }
        }, 300);
    }


    const _onPlayVocabularySound = async (sound_name) => {
        // console.warn(sound_name);
        let path = `${url_absolute}${sound_name}`;
        setTimeout(() => {
            var sound = new Sound(path, '', (error) => {
                /* ... */
                if (error) {
                    console.log('error: ', error);
                    return;

                }
                sound.play((success) => console.log('play success'));
            });

            setTimeout(() => {
                sound.release();
            }, 4200);

        }, 100);
    }


    React.useEffect(() => {




        const unsubscribe = props.navigation.addListener('focus', () => {
            getNearestSearchVocabulary()
                .then((data) => {
                    if (data) {
                        if (data.ID) {
                            setNearestVocabulary(data);
                        }
                    }
                });
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;


    }, [props.navigation]);





    const navigation = useNavigation();

    // React.useEffect(() => {
    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //         Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //     });

    //     return unsubscribe;
    // }, []);

    React.useEffect(() => {




        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
        });

        messaging().onNotificationOpenedApp(remoteMessage => {

            console.log('message data: ', remoteMessage);

            if (remoteMessage.from == '/topics/reading_practice') {
                navigation.navigate('ReadingList');
                return;
            }

            if (remoteMessage.from == '/topics/daily_vocabulary') {

                if (remoteMessage.data?.ID) {
                    navigation.navigate('VocabularyDefinition', {
                        vocabulary: {
                            "ID": remoteMessage.data?.ID,
                            "name": "thinking",
                            "phon_us": "/ˈθɪŋkɪŋ/",
                            "phon_uk": "/ˈθɪŋkɪŋ/",
                            "sound_us": "/media/audio/thinking_adjective__us.mp3",
                            "sound_uk": "/media/audio/thinking_adjective__uk.mp3",
                            "word_type": "adjective"
                        },
                    })
                }
                return;
            }

            if (remoteMessage.from == '/topics/practice') {
                navigation.navigate('FlashCardField');
                return;
            }



        });


    }, []);




    // if (!loaded) {
    //     return null;
    // }


    return (
        <View
            style={[styles.container]}
        >

            <View
                style={{
                    position: 'relative',
                    justifyContent: 'flex-start',
                    zIndex: 999,
                    display: 'flex',
                    flex: 1

                }}
            >



                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.FULL_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                        keywords:['education','ielts','toeic','english','tiếng anh','học tiếng anh']

                    }}
                />

                <ScrollView
                    keyboardShouldPersistTaps={'handled'}
                    style={{
                        marginTop: 10
                    }}
                >

                    {
                        (searchData && searchData.length > 0) &&
                        searchData.map((e, index) =>
                            <SearchItem
                                key={index.toString()}
                                label={e.name}
                                containerStyle={{
                                    backgroundColor: 'white',
                                    marginVertical: 1,
                                    marginHorizontal: 8,



                                }}
                                labelStyle={{
                                    color: 'black',
                                    fontWeight: '700'
                                }}
                                onItemPress={() => _onNavigateWordDefinition(e)}
                                value={e.word_type}
                                onSoundUsPress={() => _onPlayVocabularySound(e.sound_us)}
                            // onSoundUkPress={()=>_onPlayVocabularySound(e.sound_us)}

                            />
                        )


                    }

                </ScrollView>

            </View>


            {/* Body Control */}
            {
                (!searchData && nearestVocabulary) &&

                <>
                    <CardDefinition
                        containerStyle={{
                            marginHorizontal: 8,
                            display: 'flex',
                            position: 'relative',
                            // zIndex: -1,
                            bottom: 120,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            padding: 12,
                            minHeight: 240,
                            backgroundColor: 'white',
                            shadowColor: CommonColor.btnSubmit,
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.36,
                            shadowRadius: 6.68,

                            elevation: 11,
                            marginVertical: 12,
                            borderRadius: 8,
                            width: deviceWidth - 50,
                            alignSelf: 'center',
                        }}
                    // word_type={nearestVocabulary?.word_type}
                    // firstDefinition={`- ${nearestVocabulary?.definition} `}


                    >

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <MaterialCommunityIcon
                                name={CommonIcons.bell}
                                color={'gold'}
                                size={22}
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                }}
                            />

                            <Text
                                style={{
                                    color: 'grey',
                                    fontStyle: 'italic',
                                    marginBottom: 6
                                }}
                            >
                                {nearestVocabulary?.definitions[0]?.title || ""}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: 'coral'
                                }}
                            >
                                {nearestVocabulary?.definitions[0]?.example && nearestVocabulary?.definitions[0]?.example[0] || ""}
                            </Text>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <IconButton
                                    color={CommonColor.btnSubmit}
                                    icon={CommonIcons.volumnHigh}
                                    style={{
                                        width: 60
                                    }}
                                    size={32}
                                    onPress={() => _onPlayVocabularySound(nearestVocabulary.sound_us)}

                                />
                                <Text selectable={true} suppressHighlighting={true} style={{ fontSize: 22, fontWeight: '700', color: 'red' }} >{nearestVocabulary?.name}</Text>
                                <Text style={{ color: 'coral' }} >({nearestVocabulary?.word_type})</Text>
                                <Text>{nearestVocabulary?.phon_us}</Text>


                            </View>

                        </View>

                    </CardDefinition>
                </>

            }

            <View>
                <Searchbar
                    placeholder="Search"
                    placeholderTextColor={'white'}

                    onChangeText={_onInputSearchText}
                    value={searchQuery}
                    style={{
                        marginHorizontal: 8,
                        marginVertical: 18,
                        shadowColor: "#536983",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.34,
                        shadowRadius: 6.27,

                        elevation: 10,
                        backgroundColor: '#435E7D',

                    }}
                    iconColor={'white'}
                    textAlignVertical={'center'}
                    selectionColor={'white'}
                    inputStyle={{
                        color: 'white'
                    }}



                />
            </View>
        </View>
    )
}
const deviceWidth = Dimensions.get('screen').width;
export default D_HomeSearchScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1
    }
})
