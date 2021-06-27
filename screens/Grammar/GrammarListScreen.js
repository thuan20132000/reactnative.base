import React from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, SafeAreaView } from 'react-native'
import GrammarAPI from '../../app/API/GrammarAPI'
import { BOXSHADOW, COLORS, FONTS, SIZES } from '../../app/constants/themes'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from '../../utils/CommonIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';



const GrammarItem = ({
    name = 'default name', image_url, onPress, state = 'Chua hoan thanh',onPractisePress
}) => {
    return (
        <View
            style={{
                backgroundColor: COLORS.white,
                height: 60,
                marginVertical: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 4,
                borderRadius: 6,
                paddingHorizontal: 4,
                marginBottom: 8,
                ...BOXSHADOW.normal,
                position: 'relative'
            }}

        >
            <TouchableOpacity
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
                onPress={onPress}

            >
                <MaterialCommunityIcon
                    name={CommonIcons.bell}
                    size={22}
                    color={COLORS.primary}
                    style={{
                        marginHorizontal: 16
                    }}
                />
                <View>
                    <Text style={FONTS.h4}>{name}</Text>
                    <Text style={FONTS.body4}>{state}</Text>
                </View>

            </TouchableOpacity>
            {/* <TouchableOpacity
                style={{
                    right: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    backgroundColor: COLORS.primary,
                    padding: 6,
                    borderRadius: 6
                }}

            > */}
            <MaterialCommunityIcon
                name={CommonIcons.arrowRight}
                size={22}
                color={COLORS.darkgray}
                onPress={onPractisePress}
            />
            {/* <Text style={FONTS.body4,{color:COLORS.white,fontWeight:"700"}}>Luyen Tap</Text> */}
            {/* </TouchableOpacity> */}
        </View>
    )
}


const GrammarListScreen = (props) => {

    const [grammarList, setGrammarList] = React.useState([{}]);



    React.useEffect(() => {

        // let x = Array(22).fill({});
        // console.warn(x);
        // setGrammarList(x);

        GrammarAPI.getAllGrammar()
            .then((res) => {
                console.warn('res: ', res);
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

            <FlatList
                data={grammarList}
                renderItem={({ item }) =>
                    <GrammarItem
                        name={item.name}
                        onPress={() => _onGrammarDescriptionPress(item)}
                        onPractisePress={() => _onPractisePress(item)}
                    />
                }
                // keyExtractor={item => `post-${item.id.toString()}`}

                // ListFooterComponent={


                //     <View>
                //         <ActivityIndicator
                //             size={'large'}
                //             color={'coral'}
                //             // animating={isLoadMore}
                //         />
                //     </View>

                // }

                onEndReachedThreshold={0.2}
            // onEndReached={_onLoadMoreItem}


            // onRefresh={_onRefreshItemList}

            // refreshing={isRefreshing}



            />
        </SafeAreaView>


    )
}

export default GrammarListScreen

const styles = StyleSheet.create({})