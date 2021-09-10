import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ConversationAPI from '../../app/API/ConversationAPI';
import LearnerItem from './components/LearnerItem'
import RNProgressHud from 'progress-hud';
import { FlatList } from 'react-native';
import UserModel from '../../app/models/userModel';

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
                    let learners = res?.data?.map(e => new UserModel(e))
                    setLearners(learners)
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

            <FlatList
                data={learners}
                renderItem={({ item, index }) => {
                    return (
                        <LearnerItem
                            key={item?.id?.toString()}
                            onPress={() => _onOpenLearnerProfile(item)}
                            user={item}

                        />

                    )
                }}
                keyExtractor={(item) => item?.id}
                contentContainerStyle={{
                    paddingVertical: 12,

                }}
            />
        </View>
    )
}

export default LearnerHomeScreen

const styles = StyleSheet.create({})
