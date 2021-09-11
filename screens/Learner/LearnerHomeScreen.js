import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ConversationAPI from '../../app/API/ConversationAPI';
import LearnerItem from './components/LearnerItem'
import RNProgressHud from 'progress-hud';
import { FlatList } from 'react-native';
import UserModel from '../../app/models/userModel';
import axios from 'axios';

const LearnerHomeScreen = (props) => {

    const [learners, setLearners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [nextPageUrl, setNextPageUrl] = useState(null)
    const _onOpenLearnerProfile = (user) => {
        props.navigation.navigate('LearnerProfile', {
            user: user
        })
    }

    const getAllLearners = () => {
        RNProgressHud.show()

        ConversationAPI.getAllLearners()
            .then(res => {
                let learnersRes = res?.data?.map(e => new UserModel(e))
                setLearners([...learners, ...learnersRes])
                setNextPageUrl(res?.next)
            })
            .catch((err) => {
                console.log('err: ', err?.response?.data)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }


    const _onLoadMore = () => {
        if(!nextPageUrl){
            return
        }
        RNProgressHud.show()
        ConversationAPI.getDataByUrl(nextPageUrl)
            .then(res => {
                let learnersRes = res?.data?.map(e => new UserModel(e))
                setLearners([...learners, ...learnersRes])
                setNextPageUrl(res?.next)
            })
            .catch((err) => {
                console.log('err: ', err?.response?.data)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }


    useEffect(() => {
        getAllLearners(currentPage)
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
                onEndReachedThreshold={0.3}
                onEndReached={_onLoadMore}
            />
        </View>
    )
}

export default LearnerHomeScreen

const styles = StyleSheet.create({})
