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


const ProfileScreen = (props) => {
    const navigation = useNavigation()

    const user = AppManager.shared.user

    const [userProfile, setUserProfile] = useState(new UserModel(null))
    const [practiceProgress, setPracticeProgress] = useState(new PracticeProgressModel())
    const [practiceDates, setPracticeDates] = useState([])

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



    React.useEffect(() => {
        console.log('focused')

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
                    console.warn('ssa: ', res)
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


                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 30,
                    }}
                >
                    <Text>Today Goal</Text>
                    <GoalProgress fill={(practiceProgress?.practice_minutes / practiceProgress.target_minutes) * 100} />

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
