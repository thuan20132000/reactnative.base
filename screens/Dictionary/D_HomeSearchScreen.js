import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import CommonColor from '../../utils/CommonColor';
import CommonIcons from '../../utils/CommonIcons';
import RowItem from './components/RowItem';
import SearchItem from './components/SearchItem';

const D_HomeSearchScreen = (props) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);



    const _onNavigateWordDefinition = (e) => {
        props.navigation.navigate('WordDefinition')
    }

    return (
        <View
            style={[styles.container]}
        >

            <View
                style={{
                    position: 'relative',
                    justifyContent: 'flex-start',
                    height: '70%',

                }}
            >

                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={{
                        marginHorizontal: 8,
                        marginVertical: 18
                    }}
                />

                <View
                    style={{
                        backgroundColor: 'white',
                        marginHorizontal:12,
                        paddingVertical:6
                    }}
                >
                    <RowItem
                        label={"Develop"}
                        containerStyle={{
                            backgroundColor: 'white',
                            marginVertical: 1,
                            marginHorizontal: 8,



                        }}
                        leftIconSize={16}
                        labelStyle={{
                            color: 'black',
                            fontWeight: '700'
                        }}
                        rightIcon={CommonIcons.arrowRightChevron}
                        rightIconSize={32}
                        onItemPress={_onNavigateWordDefinition}

                    />
                    <RowItem
                        label={"Development"}
                        containerStyle={{
                            backgroundColor: 'white',
                            marginVertical: 1,
                            marginHorizontal: 8,



                        }}
                        leftIconSize={16}
                        labelStyle={{
                            color: 'black',
                            fontWeight: '700'
                        }}
                        rightIcon={CommonIcons.arrowRightChevron}
                        rightIconSize={32}

                    />

                </View>

            </View>

            <View
                style={{
                    marginHorizontal: 8,
                    display: 'flex',
                    position: 'relative',
                    bottom: -90
                }}
            >
                <RowItem
                    label={"Từ thông dụng"}
                    containerStyle={{
                        backgroundColor: CommonColor.primary,
                        paddingVertical: 18,
                        marginVertical: 6,

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
                        marginVertical: 6

                    }}
                    leftIconSize={26}
                    leftIconStyle={{ color: CommonColor.secondary }}
                    labelStyle={{
                        color: 'black',
                        fontWeight: '500'
                    }}

                />
            </View>

        </View>
    )
}

export default D_HomeSearchScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column'
    }
})
