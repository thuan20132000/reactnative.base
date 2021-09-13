import React from 'react'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Input } from 'react-native-elements/dist/input/Input'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BOXSHADOW, COLORS } from '../../app/constants/themes'
import ButtonText from '../../components/Button/BottonText'
import CommonColor from '../../utils/CommonColor'
import CommonIcons from '../../utils/CommonIcons'
import CommonImages from '../../utils/CommonImages'
import SpeechToText from '../sharing/SpeechToText'

const VocabularyCreateScreen = () => {
    return (

        <View
            style={{
                flex: 1
            }}
        >
            <ScrollView>
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
                    />

                    <TouchableOpacity>
                        <Image
                            source={
                                require('../../app/assets/images/imageDefault.png')
                            }
                            style={{
                                width: 160,
                                height: 100,
                                alignSelf: 'center'
                            }}
                        />

                    </TouchableOpacity>
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
                    />
                  
                </View>
            </ScrollView>
            <View>
                <ButtonText
                    label={'Add Vocabulary'}
                    containerStyle={styles.buttonCreate}
                    labelStyle={{
                        color: COLORS.secondary,
                        fontSize: 16,
                        fontWeight: '700'
                    }}
                />
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
        marginBottom: 32,
        height: 50,
    }
})
