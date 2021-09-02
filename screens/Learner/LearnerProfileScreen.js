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


const LearnerProfileScreen = (props) => {

    const { user } = props.route?.params || ''

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


    const _onGetUserProfile = async () => {
        RNProgressHud.show()
        ConversationAPI.getUserProfile(user?.id)
            .then(res => {
                if (res.status_code == 200) {
                    console.log('ee: ',res)
                    let user = new UserModel(res?.data)
                    setUserProfile(user)
                    getUserGroup()
                }
            })
            .catch(err => {
                console.log('err: ', err)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    useEffect(() => {
        _onGetUserProfile()
    }, [])

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
                            uri: userProfile?.profile_pic ?? CommonImages.avatar
                        }}
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 60,
                            alignItems: 'center',
                            marginVertical: 12,
                            ...BOXSHADOW.normal,

                        }}
                        resizeMode={'contain'}
                    />

                        <Text
                            style={{
                                fontSize:18,
                                fontWeight:'700'
                            }}
                        >
                            {userProfile?.name}
                        </Text>
                </View>



                {/*  */}
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 8
                    }}
                >
                    <TouchableOpacity
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#64b7f4',
                            padding: 8,
                            borderRadius: 4
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
