
import React from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, SafeAreaView } from 'react-native'
import { BOXSHADOW, COLORS, FONTS, SIZES } from '../../../app/constants/themes'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from '../../../utils/CommonIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getPractisedGrammarResult, setPractisedGrammarResult } from '../../../app/StorageManager';





const GrammarItem = ({
    item, image_url, onPress, onPractisePress, grammar, navigation
}) => {

    const [state, setState] = React.useState('');



    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getPractisedGrammarResult(item?.id).then((res) => {
                setState(res);
            });
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [])

    return (
        <View
            style={{
                backgroundColor: COLORS.white,
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
                position: 'relative',
            }}

        >
            <TouchableOpacity
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems:'center',
                    justifyContent:'center',
                    paddingVertical:20
                }}
                onPress={onPress}

            >
                {/* <MaterialCommunityIcon
                    name={CommonIcons.bell}
                    size={22}
                    color={COLORS.primary}
                    style={{
                        marginHorizontal: 16
                    }}
                /> */}
                <View
                    style={{marginLeft:12,justifyContent:'center'}}
                >
                    <Text style={FONTS.h4}>{item?.name}</Text>
                    <Text style={FONTS.body4,{fontStyle:'italic'}}>{Number(state)>=60?"Đã hoàn thành": "Chưa hoàn thành"}</Text>
                    <View style={{width:'100%',backgroundColor:'gray',height:0.6,marginVertical:8}} />
                    <View
                        style={{
                            width:50,
                            height:50,
                            borderColor:'coral',
                            borderWidth:0.4,
                            borderRadius:25,
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                    >
                        <Text style={FONTS.h4}>{Number(state)}%</Text>
                    </View>

                </View>

            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    right: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    backgroundColor: COLORS.white,
                    padding: 16,
                    borderRadius: 6,
                    ...BOXSHADOW.normal
                }}
                onPress={onPractisePress}

            >

                <Text style={FONTS.body4, { color: COLORS.primary, fontWeight: "700" }}>luyện tập</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GrammarItem


const styles = StyleSheet.create({})
