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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AuthenticationAPI from '../../app/API/AuthenticationAPI'
import UserModel from '../../app/models/userModel'
import RNProgressHud from 'progress-hud';

const ProfileScreen = (props) => {
    const navigation = useNavigation()

    const user = AppManager.shared.user

    const [userProfile, setUserProfile] = useState(new UserModel(null))
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



    const _onUpdateAvatar = () => {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            quality: 0.5,
            selectionLimit: 1,

        }, (res) => {
            console.log(res)
            if (res?.assets) {
                RNProgressHud.show()
                AuthenticationAPI.upadteAvatar(res?.assets[0])
                    .then((res) => {
                        if (res?.status_code === 200) {
                            let user = new UserModel(res?.data)
                            console.log(user)
                            AppManager.shared.user?.setProfilePic(user?.profile_pic)
                            setUserProfile({ ...userProfile, profile_pic: user?.profile_pic })
                        }

                    })
                    .catch(err => {
                        console.warn('err: ', err)
                    })
                    .finally(() => {
                        RNProgressHud.dismiss()
                    })

            }
        })

    }


    // useEffect(() => {
    //     console.warn('change')
    //     setUserProfile(user)
    // }, [user.profile_pic])


    return (
        <View
            style={{
                backgroundColor: 'white',
                flex: 1
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: 22
                }}
            >

                <View
                    style={{
                        alignItems: 'center',

                    }}
                >
                    <TouchableOpacity
                        style={{

                            margin: 12,
                            padding: 12,
                        }}
                        onPress={_onUpdateAvatar}

                    >
                        <Image
                            source={{
                                uri: user?.profile_pic ?? CommonImages.avatar
                            }}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                alignItems: 'center',
                                borderWidth: 4,
                                borderColor: 'white'

                            }}
                            resizeMode={'cover'}
                        />


                    </TouchableOpacity>

                    <Text style={{ fontWeight: '700', fontSize: 18 }}>{user?.username}</Text>
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
                    <Text>{user?.descriptions}</Text>
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
                        <TouchableOpacity
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
                            onPress={() => navigation.navigate('FriendList')}

                        >
                            <MaterialCommunityIcons
                                name={CommonIcons.schoolGraduateHat}
                                size={24}
                                color={'white'}
                            />
                            <Text style={{ margin: 2, color: 'white', fontWeight: '700' }}>
                                My Friends
                            </Text>
                        </TouchableOpacity>
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
                                name={CommonIcons.person}
                                size={24}
                                color={'white'}
                            />
                            <Text style={{ margin: 2, color: 'white', fontWeight: '700' }}>My Groups</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
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
                            onPress={() => navigation.navigate('Notification')}

                        >
                            <MaterialCommunityIcons
                                name={CommonIcons.bell}
                                size={24}
                                color={'white'}
                            />
                            <Text style={{ margin: 2, color: 'white', fontWeight: '700' }}>My Notification</Text>
                        </TouchableOpacity>
                        {/* <View
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
                        </View> */}
                    </View>
                </View>


                {/*  */}
                {/* <View
                    style={{
                        backgroundColor: 'white',
                        borderTopRightRadius: 26,
                        borderTopLeftRadius: 26,
                        ...BOXSHADOW.normal,
                        padding: 12

                    }}
                >
                    <ItemSetting 
                        label={'Settings'} 
                        iconName={CommonIcons.plusThick} 
                    />
                    <ItemSetting label={'Notifications'} iconName={CommonIcons.plusThick} />
                    <ItemSetting
                        label={'Policy'}
                        iconName={CommonIcons.plusThick}
                        onPress={() => navigation.navigate('PrivacyPolicy')}

                    />
                    <ItemSetting label={'Sharing'} iconName={CommonIcons.plusThick} />
                    <ItemSetting label={'Supoport'} iconName={CommonIcons.plusThick} />

                </View> */}


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
