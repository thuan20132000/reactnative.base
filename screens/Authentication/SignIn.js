import React from 'react'
import { View, Platform, StyleSheet } from 'react-native';
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


const SignIn = (props) => {

    const dispatch = useDispatch();
    const _onGetUserInfo = async (access_token) => {
        console.warn(access_token)

        authenticationAPI.signinWithFacebook(access_token)
            .then((res) => {
                if (res) {
                    let user = new UserModel(res)
                    user.token = access_token
                    AppManager.shared.user = user
                    setUserAuth(user.toString())
                    dispatch(signin(user))
                }
            })
            .catch((err) => {
                console.warn('error: ', err)
            })
    }

    const _onLogin = () => {
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

    const _onLogOut = async () => {
        console.log('logout')
        setUserAuth(null)
    }




    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <ButtonText
                label={'login'}
                onItemPress={_onLogin}

            />
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
                                _onGetUserInfo(data?.accessToken.toString())
                            });
                        }
                    }
                }}
                onLogoutFinished={_onLogOut}
                loginTrackingIOS={'limited'}
                nonceIOS={'my_nonce'}

            /> */}
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({})
