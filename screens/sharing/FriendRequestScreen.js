import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import ConversationAPI from '../../app/API/ConversationAPI'
import RNProgressHud from 'progress-hud';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../utils/CommonIcons';
import CommonImages from '../../utils/CommonImages';
import ButtonText from '../../components/Button/BottonText';


const RequestItem = ({
    onAcceptPress,
    onDenyPress,
    title,
    image_path
}) => {
    return (
        <View
            style={[
                styles.itemContainer,
                {
                    marginHorizontal: 6,
                    paddingHorizontal: 6,
                    alignItems: 'center',
                    height: 100
                }
            ]}
        >
            <View
                style={{
                    display: 'flex',
                    flex: 1
                }}
            >
                <Image
                    source={{
                        uri: image_path || CommonImages.avatar
                    }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25
                    }}
                />

            </View>
            <View
                style={[
                    styles.itemBody,

                ]}
            >
                <Text
                    style={{
                        textAlign: 'left',
                        fontWeight: "700",
                        color: 'black'
                    }}
                >
                    {title}
                </Text>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}
                >
                    <ButtonText
                        label={'ACCEPT'}
                        width={120}
                        onItemPress={onAcceptPress}
                    />
                    <ButtonText
                        label={'DENY'}
                        width={120}
                        onItemPress={onDenyPress}


                    />
                </View>
            </View>

        </View>
    )
}

const FRIENDSHIPENUM = {
    ACCEPTED: 1,
    DENIED: 2,
    PENDING: 3
}
const FriendRequestScreen = () => {


    const [friendRequestList, setFriendRequest] = useState([])

    const _onGetUserNotifications = async () => {
        RNProgressHud.show()
        ConversationAPI.getUserFriendRequests()
            .then(res => {
                console.warn('re: ', res)
                if (res.status_code === 200 && res.data?.length > 0) {
                    setFriendRequest(res?.data)
                } else {
                    setFriendRequest([])
                }
            })
            .catch(err => {
                console.log('err: ', err)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    const _onAcceptReqquest = (item) => {
        RNProgressHud.show()
        ConversationAPI.handleFriendshipRequest(item?.id, FRIENDSHIPENUM.ACCEPTED)
            .then(res => {
                console.log('accept: ', res)
                _onGetUserNotifications()
            })
            .catch(err => {
                console.log('accepr err ', err)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    const _onDenyReqquest = (item) => {
        RNProgressHud.show()
        ConversationAPI.handleFriendshipRequest(item?.id, FRIENDSHIPENUM.DENIED)
            .then(res => {
                console.log('accept: ', res)
                _onGetUserNotifications()
            })
            .catch(err => {
                console.log('accepr err ', err)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }


    useEffect(() => {
        _onGetUserNotifications()
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>

                {
                    friendRequestList?.map((item, index) =>
                        <RequestItem
                            image_path={item?.sender?.profile_pic}
                            title={item?.sender?.username}
                            onAcceptPress={() => _onAcceptReqquest(item)}
                            onDenyPress={() => _onDenyReqquest(item)}
                        />
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default FriendRequestScreen

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.36,
        shadowRadius: 4.68,

        elevation: 3,
        marginHorizontal: 4,
        marginVertical: 2,
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 4

    },
    itemBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

    }
})
