import React, { useRef } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonColor from '../../utils/CommonColor'
import CommonIcons from '../../utils/CommonIcons'
import CommonImages from '../../utils/CommonImages'

import CardFlip from 'react-native-card-flip';
import CardVocabulary from './components/CardVocabulary'
import CardMeaning from './components/CardMeaning'


const F_FlashCardChoiceScreen = () => {

    const _refCardFlip = useRef();

    return (
        <ScrollView>



            <CardFlip
                ref={_refCardFlip}
                style={{
                    height: 140
                }}
            >
                <CardVocabulary
                    onItemPress={() => _refCardFlip.current.flip()}
                    containerStyle={{
                        height: 140,
                        alignItems: 'center'
                    }}
                    children={
                        <IconButton
                            icon={CommonIcons.rotateCircle}
                            color={CommonColor.primary}
                            size={18}
                            style={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10
                            }}
                            onPress={() => _refCardFlip.current.flip()}
                        />
                    }
                    onSoundPress={() => console.warn('sound')}
                />
                <CardMeaning
                    onItemPress={() => _refCardFlip.current.flip()}
                    containerStyle={{
                        height: 140
                    }}
                    children={
                        <IconButton
                            icon={CommonIcons.rotateCircle}
                            color={CommonColor.primary}
                            size={18}
                            style={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10
                            }}
                            onPress={() => _refCardFlip.current.flip()}
                        />
                    }
                />

            </CardFlip>



            {/* Word Meaning and Example */}
            <View
                style={[styles.exampleBox, {
                    marginTop: 32
                }]}
            >
                <Text
                    style={{
                        fontWeight: '700'
                    }}
                >
                    Meaning
                </Text>
                <Text
                    style={{
                        fontSize: 18,
                        fontStyle: 'italic',
                        color: 'grey'
                    }}
                >
                    Very serious or servere. Very serious or servere.

                </Text>

                {/* User Chating Card */}
                <Text
                    style={{
                        fontWeight: '700',
                        marginTop: 32
                    }}
                >
                    Example
                </Text>
                <View
                    style={[
                        styles.row,
                        {
                            justifyContent: 'flex-start',
                            alignItems: 'flex-end',
                        }
                    ]}
                >

                    <View
                        style={{
                            width: '10%'
                        }}
                    >
                        <Image
                            source={{
                                uri: CommonImages.avatar
                            }}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 25,
                            }}
                        />

                    </View>
                    <View
                        style={{
                            width: '80%',
                            marginHorizontal: 8,
                            backgroundColor: CommonColor.primary,
                            padding: 18,
                            borderBottomLeftRadius: 2,
                            borderTopLeftRadius: 32,
                            borderTopRightRadius: 22,
                            borderBottomRightRadius: 22
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 16
                            }}
                        >
                            If you want to customize the transition animations for all of the screens in the navigator, you can specify it in defaultNavigationOptions
                        </Text>
                    </View>
                </View>
            </View>



            {/* Vocabulary Options */}
            <View
                style={[styles.row,{
                    justifyContent:'space-around',
                    marginVertical:22
                }]}
            >
                <TouchableOpacity
                    style={[
                        styles.buttonSelect
                    ]}
                >
                    <Text
                        style={{
                            fontWeight: '700',
                            color: 'white',
                            fontSize: 18
                        }}
                    >
                        SKIP
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.buttonSelect,
                        {
                            backgroundColor:CommonColor.primary
                        }
                    ]}
                >
                    <Text
                        style={{
                            fontWeight: '700',
                            color: 'white',
                            fontSize: 18
                        }}
                    >
                        LEARN
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
export default F_FlashCardChoiceScreen

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    exampleBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        backgroundColor: 'white',
        padding: 12,
        margin: 6,
        borderRadius: 6,

    },
    buttonSelect: {
        padding: 12,
        borderRadius: 6,
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'grey'
    }

})
