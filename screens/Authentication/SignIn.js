import React, { useState } from 'react'
import { View, Platform, StyleSheet, Image, Text, Pressable } from 'react-native';
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
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import CommonColor from '../../utils/CommonColor';
import { TouchableOpacity } from 'react-native-gesture-handler';

// GoogleSignin.configure({
//     iosClientId: '762174979149-d0nu6ershjiqm54t67k0o35dusaeg0hn.apps.googleusercontent.com',
//     webClientId:'762174979149-ngvoeikmu5mcb67k9el43f5bnhstoaod.apps.googleusercontent.com',

// });
const SignIn = (props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const [isAgreePolicy, setAgreePolicy] = useState(true)

    const _onGetUserInfo = async (access_token) => {
        RNProgressHud.show()
        authenticationAPI.signinWithFacebook(access_token)
            .then((res) => {
                if (res) {
                    AppManager.shared.user = res
                    dispatch(signin(res))
                    setUserAuth(res.toString())
                    navigation.dispatch(
                        StackActions.replace('HomeStack')
                    )

                }
            })
            .catch((err) => {
                console.log('error: ', err)
                LoginManager.logOut()
            })
            .finally(() => RNProgressHud.dismiss())
    }

    const _onLoginFacebook = () => {

        if(!isAgreePolicy){
            return
        }

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

    const _onOpenPrivacy = () => {
        navigation.navigate('Webview', {
            url: 'https://english-practice.flycricket.io/privacy.html'
        })
    }

    const _onOpenTerm = () => {
        navigation.navigate('Webview', {
            url: 'https://english-practice.flycricket.io/terms.html'
        })
    }

    async function onAppleButtonPress(updateCredentialStateForUser) {
        console.warn('Beginning Apple Authentication');
        if(!isAgreePolicy){
            return
        }
        RNProgressHud.show()

        // start a login request
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                // requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            console.log('appleAuthRequestResponse', appleAuthRequestResponse);

            const {
                user,
                email,
                fullName,
                nonce,
                identityToken,
                realUserStatus /* etc */,
                authorizationCode
            } = appleAuthRequestResponse;


            authenticationAPI.signinWithApple(fullName?.givenName, user, authorizationCode)
                .then(res => {

                    if (res.access_token) {
                        AppManager.shared.user = res
                        dispatch(signin(res))
                        setUserAuth(res.toString())
                        navigation.dispatch(
                            StackActions.replace('HomeStack')
                        )

                    }
                })
                .catch(err => {
                    console.warn('error: ', err)
                })

            console.warn(`Apple Authentication Completed, ${user}, ${email}`);
        } catch (error) {
            if (error.code === appleAuth.Error.CANCELED) {
                console.warn('User canceled Apple Sign in.');
            } else {
                console.error(error);
            }
        }
        RNProgressHud.dismiss()
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

            {
                Platform.OS === 'ios' &&
                <LoginItem
                    label={'Apple'}
                    logoPath={require('../../app/assets/images/ic_apple.png')}
                    onPress={onAppleButtonPress}
                />

            }
            {/* <LoginItem
                label={'Google'}
                logoPath={require('../../app/assets/images/ic_gmail.png')}
                onPress={_onLoginGoogle}
            /> */}

            <View
                style={{
                    marginVertical: 60,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 12,
                    paddingHorizontal: 14
                }}
            >

                {
                    isAgreePolicy ?
                        <MaterialCommunityIcons
                            name={CommonIcons.checkboxCircleMark}
                            color={CommonColor.primary}
                            size={26}
                            onPress={() => setAgreePolicy(false)}
                        /> :
                        <MaterialCommunityIcons
                            name={CommonIcons.checkboxCircleBlank}
                            color={CommonColor.primary}
                            size={26}
                            onPress={() => setAgreePolicy(true)}

                        />

                }
                {/* <TouchableOpacity
                    style={{

                    }}
                    onPress={_onOpenPrivacy}

                > */}
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',

                    width: '100%',
                    flexWrap: 'wrap',
                    marginLeft: 12
                }}>
                    <Text style={{ fontSize: 14 }}> By using our app you agree to our </Text>
                    <Text
                        onPress={_onOpenTerm}
                        style={{ color: CommonColor.primary, fontSize: 14 }}
                    >
                        Terms and Conditions
                    </Text>
                    <Text style={{ fontSize: 14 }}> and </Text>
                    <Text
                        style={{ color: CommonColor.primary, fontSize: 14 }}
                        onPress={_onOpenPrivacy}
                    >
                        Privacy Policy
                    </Text>

                </View>
                {/* </TouchableOpacity> */}
            </View>
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
