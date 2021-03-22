import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CommonColor from '../../../utils/CommonColor'

import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonIcons from '../../../utils/CommonIcons';

const SearchItem = ({
    label,
    containerStyle,
    labelStyle,
    onItemPress,
    value,
    valueStyle,
    onSoundUsPress,
    onSoundUkPress

}) => {
    return (
        <View
            style={[{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}, containerStyle]}

        >
            <TouchableOpacity
                onPress={onItemPress}
                style={[
                    {
                        paddingVertical:12,
                        width:'80%'
                    }
                ]}
            >
                <View
                    style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center' }]}
                >
                    <MaterialCommunityIcon
                        color={CommonColor.primary}
                        size={16}
                        name={CommonIcons.heartOutline}
                    />
                    <Text
                        style={[styles.itemText, labelStyle]}
                    >
                        {label}
                    </Text>
                    <Text
                        style={[valueStyle,
                            {
                                color: 'coral'
                            }
                        ]}
                    >
                        {value}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    display:'flex',
                    flexDirection:'column',
                    marginRight:22
                }}
                onPress={onSoundUsPress}
            >

                <MaterialCommunityIcon
                    color={'coral'}
                    name={CommonIcons.volumnHigh}
                    size={26}
                    style={{
                        alignSelf: 'flex-end',
                        justifyContent: 'flex-end',
                    }}
                   
                />
           
            </TouchableOpacity>

        </View>
    )
}

export default SearchItem

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: CommonColor.btnSubmit,
        marginVertical: 1,
        paddingVertical: 18,
        paddingHorizontal: 6,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    itemText: {
        fontWeight: '600',
        color: 'white',
        fontSize: 18,
        marginHorizontal: 6
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    }
})
