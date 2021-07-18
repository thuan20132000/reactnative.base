import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import CommonColors from '../../utils/CommonColor';
import { ActivityIndicator, Button, HelperText, Snackbar, Title } from 'react-native-paper'
import { sigin } from '../../utils/api_v1';
import * as authenticationActions from '../../store/actions/authenticationActions';
import { useDispatch } from 'react-redux';



const A_Signin = () => {
    const dispatch = useDispatch();
    const [userAuth, setUserAuth] = useState({
        phonenumber: '1234567',
        password: 'Thuan123'
    });
    const [loginError, setLoginError] = useState();


    const [isLoading, setIsLoading] = useState(false);


    const _login = async () => {
        if (!userAuth.phonenumber || !userAuth.password) {
            setLoginError({
                message: "Please Enter full phonenumber and password!"
            });
            return;
        }
        setIsLoading(true);
        sigin(userAuth.phonenumber, userAuth.password)
            .then((res) => {
                console.warn(res);

                if (res.status) {
                    console.warn(res);
                    dispatch(authenticationActions.signin(res.data));
                    setLoginError('');
                } else {
                    if (res.message) {

                        setLoginError({ message: res.message });


                    }

                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <View style={styles.container}>


            <View style={styles.formLogoWrap}>
                {/* <Title
                    style={{
                        fontSize: 26,
                        color: CommonColors.primary
                    }}
                >
                    Dịch vụ 24/7
                    </Title>
                <Text
                    style={{
                        fontSize: 18,
                        color: CommonColors.primary
                    }}
                >
                    Xin chào!
                </Text> */}
            </View>

            <View style={styles.loginForm}>
                {
                    loginError?.message &&
                    <Text style={[styles.error]}>{loginError?.message}</Text>

                }

                <TextInput
                    style={[styles.inputLogin, {}]}
                    onChangeText={text => setUserAuth({ ...userAuth, phonenumber: text })}
                    value={userAuth.phonenumber}
                    placeholder={'Số điện thoại'}
                    keyboardType={'phone-pad'}

                />
                <TextInput
                    style={[styles.inputLogin, {}]}
                    onChangeText={text => setUserAuth({ ...userAuth, password: text })}
                    value={userAuth.password}
                    placeholder={'Mật khẩu'}
                    secureTextEntry={true}

                />
                <TouchableOpacity style={styles.buttonSubmit}
                    onPress={_login}
                    disabled={isLoading ? true : false}
                >
                    {
                        isLoading ? <ActivityIndicator /> :
                            <Text style={{ textAlign: 'center', fontWeight: '600', color: 'white', fontSize: 18 }}>Đăng Nhập</Text>

                    }
                </TouchableOpacity>
            </View>
        
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('register')}
                >
                    <Text>Đăng ký tài khoản mới?</Text>
                </TouchableOpacity>
            </View>
            


        </View>

    )
}

export default A_Signin

const styles = StyleSheet.create({
    formLogoWrap: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 32

    },
    inputLogin: {
        marginVertical: 6,
        padding: 6,
        paddingLeft: 18,
        borderRadius: 22,
        height: 50,
        backgroundColor: 'whitesmoke'
    },
    container: {
        backgroundColor: 'navajowhite',
        flex: 1
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 60,
        marginHorizontal: 16,

    },
    buttonSubmit: {
        backgroundColor: CommonColors.primary,
        padding: 12,
        width: 220,
        alignSelf: 'center',
        borderRadius: 22,
        marginVertical: 16
    },
    socialNetworkLogin: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'

    },
    error: {
        color: 'red',
        textAlign: 'center'
    }

})
