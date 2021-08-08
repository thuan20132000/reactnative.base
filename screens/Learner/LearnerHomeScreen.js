import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ConversationAPI from '../../app/API/ConversationAPI';
import LearnerItem from './components/LearnerItem'
import RNProgressHud from 'progress-hud';

const LearnerHomeScreen = (props) => {

    const [learners, setLearners] = useState([]);

    const _onOpenLearnerProfile = (user) => {
        props.navigation.navigate('LearnerProfile', {
            user: user
        })
    }

    const getAllLearners = () => {
        RNProgressHud.show()

        ConversationAPI.getAllLearners()
            .then(res => {
                if (res.status_code === 200) {
                    setLearners(res.data)
                }
            })
            .catch((err) => {
                console.warn('err: ', err?.response?.data)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }


    useEffect(() => {
        getAllLearners()
    }, [])

    return (
        <View
            style={{
                backgroundColor: 'white',
                flex: 1
            }}
        >
            <ScrollView>
                {
                    learners?.map((item, index) => (
                        <LearnerItem
                            key={item?.id?.toString()}
                            onPress={() => _onOpenLearnerProfile(item)}
                            address={item?.address}
                            name={item?.username}
                            imagePath={item?.profile_pic}
                            description={item?.descriptions}

                        />
                    ))
                }

            </ScrollView>
        </View>
    )
}

export default LearnerHomeScreen

const styles = StyleSheet.create({})
