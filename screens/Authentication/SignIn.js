import React from 'react'
import { View, Platform, StyleSheet, Image } from 'react-native';
import {
    AccessToken,
    AuthenticationToken,
    LoginButton,
    LoginManager
} from 'react-native-fbsdk-next';
import { useDispatch } from 'react-redux';
import authenticationAPI from '../../app/API/AuthenticationAPI';
import AppManager from '../../app/AppManager';
import UserModel from '../../app/models/userModel';
import { setUserAuth } from '../../app/StorageManager';
import ButtonText from '../../components/Button/BottonText';
import { signin } from '../../store/actions/authenticationActions';
// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
// } from '@react-native-google-signin/google-signin';

import RNProgressHud from 'progress-hud';
import LoginItem from './components/LoginItem';
import { StackActions, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../utils/CommonIcons';
import { App } from 'realm';

// GoogleSignin.configure({
//     iosClientId: '762174979149-d0nu6ershjiqm54t67k0o35dusaeg0hn.apps.googleusercontent.com',
//     webClientId:'762174979149-ngvoeikmu5mcb67k9el43f5bnhstoaod.apps.googleusercontent.com',

// });
const SignIn = (props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const _onGetUserInfo = async (access_token) => {
        RNProgressHud.show()
        authenticationAPI.signinWithFacebook(access_token)
            .then((res) => {
                if (res) {
                    console.log('sa: ',res)
                    AppManager.shared.user = res
                    dispatch(signin(res))
                    setUserAuth(res.toString())
                    navigation.dispatch(
                        StackActions.replace('HomeStack')
                    )

                }
            })
            .catch((err) => {
                console.warn('error: ', err)
                LoginManager.logOut()
            })
            .finally(() => RNProgressHud.dismiss())
    }

    const _onLoginFacebook = () => {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    AccessToken.getCurrentAccessToken()
                        .then((data) => {
                            _onGetUserInfo(data.accessToken.toString())
                        })
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString()
                    );
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    // const _onLoginGoogle = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         console.log('sdasdsa ',userInfo)
    //     } catch (error) {
    //         console.log('err: ',error.message)
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             // operation (e.g. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             // play services not available or outdated
    //         } else {
    //             // some other error happened
    //         }
    //     }
    // }

    const _onLogOut = async () => {
        console.log('logout')
        setUserAuth(null)
    }


    const _onBackHome = () => {
        navigation.dispatch(
            StackActions.replace('HomeStack')
        )
    }



    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white'
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    marginBottom: 32

                }}
            >
                <Image
                    source={
                        require('../../utils/photos/logo3.png')
                    }
                    resizeMode={'contain'}
                    style={{
                        width: 180,
                        height: 180
                    }}
                />
            </View>
            <LoginItem
                label={'Facebook'}
                logoPath={require('../../app/assets/images/ic_fb.png')}
                onPress={_onLoginFacebook}
            />
            {/* <LoginItem
                label={'Google'}
                logoPath={require('../../app/assets/images/ic_gmail.png')}
                onPress={_onLoginGoogle}
            /> */}

            <View
                style={{
                    position: 'absolute',
                    bottom: 30,
                    left: 30,
                }}
            >

                <MaterialCommunityIcons
                    name={CommonIcons.arrowLeft}
                    size={44}
                    onPress={_onBackHome}

                />

            </View>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    loginButton: {
        width: 220,
        paddingVertical: 12
    }
})
