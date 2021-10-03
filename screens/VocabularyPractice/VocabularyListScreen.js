import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { BOXSHADOW, COLORS } from '../../app/constants/themes'
import VocabularyItem from './components/VocabularyItem'
import ProgressCircle from 'react-native-progress-circle'
import { useNavigation, useRoute } from '@react-navigation/core'
import VOCABULARY_DATA from '../../data/vocabulary.json'
import PracticeVocabularyModel from '../../app/models/PracticeVocabularyModel'
import CommonColor from '../../utils/CommonColor'
import FirebaseManager from '../../app/FirebaseManager'
import { getUniqueId } from 'react-native-device-info'
import { FAB } from 'react-native-paper'
import ActionSheet from 'react-native-actionsheet'
import ButtonText from '../../components/Button/BottonText'
import { Button, CheckBox, Icon, ListItem } from 'react-native-elements'




const VocabularyListScreen = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const { desk } = route?.params ?? ''
    const [vocabularyList, setVocabularyList] = useState([])
    const _refActionSheet = useRef()


    useEffect(() => {



        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            FirebaseManager.getDeskVocabulary(getUniqueId(), desk)
                .then(res => {
                    console.log(res)
                    let vocabularies = res?.map(e => new PracticeVocabularyModel({ ...e, native_name: e?.native_name }))
                    setVocabularyList(vocabularies)
                })

        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;


    }, [navigation])

    const _onShowPracticeScreen = () => {
        if (vocabularyList?.length <= 0) {
            return
        }
        navigation.navigate('VocabularyPractice', {
            data: vocabularyList
        })
    }

    const _onShowVocabularyDetail = (vocabulary) => {
        navigation.navigate('VocabularyCreate', {
            vocabulary: vocabulary,
            desk: desk
        })
    }

    const _onCreateVocabulary = () => {
        navigation.navigate('VocabularyCreate', {
            desk: desk
        })
    }
    const _onRemoveDesk = () => {

        Alert.alert(
            "",
            "Do you want to remove this desk?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        FirebaseManager.removeDesk(getUniqueId(), desk)
                            .then(res => {
                                console.log(res)
                                if (res) {
                                    navigation.goBack()
                                }

                            })
                    }
                }
            ]
        );

    }

    const _onShowActionSheet = () => {
        _refActionSheet.current.show()
    }

    const _onActionSheetPress = (index) => {
        switch (index) {
            case 0:
                _onCreateVocabulary()
                break;
            case 1:
                _onRemoveDesk()
                break;
            default:
                break;
        }
    }

    return (
        <View
            style={[
                styles.container
            ]}
        >




            <ScrollView
                style={{
                    backgroundColor: 'white'
                }}
            >
                {
                    vocabularyList?.map((item, index) =>
                        <ListItem key={index.toString()} bottomDivider
                            onPress={() => _onShowVocabularyDetail(item)}
                        >
                            <ListItem.Content>
                                <ListItem.Title>{item?.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron size={34} />

                        </ListItem>
                    )
                }

            </ScrollView>
          

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Icon
                    reverse
                    name='trash-outline'
                    type='ionicon'
                    color='#ff4500'
                    onPress={_onRemoveDesk}
                />
                <Icon
                    reverse
                    name='add-circle-outline'
                    type='ionicon'
                    color={'#4287f5'}
                    onPress={_onCreateVocabulary}
                />


                <Button
                    title="PRACTISE"
                    type="solid"

                    onPress={_onShowPracticeScreen}
                    containerStyle={{
                        marginHorizontal: 12,
                        marginVertical: 12,
                        flex: 1


                    }}

                    titleStyle={{
                        fontSize: 12
                    }}

                />
            </View>
        </View>
    )
}

export default VocabularyListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: 'transparent',
        borderWidth: 0.6,
        borderColor: COLORS.secondary,
        marginBottom: 32,
        height: 50,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 80,
    },
})
