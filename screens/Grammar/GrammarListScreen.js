import React from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, SafeAreaView } from 'react-native'
import GrammarAPI from '../../app/API/GrammarAPI'
import { BOXSHADOW, COLORS, FONTS, SIZES } from '../../app/constants/themes'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from '../../utils/CommonIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getPractisedGrammarResult, setPractisedGrammarResult } from '../../app/StorageManager';

import GrammarItem from './components/GrammarItem';




const GrammarListScreen = (props) => {

    const [grammarList, setGrammarList] = React.useState([]);



    React.useEffect(() => {

        // let x = Array(22).fill({});
        // console.warn(x);
        // setGrammarList(x);

        GrammarAPI.getAllGrammar()
            .then((res) => {
                if (res.status_code === 200) {
                    setGrammarList(res.data);
                }
            })
            .catch((err) => {
                console.warn('err: ', err)
            })





    }, []);

    const _onGrammarDescriptionPress = (item) => {
        props.navigation.navigate('GrammarDescription', {
            item: item
        })
    }

    const _onPractisePress = (item) => {
        props.navigation.navigate('GrammarExcerciseScreen', {
            item: item
        })
    }


    return (

        <SafeAreaView>

            {
                grammarList.length > 0 &&
                <FlatList
                    data={grammarList}
                    renderItem={({ item, index }) =>
                        <GrammarItem
                            item={item}
                            onPress={() => _onGrammarDescriptionPress(item)}
                            onPractisePress={() => _onPractisePress(item)}
                            navigation={props.navigation}

                        />
                    }
                    keyExtractor={(item) => `post-${item?.id?.toString()}`}


                    onEndReachedThreshold={0.2}
                // onEndReached={_onLoadMoreItem}


                // onRefresh={_onRefreshItemList}

                // refreshing={isRefreshing}



                />
            }
        </SafeAreaView>


    )
}

export default GrammarListScreen

const styles = StyleSheet.create({})
