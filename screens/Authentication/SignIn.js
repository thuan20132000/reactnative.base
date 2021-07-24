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


const SignIn = (props) => {

    const dispatch = useDispatch();
    const _onGetUserInfo = async (access_token) => {

        authenticationAPI.signinWithFacebook(access_token)
            .then((res) => {
                if (res) {
                    AppManager.shared.access_token = res.access_token
                    dispatch(signin(res))
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
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={require('../../app/assets/images/ic_fb.png')}
                    style={{
                        width: 100,
                        height: 100,
                       
                        marginBottom: 22,
                       
                    }}
                />
                <ButtonText
                    label={'login'}
                    onItemPress={_onLogin}
                    containerStyle={styles.loginButton}
                    labelStyle={{
                        fontWeight: '700',
                        fontSize: 18
                    }}
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
