import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Input } from 'react-native-elements/dist/input/Input'
import { BOXSHADOW, COLORS } from '../../app/constants/themes'
import ButtonText from '../../components/Button/BottonText'
import CommonColor from '../../utils/CommonColor'
import CommonIcons from '../../utils/CommonIcons'
import CommonImages from '../../utils/CommonImages'
import SpeechToText from '../sharing/SpeechToText'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRoute } from '@react-navigation/core'

const VocabularyCreateScreen = () => {

    const route = useRoute()
    const [englishWord, setEnglishWord] = useState('')
    const [nativeWord, setNativeWord] = useState('')


    const { canRemove, vocabulary } = route?.params ?? ''


    return (

        <View
            style={{
                flex: 1
            }}
        >

            <ScrollView>
                <SpeechToText
                    onSelectVocabulary={(a) => setEnglishWord(a)}
                />

                <View
                    style={{
                        marginTop: 22
                    }}
                >

                    <View
                        style={[styles.group]}
                    >
                        <Input
                            label={'English Language'}
                            placeholder='Write something here...'
                            multiline
                            inputContainerStyle={{
                                borderBottomColor: CommonColor.primary,
                                minHeight: 80
                            }}
                            value={englishWord}
                            onChangeText={(text) => setEnglishWord(text)}
                        />

                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: 12
                            }}
                        >
                            <Image
                                source={
                                    require('../../app/assets/images/imageDefault.png')
                                }
                                style={{
                                    width: 60,
                                    height: 60,
                                    alignSelf: 'center'
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => console.warn('ds fd')}
                            >
                                <MaterialCommunityIcons
                                    name={CommonIcons.cameraplus}
                                    size={26}
                                    color={CommonColor.primary}
                                />

                            </TouchableOpacity>

                        </View>
                    </View>

                    <View
                        style={[styles.group]}
                    >
                        <Input
                            label={'Native Language'}
                            placeholder='Write something here...'
                            multiline
                            inputContainerStyle={{
                                borderBottomColor: CommonColor.primary,
                                minHeight: 80

                            }}
                            onChangeText={(text) => setNativeWord(text)}

                        />

                    </View>
                </View>
            </ScrollView>
            <View>
                <ButtonText
                    label={'UPDATE'}
                    containerStyle={styles.buttonCreate}
                    labelStyle={{
                        color: COLORS.secondary,
                        fontSize: 16,
                        fontWeight: '700'
                    }}
                />
                {
                    vocabulary &&
                    <ButtonText
                        label={'REMOVE'}
                        containerStyle={[styles.buttonCreate, { borderColor: 'red' }]}
                        labelStyle={{
                            color: 'red',
                            fontSize: 16,
                            fontWeight: '700'
                        }}
                    />

                }
            </View>

        </View >

    )
}

export default VocabularyCreateScreen

const styles = StyleSheet.create({
    group: {
        padding: 4,
        marginHorizontal: 4,
        marginVertical: 8,
        backgroundColor: 'white',
        borderRadius: 8,
        ...BOXSHADOW.normal


    },
    buttonCreate: {
        backgroundColor: 'transparent',
        borderWidth: 0.6,
        borderColor: COLORS.secondary,
        marginBottom: 12,
        height: 50,
    }
})
