import React, { useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { searchVocabulary } from '../../utils/api_v1';
import CommonColor from '../../utils/CommonColor';
import CommonIcons from '../../utils/CommonIcons';
import RowItem from './components/RowItem';
import SearchItem from './components/SearchItem';
import Sound from 'react-native-sound';

import {_onPlaySound} from '../../utils/helper';

const D_HomeSearchScreen = (props) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const typingTimeoutRef = useRef(null);
    const [searchData, setSearchData] = useState(null);

    const _onNavigateWordDefinition = (e) => {
        props.navigation.navigate('WordDefinition',{
            vocabulary:e
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
       await  _onPlaySound(sound_name);
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
                    display:'flex',
                    flex:1

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
                                onItemPress={()=>_onNavigateWordDefinition(e)}
                                value={e.word_type}
                                onSoundUsPress={()=>_onPlayVocabularySound(e.sound_uk)}
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
                        bottom:0,
                        flexDirection:'row',
                        justifyContent:'space-around',
                        alignItems:'center',
                        


                    }}
                >
                    <RowItem
                        label={"Từ thông dụng"}
                        containerStyle={{
                            backgroundColor: CommonColor.primary,
                            paddingVertical: 18,
                            marginVertical: 6,
                            width:'46%'

                        }}
                        leftIconSize={26}
                        leftIconStyle={{ color: CommonColor.secondary }}
                        labelStyle={{
                            color: 'black',
                            fontWeight: '500'
                        }}

                    />
                    <RowItem
                        label={"Từ đã tra"}
                        containerStyle={{
                            backgroundColor: CommonColor.primary,
                            paddingVertical: 18,
                            marginVertical: 6,
                            width:'46%'

                        }}
                        leftIconSize={26}
                        leftIconStyle={{ color: CommonColor.secondary }}
                        labelStyle={{
                            color: 'black',
                            fontWeight: '500'
                        }}

                    />
                </View>
            }

        </View>
    )
}

export default D_HomeSearchScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex:1
    }
})
