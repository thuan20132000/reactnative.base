import React, { useState } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import CommonIcons from '../../utils/CommonIcons'
import RowItem from './components/RowItem'
import messaging from '@react-native-firebase/messaging'
import { _onGetRemindSetting, _onSaveRemindSetting } from '../../utils/helper'

const S_VocabularyRemindScreen = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [learntVocabularyRemind, setLearnVocabularyRemind] = useState(false);
    const [dailyVocabularyRemind, setDailyVocabularyRemind] = useState(false);
    const [practiceRemind, setPracticeRemind] = useState(false);
    const [readingRemind, setReadingRemind] = useState(false);


    React.useEffect(() => {
        messaging().getToken()
            .then((data) => console.log(data))
            .catch(err => console.log('error: ', err))
            .finally(() => console.log('success'));


        _onGetRemindSetting('search_vocabulary')
            .then((value) => {
                if (value) {

                    if (value == 'true' || value == true) {
                        setLearnVocabularyRemind(true);
                    } else {
                        setLearnVocabularyRemind(false)
                    }
                }
            });


        _onGetRemindSetting('daily_vocabulary')
            .then((value) => {
                if (value) {
                    if (value == 'true' || value == true) {
                        setDailyVocabularyRemind(true);
                    } else {
                        setDailyVocabularyRemind(false)
                    }
                }
            });

        _onGetRemindSetting('practice')
            .then((value) => {
                if (value) {
                    if (value == 'true' || value == true) {
                        setPracticeRemind(true);
                    } else {
                        setPracticeRemind(false)
                    }
                }
            });

        _onGetRemindSetting('reading_practice')
            .then((value) => {
                if (value) {
                    if (value == 'true' || value == true) {
                        setReadingRemind(true);
                    } else {
                        setReadingRemind(false)
                    }
                }
            });

    }, []);


    const _onChangeRemindSearchVocabulary = async () => {
        setLearnVocabularyRemind(!learntVocabularyRemind);

        if (learntVocabularyRemind) {
            messaging()
                .unsubscribeFromTopic('search_vocabulary')
                .then(() => console.log('unsubcribed to search_vocabulary'));
            _onSaveRemindSetting('search_vocabulary', false)
                .then((value) => console.log('save res: ', value));
        } else {
            messaging()
                .subscribeToTopic('search_vocabulary')
                .then(() => console.log(`Subscribed to search_vocabulary`));
            _onSaveRemindSetting('search_vocabulary', true)
                .then((value) => console.log('save res: ', value));


        }

    }


    const _onChangeRemindDailyVocabulary = async () => {
        setDailyVocabularyRemind(!dailyVocabularyRemind);
        if (dailyVocabularyRemind) {
            messaging()
                .unsubscribeFromTopic('daily_vocabulary')
                .then(() => console.log('unsubcribed to daily_vocabulary'));
            _onSaveRemindSetting('daily_vocabulary', false)
                .then((value) => console.log('save res: ', value));
        } else {
            messaging()
                .subscribeToTopic('daily_vocabulary')
                .then(() => console.log(`Subscribed to daily_vocabulary`));
            _onSaveRemindSetting('daily_vocabulary', true)
                .then((value) => console.log('save res: ', value));
        }
    }


    const _onChangeRemindPractice = async () => {
        setPracticeRemind(!practiceRemind);
        if (practiceRemind) {
            messaging()
                .unsubscribeFromTopic('practice')
                .then(() => console.log('unsubcribed to practice'));
            _onSaveRemindSetting('practice', false)
                .then((value) => console.log('save res: ', value));
        } else {
            messaging()
                .subscribeToTopic('practice')
                .then(() => console.log(`Subscribed to practice`));
            _onSaveRemindSetting('practice', true)
                .then((value) => console.log('save res: ', value));
        }
    }



    const _onChangeRemindReadingPractice = async () => {
        setReadingRemind(!readingRemind);
        if (readingRemind) {
            messaging()
                .unsubscribeFromTopic('reading_practice')
                .then(() => console.log('unsubcribed to reading_practice'));
            _onSaveRemindSetting('reading_practice', false)
                .then((value) => console.log('save res: ', value));
        } else {
            messaging()
                .subscribeToTopic('reading_practice')
                .then(() => console.log(`Subscribed to reading_practice`));
            _onSaveRemindSetting('reading_practice', true)
                .then((value) => console.log('save res: ', value));
        }
    }

    return (
        <View
            style={[
                styles.container
            ]}
        >
            {/* <RowItem
                label={'Nhắc từ đã tìm kiếm'}
                leftIconName={CommonIcons.bell}
                labelStyle={{
                    fontSize: 16
                }}
                children={
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={_onChangeRemindSearchVocabulary}
                        value={learntVocabularyRemind}
                    />
                }
                rowPressDisable={true}
            /> */}
            <RowItem
                label={'Nhận thông báo từ hàng ngày'}
                leftIconName={CommonIcons.bell}
                labelStyle={{
                    fontSize: 16
                }}
                children={
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={_onChangeRemindDailyVocabulary}
                        value={dailyVocabularyRemind}
                    />
                }
                rowPressDisable={true}
            />
            <RowItem
                label={'Nhận thông báo từ vựng'}
                leftIconName={CommonIcons.bell}
                labelStyle={{
                    fontSize: 16
                }}
                children={
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={_onChangeRemindPractice}
                        value={practiceRemind}
                    />
                }
                rowPressDisable={true}
            />
            <RowItem
                label={'Nhận thông báo luyện đọc'}
                leftIconName={CommonIcons.bell}
                labelStyle={{
                    fontSize: 16
                }}
                children={
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={_onChangeRemindReadingPractice}
                        value={readingRemind}
                    />
                }
                rowPressDisable={true}
            />
        </View>
    )
}

export default S_VocabularyRemindScreen

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8
    }
})
