import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { BOXSHADOW } from '../../app/constants/themes'
import CommonImages from '../../utils/CommonImages'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../utils/CommonIcons'
import GroupCard from './components/GroupCard'
import ConversationAPI from '../../app/API/ConversationAPI'
import RNProgressHud from 'progress-hud';
import UserModel from '../../app/models/userModel'
import CommonColor from '../../utils/CommonColor'
import { StackActions, useNavigation } from '@react-navigation/core'


const LearnerProfileScreen = (props) => {

    const { user } = props.route?.params || ''
    const navigation = useNavigation()
    const [userGroups, setUserGroups] = useState([])
    const [userProfile, setUserProfile] = useState(new UserModel(null))
    const _onOpenConversationGroup = (group) => {
        props.navigation.push('ConversationDetail', {
            groupConversation: group?.conversation,
            group: group
        })
    }


    const getUserGroup = () => {
        ConversationAPI.getUserGroups(user?.id)
            .then((res) => {
                if (res.status_code === 200) {
                    setUserGroups(res?.data)
                }
            })
            .catch((err) => {
                console.warn(err?.response?.data)
            })
            .then(() => {

            })
    }

    const _onMakingFriendship = async () => {
        RNProgressHud.show()
        ConversationAPI.makeFriendship(user?.id)
            .then(res => {
                Alert.alert('Sent a friend request')
            })
            .catch((err) => {
                console.warn('err: ', err)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    const _onCancelFriend = async () => {
        RNProgressHud.show()
        ConversationAPI.cancelFriendship(user?.id)
            .then(res => {
                navigation.dispatch(
                    StackActions.popToTop()
                )
            })
            .catch(err => {
                console.warn('err: ', err)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }


    const _onGetUserProfile = async () => {
        setUserProfile(new UserModel(user))
        getUserGroup()

        // RNProgressHud.show()
        // ConversationAPI.getUserProfile(user?.id)
        //     .then(res => {

        //         if (res.status_code == 200) {
        //             let user = new UserModel(res?.data)
        //             console.warn('s: ',user)
        //             setUserProfile(user)
        //         }
        //     })
        //     .catch(err => {
        //         console.warn('err: ', err?.response.data)
        //     })
        //     .finally(() => {
        //         RNProgressHud.dismiss()
        //     })
    }

    useEffect(() => {
        _onGetUserProfile()

        navigation.setOptions({
            title:user?.fullname
        })
    }, [])


    const getUserAvatar = () => {
        let avatar_path = CommonImages.avatar
        if (userProfile?.profile_pic && userProfile?.profile_pic != 'null' && userProfile?.profile_pic != 'undefined') {
            avatar_path = userProfile.profile_pic
        }
        return avatar_path
    }

    return (
        <View
            style={{
                backgroundColor: 'white',
                flex: 1
            }}
        >
            <ScrollView>

                <View
                    style={{
                        alignItems: 'center'
                    }}
                >

                    <Image
                        source={{
                            uri: getUserAvatar()
                        }}
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 60,
                            alignItems: 'center',
                            marginVertical: 12,
                            borderWidth: 2,
                            borderColor: 'white'

                        }}
                        resizeMode={'cover'}
                    />

                </View>



                {/*  */}
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}
                >
                    {
                        userProfile?.is_friendship ?
                            <TouchableOpacity
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: 'coral',
                                    padding: 8,
                                    borderRadius: 4,
                                    marginHorizontal: 6

                                }}
                                onPress={_onCancelFriend}
                            >

                                <Text style={{ fontWeight: '700', color: 'white' }}>Cancel Friend</Text>
                                <MaterialCommunityIcons
                                    name={CommonIcons.person}
                                    size={22}
                                    color={'white'}
                                    style={{
                                        marginHorizontal: 4
                                    }}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: '#64b7f4',
                                    padding: 8,
                                    borderRadius: 4,
                                    marginHorizontal: 6
                                }}
                                onPress={_onMakingFriendship}
                            >

                                <Text style={{ fontWeight: '700', color: 'white' }}>Make Friend</Text>
                                <MaterialCommunityIcons
                                    name={CommonIcons.person}
                                    size={22}
                                    color={'white'}
                                    style={{
                                        marginHorizontal: 4
                                    }}
                                />
                            </TouchableOpacity>
                    }


                </View>

                {/* <View
                    style={{
                        margin: 12,
                        ...BOXSHADOW.normal,
                        backgroundColor: 'white',
                        padding: 12,
                        borderRadius: 8
                    }}
                >
                    <Text style={{ color: '#64b7f4', fontWeight: '700', marginVertical: 8, fontSize: 18 }}>ABOUT ME</Text>
                    <Text>
                        {userProfile?.descriptions}
                    </Text>
                </View> */}

                <View
                    style={{
                        margin: 22
                    }}
                >

                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'center'

                        }}
                    >
                        <View
                            style={{
                                width: '40%',
                                height: 70,
                                backgroundColor: 'coral',
                                margin: 12,
                                borderRadius: 6,
                                padding: 6,
                                alignItems: 'center'
                            }}
                        >
                            <MaterialCommunityIcons
                                name={CommonIcons.schoolGraduateHat}
                                size={24}
                                color={'white'}
                            />
                            <Text style={{ margin: 8, color: 'white', fontWeight: '700' }}>Qualification</Text>
                        </View>
                        <View
                            style={{
                                width: '40%',
                                height: 70,
                                backgroundColor: '#a277dc',
                                margin: 12,
                                borderRadius: 6,
                                padding: 6,
                                alignItems: 'center'


                            }}
                        >
                            <MaterialCommunityIcons
                                name={CommonIcons.face_good}
                                size={24}
                                color={'white'}
                            />
                            <Text style={{ margin: 8, color: 'white', fontWeight: '700' }}>Favourites</Text>
                        </View>
                        <View
                            style={{
                                width: '40%',
                                height: 70,
                                backgroundColor: '#64b7f4',
                                margin: 12,
                                borderRadius: 6,
                                padding: 6,
                                alignItems: 'center'


                            }}
                        >
                            <MaterialCommunityIcons
                                name={CommonIcons.mapMarker}
                                size={24}
                                color={'white'}
                            />
                            <Text style={{ margin: 8, color: 'white', fontWeight: '700' }}>Location</Text>
                        </View>
                        <View
                            style={{
                                width: '40%',
                                height: 70,
                                backgroundColor: '#f8b427',
                                margin: 12,
                                borderRadius: 6,
                                padding: 6,
                                alignItems: 'center'

                            }}
                        >
                            <MaterialCommunityIcons
                                name={CommonIcons.star}
                                size={24}
                                color={'white'}
                            />
                            <Text style={{ margin: 8, color: 'white', fontWeight: '700' }}>Star</Text>
                        </View>
                    </View>
                </View>


                {/* Groups */}

                <View style={{ marginHorizontal: 12 }}>
                    <Text style={{ fontWeight: '700', fontSize: 18 }}>Owner's groups</Text>
                    {
                        userGroups?.map((item, index) => (
                            <GroupCard
                                key={item?.id?.toString()}
                                onPress={() => _onOpenConversationGroup(item)}
                                groupName={item?.name}
                                conversationName={item?.conversation?.title}
                            />

                        ))
                    }
                </View>
            </ScrollView>

        </View>
    )
}

export default LearnerProfileScreen

const styles = StyleSheet.create({

})
