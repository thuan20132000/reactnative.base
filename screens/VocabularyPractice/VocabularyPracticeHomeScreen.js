import { StackActions, useNavigation } from '@react-navigation/core'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../app/constants/themes'
import ButtonText from '../../components/Button/BottonText'
import ListItem from './components/ListItem'

const VocabularyPracticeHomeScreen = () => {

    const navigation = useNavigation()

    const _onShowVocabularyCreate = () => {
        // navigation.dispatch(
        //     StackActions.replace('VocabularyCreate')
        // )
        navigation.navigate('VocabularyCreate')
    }


    const _onShowVocabularyPractice = () => {
        navigation.navigate('VocabularyPractice')
    }


    return (
        <SafeAreaView
            style={{
                flex: 1,

            }}
        >
            <ScrollView>
                <ListItem onPracticePress={_onShowVocabularyPractice} />
                <ListItem onPracticePress={_onShowVocabularyPractice} />
                <ListItem onPracticePress={_onShowVocabularyPractice} />
                <ListItem onPracticePress={_onShowVocabularyPractice} />
                <ListItem onPracticePress={_onShowVocabularyPractice} />
                <ListItem onPracticePress={_onShowVocabularyPractice} />
                <ListItem onPracticePress={_onShowVocabularyPractice} />

            </ScrollView>


            <View>
                <ButtonText
                    label={'CREATE DESK'}
                    containerStyle={styles.buttonCreate}
                    labelStyle={{
                        color: COLORS.secondary,
                        fontSize: 16,
                        fontWeight: '700'
                    }}
                    onItemPress={_onShowVocabularyCreate}
                />
            </View>

        </SafeAreaView>
    )
}

export default VocabularyPracticeHomeScreen

const styles = StyleSheet.create({
    buttonCreate: {
        backgroundColor: 'transparent',
        borderWidth: 0.6,
        borderColor: COLORS.secondary,
        marginBottom: 32,
        height: 50,
    }
})
