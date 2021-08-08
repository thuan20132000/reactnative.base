import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView } from 'react-native'
import { BOXSHADOW } from '../../app/constants/themes'
import CommonImages from '../../utils/CommonImages'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../utils/CommonIcons'
import GroupCard from './components/GroupCard'
import ConversationAPI from '../../app/API/ConversationAPI'
const LearnerProfileScreen = (props) => {

    const { user } = props.route?.params || ''

    const [userGroups, setUserGroups] = useState([]);
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

    useEffect(() => {
        getUserGroup()
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
                    <ImageBackground
                        source={{
                            uri: CommonImages.avatar
                        }}
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 16,
                            alignItems: 'center',
                            marginVertical: 12,
                            ...BOXSHADOW.normal,

                        }}
                    >
                        {/* <View
                        style={{
                            bottom: -16,
                            backgroundColor: 'white',
                            padding: 4,
                            width: 40,
                            alignItems: 'center',
                            position: 'absolute',
                            borderRadius: 8,
                            ...BOXSHADOW.normal
                        }}
                    >
                        <Text>4.5</Text>
                    </View> */}
                    </ImageBackground>
                    <Text style={{ fontWeight: '700', fontSize: 18 }}>Beginner</Text>
                    <Text style={{ fontSize: 14, fontStyle: 'italic', color: 'gray' }}>Descriptions  Descriptions Descriptions</Text>
                </View>


                {/*  */}
                {/* <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 8
                    }}
                >
                    <MaterialCommunityIcons
                        name={CommonIcons.videoCall}
                        size={34}
                        color={'#64b7f4'}
                        style={{
                            margin: 12
                        }}
                    />
                    <MaterialCommunityIcons
                        name={CommonIcons.chatMessage}
                        size={34}
                        color={'#64b7f4'}
                        style={{
                            margin: 12
                        }}
                    />
                </View> */}

                <View
                    style={{
                        margin: 12,
                        ...BOXSHADOW.normal,
                        backgroundColor: 'white',
                        padding: 12,
                        borderRadius: 8
                    }}
                >
                    <Text style={{ color: '#64b7f4', fontWeight: '700', marginVertical: 8, fontSize: 18 }}>ABOUT ME</Text>
                    <Text>My name is practicer. I am a begginer at English so i want to find a person who can practise with me</Text>
                </View>

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
