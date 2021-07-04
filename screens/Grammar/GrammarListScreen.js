import React from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native'
import GrammarAPI from '../../app/API/GrammarAPI'
import { BOXSHADOW, COLORS, FONTS, SIZES } from '../../app/constants/themes'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from '../../utils/CommonIcons';
import { getPractisedGrammarResult, setPractisedGrammarResult } from '../../app/StorageManager';

import GrammarItem from './components/GrammarItem';
import SQLiteManager from '../../app/DB/SQLiteManage';


const GrammarListScreen = (props) => {

    const [grammarList, setGrammarList] = React.useState([]);

    React.useEffect(() => {

        let sql = new SQLiteManager();
        sql.openDB().then((res) => {
            console.warn('res: ', res);

        })
    }, []);


    const _onGetProducts = () => {
        let sql = new SQLiteManager();
        sql.openDB().then((res) => {
            sql.getAllFields(function (success) {
                console.warn('success: ')
            }).catch((err) => console.warn('err: ',err))

        })
    }

    const _onInsertProduct = () => {
        let sql = new SQLiteManager();
        sql.openDB().then((res) => {
            sql.insertProduct()
        })
    }

    const _onCreateTable = () => {
        let sql = new SQLiteManager();
        sql.openDB().then((res) => {
            sql.createTable()
        })
    }


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

            <View
                style={{ display: 'flex', flexDirection: 'row' }}
            >
                <TouchableOpacity
                    style={{
                        width: 120,
                        padding: 12,
                        backgroundColor: "coral"
                    }}
                    onPress={_onGetProducts}
                >
                    <Text>Get Data</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: 120,
                        padding: 12,
                        backgroundColor: "coral"
                    }}
                    onPress={_onCreateTable}
                >
                    <Text>Create Table</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: 120,
                        padding: 12,
                        backgroundColor: "coral"
                    }}
                    onPress={_onInsertProduct}
                >
                    <Text>Insert Data</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>


    )
}

export default GrammarListScreen

const styles = StyleSheet.create({})
