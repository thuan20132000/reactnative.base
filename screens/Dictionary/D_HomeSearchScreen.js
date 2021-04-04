import React, { useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { searchVocabulary } from '../../utils/api_v1';
import CommonColor from '../../utils/CommonColor';
import CommonIcons from '../../utils/CommonIcons';
import RowItem from './components/RowItem';
import SearchItem from './components/SearchItem';
import Sound from 'react-native-sound';

import { url_absolute } from '../../config/api_config.json';
import { saveSearchedVocabulary } from '../../utils/helper';

const D_HomeSearchScreen = (props) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const typingTimeoutRef = useRef(null);
    const [searchData, setSearchData] = useState(null);

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



    const _onNavigateToSearchHistory = () => {
        props.navigation.navigate('SearchHistory');
    }


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

                <Searchbar
                    placeholder="Search"
                    onChangeText={_onInputSearchText}
                    value={searchQuery}
                    style={{
                        marginHorizontal: 8,
                        marginVertical: 18
                    }}
                />

                <ScrollView
                    keyboardShouldPersistTaps={'handled'}
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
                (!searchData) &&
                <View
                    style={{
                        marginHorizontal: 8,
                        display: 'flex',
                        position: 'relative',
                        // zIndex: -1,
                        bottom: 20,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        padding:12,
                        minHeight: 240,
                        backgroundColor: 'white',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.36,
                        shadowRadius: 6.68,

                        elevation: 11,
                        marginVertical: 12,
                        borderRadius:8




                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontSize:16,
                                fontWeight:'700'
                            }}
                        >
                            Thì hiện tại đơn
                        </Text>
                        <Text
                            style={{
                                marginHorizontal:12
                            }}
                        >
                           Khẳng định: S + V(s/es) + O
                        </Text>
                        <Text>Ex: He walks every day. (Anh ấy đi bộ mỗi ngày.)</Text>
                    </View>
                </View>
            }

        </View>
    )
}

export default D_HomeSearchScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1
    }
})
