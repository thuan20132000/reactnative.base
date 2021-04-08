import React, { useState } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import CommonIcons from '../../utils/CommonIcons'
import RowItem from './components/RowItem'
import messaging from '@react-native-firebase/messaging'

const S_VocabularyRemindScreen = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [learntVocabularyRemind, setLearnVocabularyRemind] = useState(false);
    const [dailyVocabularyRemind, setDailyVocabularyRemind] = useState(false);
    React.useEffect(() => {
        messaging().getToken()
            .then((data) => console.warn(data))
            .catch(err => console.warn('error: ', err))
            .finally(() => console.warn('success'))
    }, []);




    return (
        <View
            style={[
                styles.container
            ]}
        >
            <RowItem
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
                        onValueChange={() => setLearnVocabularyRemind(!learntVocabularyRemind)}
                        value={learntVocabularyRemind}
                    />
                }
                rowPressDisable={true}
            />
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
                        onValueChange={() => setDailyVocabularyRemind(!dailyVocabularyRemind)}
                        value={dailyVocabularyRemind}
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
