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
import { getStorageData, setUserAuth } from '../../app/StorageManager'
import { StackActions, useNavigation } from '@react-navigation/native'
import AppManager from '../../app/AppManager'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AuthenticationAPI from '../../app/API/AuthenticationAPI'
import UserModel from '../../app/models/userModel'
import RNProgressHud from 'progress-hud';
import LoginItem from '../Authentication/components/LoginItem'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import CalendarProgress from './components/CalendarProgress'
import GoalProgress from './components/GoalProgress'
import PracticeProgressModel from '../../app/models/PracticeProgressModel'
import PracticeProgress from '../../app/DB/PracticeProgress'
import { format } from 'date-fns'
import CommonColor from '../../utils/CommonColor'
import { Switch } from 'react-native-paper';

const UPDATE_KEY = {
    ADDRESS: 'userAddress',
    NAME: 'userName',
    PASSWORD: 'userPassword',
    PHONE: 'phoneNumber',
    REFCODE: 'refCode'
}


const ProfileScreen = (props) => {
    const navigation = useNavigation()

    const user = AppManager.shared.user

    const [userProfile, setUserProfile] = useState(new UserModel(null))
    const [practiceProgress, setPracticeProgress] = useState(new PracticeProgressModel())
    const [practiceDates, setPracticeDates] = useState([])
    const [isPublic, setIsPublic] = useState(user.status)
    const _onLogOut = () => {
        console.log('logout')
        setUserAuth(null)
        // props.navigation.replace('VideoHome')
        AppManager.shared.user = null
        // dispatch(logout())
        LoginManager.logOut()
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
            if (res?.assets) {
                RNProgressHud.show()
                AuthenticationAPI.upadteAvatar(res?.assets[0])
                    .then((res) => {
                        if (res?.status_code === 200) {
                            let user = new UserModel(res?.data)
                            if (user?.profile_pic) {
                                let newUser = new UserModel(AppManager.shared.user.toString())
                                setUserAuth({ ...newUser, profile_pic: user.profile_pic })
                                // setUserAuth(AppManager.shared.user.toString())
                                setUserProfile(user)

                            }
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


    const _onUpdateUserStatus = () => {
        setIsPublic(!isPublic)
        let status = !isPublic ? 1 : 2
        AuthenticationAPI.updateUserInfo(status)
            .then(res => {
                console.log('rr: ', res)
                let user = AppManager.shared.user
                user.status = !isPublic
                setUserAuth(user.toString())

            })
            .catch(err => {
                console.log('err: ', err)
            })
            .then(() => {

            })
    }

    const _onShowUpdateScreen = () => {
        navigation.navigate('UpdateInfo',{
            key:UPDATE_KEY.NAME
        })
    }


    // useEffect(() => {
    //     console.warn('change')
    //     setUserProfile(user)
    // }, [user.profile_pic])


    React.useEffect(() => {
        setUserProfile(user)
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            PracticeProgress.getCurrentDatePractice()
                .then(res => {
                    setPracticeProgress(res)
                    // practiceProgress.practice_minutes = res?.practice_minutes
                })
            PracticeProgress.getPracticeProgress()
                .then(res => {
                    let dates = []
                    res?.map(e => {
                        if (e?.date != null && e?.practice_minutes >= e?.target_minutes) {
                            dates.push(format(new Date(e?.date), 'yyyy-MM-dd'))
                        }
                    })
                    setPracticeDates(dates)
                    // console.warn('get all: ', dates)
                })
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);



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

                <View>

                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            ...BOXSHADOW.normal,
                            borderBottomLeftRadius: 32,
                            borderBottomRightRadius: 32,
                            borderTopWidth: 0,
                            paddingTop: 30


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
                                    uri: userProfile?.profile_pic ?? CommonImages.avatar
                                }}
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    alignItems: 'center',
                                    borderWidth: 2,
                                    borderColor: CommonColor.primary,


                                }}
                                resizeMode={'cover'}
                            />


                        </TouchableOpacity>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flex:1,
                            }}
                        >
                            <Text numberOfLines={2} style={{ fontWeight: '700', flex:2,fontSize: 18, marginRight: 12 }}>{userProfile?.fullname}</Text>
                            <MaterialCommunityIcons
                                name={CommonIcons.accountEdit}
                                size={24}
                                color={CommonColor.primary}
                                onPress={_onShowUpdateScreen}
                                style={{
                                    flex:1
                                }}
                            />

                        </View>

                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 12 }}>
                        <Switch value={isPublic} onValueChange={_onUpdateUserStatus} />
                        <Text style={{ marginHorizontal: 12 }}>Everybody can see me?</Text>
                    </View>
                </View>


                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 12
                    }}
                >
                    <GoalProgress fill={(practiceProgress?.practice_minutes / practiceProgress?.target_minutes) * 100} />

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




                <CalendarProgress markedDates={practiceDates} />

                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 30,

                    }}
                >
                    {/* <LoginButton
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
                    /> */}
                    <LoginItem

                        label={'Logout'}
                        onPress={_onLogOut}
                        logoPath={require('../../app/assets/images/logo3.png')}
                    />
                </View>
            </ScrollView>

        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({

})
