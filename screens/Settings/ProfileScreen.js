import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import { BOXSHADOW } from '../../app/constants/themes'
import CommonImages from '../../utils/CommonImages'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../utils/CommonIcons'
// import GroupCard from './components/GroupCard'
import ConversationAPI from '../../app/API/ConversationAPI'
import ItemSetting from '../../components/shared/ItemSetting'
import {
    AccessToken,
    AuthenticationToken,
    LoginButton,
    LoginManager
} from 'react-native-fbsdk-next';
import { setUserAuth } from '../../app/StorageManager'
import { StackActions, useNavigation } from '@react-navigation/native'
import AppManager from '../../app/AppManager'

const ProfileScreen = (props) => {
    const navigation = useNavigation()

    const { user } = props.route?.params || ''

    const [userGroups, setUserGroups] = useState([]);
    const _onOpenConversationGroup = (group) => {
        props.navigation.push('ConversationDetail', {
            groupConversation: group?.conversation,
            group: group
        })
    }


    const _onLogOut = () => {
        console.log('logout')
        setUserAuth(null)
        // props.navigation.replace('VideoHome')
        AppManager.shared.user = null
        // dispatch(logout())
        navigation.dispatch(
            StackActions.replace('Signin')
        )
    }
    return (
        <View
            style={{
                backgroundColor: 'white',
                flex: 1
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >

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
                    <Text style={{ fontWeight: '700', fontSize: 18 }}>Thuan Truong</Text>
                    <Text style={{ fontSize: 14, fontStyle: 'italic', color: 'gray' }}>Beginner</Text>
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
                                alignItems: 'center',
                                ...BOXSHADOW.normal
                            }}
                        >
                            <MaterialCommunityIcons
                                name={CommonIcons.schoolGraduateHat}
                                size={24}
                                color={'white'}
                            />
                            <Text style={{ margin: 2, color: 'white', fontWeight: '700' }}>My Partner</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                width: '40%',
                                height: 70,
                                backgroundColor: '#a277dc',
                                margin: 12,
                                borderRadius: 6,
                                padding: 6,
                                alignItems: 'center',
                                ...BOXSHADOW.normal
                            }}
                            onPress={() => navigation.navigate('UserGroup')}
                        >
                            <MaterialCommunityIcons
                                name={CommonIcons.face_good}
                                size={24}
                                color={'white'}
                            />
                            <Text style={{ margin: 2, color: 'white', fontWeight: '700' }}>My Groups</Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                width: '40%',
                                height: 70,
                                backgroundColor: '#64b7f4',
                                margin: 12,
                                borderRadius: 6,
                                padding: 6,
                                alignItems: 'center',
                                ...BOXSHADOW.normal



                            }}
                        >
                            <MaterialCommunityIcons
                                name={CommonIcons.mapMarker}
                                size={24}
                                color={'white'}
                            />
                            <Text style={{ margin: 2, color: 'white', fontWeight: '700' }}>My Notification</Text>
                        </View>
                        <View
                            style={{
                                width: '40%',
                                height: 70,
                                backgroundColor: '#f8b427',
                                margin: 12,
                                borderRadius: 6,
                                padding: 6,
                                alignItems: 'center',
                                ...BOXSHADOW.normal


                            }}
                        >
                            <MaterialCommunityIcons
                                name={CommonIcons.star}
                                size={24}
                                color={'white'}
                            />
                            <Text style={{ margin: 2, color: 'white', fontWeight: '700' }}>My Progress</Text>
                        </View>
                    </View>
                </View>


                {/*  */}
                <View
                    style={{
                        backgroundColor: 'white',
                        borderTopRightRadius: 26,
                        borderTopLeftRadius: 26,
                        ...BOXSHADOW.normal,
                        padding: 12

                    }}
                >
                    {/* <ItemSetting 
                        label={'Settings'} 
                        iconName={CommonIcons.plusThick} 
                    /> */}
                    <ItemSetting label={'Notifications'} iconName={CommonIcons.plusThick} />
                    <ItemSetting
                        label={'Policy'}
                        iconName={CommonIcons.plusThick}
                        onPress={() => navigation.navigate('PrivacyPolicy')}

                    />
                    <ItemSetting label={'Sharing'} iconName={CommonIcons.plusThick} />
                    <ItemSetting label={'Supoport'} iconName={CommonIcons.plusThick} />

                </View>


                {/* Groups */}

                {/* <View style={{ marginHorizontal: 12 }}>
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
                </View> */}
                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 30
                    }}
                >
                    <LoginButton
                        onLoginFinished={(error, result) => {
                            if (error) {
                                console.log('login has error: ' + result);
                            } else if (result.isCancelled) {
                                console.log('login is cancelled.');
                            } else {
                                if (Platform.OS === 'ios') {
                                    AuthenticationToken.getAuthenticationTokenIOS().then((data) => {
                                        console.log(data?.authenticationToken);
                                    });
                                } else {
                                    AccessToken.getCurrentAccessToken().then((data) => {
                                        console.log(data?.accessToken.toString());
                                    });
                                }
                            }
                        }}
                        onLogoutFinished={_onLogOut}
                    />

                </View>
            </ScrollView>

        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({

})
