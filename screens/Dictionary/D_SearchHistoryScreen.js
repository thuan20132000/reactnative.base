import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { getSearchedvocabularyList } from '../../utils/helper'
import SearchItem from './components/SearchItem';
import Sound from 'react-native-sound';
import {url_absolute} from '../../config/api_config.json';
const D_SearchHistoryScreen = (props) => {

    const [searchVocabularyList, setSearchVocabularyList] = React.useState([]);

    React.useEffect(() => {

        getSearchedvocabularyList()
            .then((data) => {
                if(data && data.length>0){
                    setSearchVocabularyList(data)
                }
            });

        return () => {
        }
    }, [])




    const _onPlayVocabularySound = async (sound_name) => {
        let path = `${url_absolute}${sound_name}`;
        console.warn(path);

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

    const _onNavigateWordDefinition = async (e) => {
        props.navigation.navigate('VocabularyDefinition', {
            vocabulary: e
        })
    }


    return (
        <ScrollView>
            {
                searchVocabularyList.length > 0
                && searchVocabularyList.map((e, index) =>
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
    )
}

export default D_SearchHistoryScreen

const styles = StyleSheet.create({})
