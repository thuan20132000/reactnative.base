import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import CommonColors from '../../utils/CommonColor';
import { ActivityIndicator, Button, HelperText, Snackbar, Title } from 'react-native-paper'

const A_Signin = () => {

    const [userAuth, setUserAuth] = useState({
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState();


    const [isLoading, setIsLoading] = useState(false);


    const _login = async () => {

    }

    return (
        <View style={styles.container}>


            <View style={styles.formLogoWrap}>
                <Title
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
                </Text>
            </View>

            <View style={styles.loginForm}>
                <TextInput
                    style={[styles.inputLogin, {}]}
                    onChangeText={text => setUserAuth({ ...userAuth, email: text })}
                    value={userAuth.email}
                    placeholder={'Số điện thoại'}

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
                >
                    {
                        isLoading ? <ActivityIndicator /> :
                            <Text style={{ textAlign: 'center', fontWeight: '600', color: 'white', fontSize: 18 }}>Đăng Nhập</Text>

                    }
                </TouchableOpacity>
            </View>
            <View style={styles.socialNetworkLogin}>
                <Button style={{ marginRight: 16 }}
                    labelStyle={{
                        color: 'white'
                    }}
                    icon="facebook"
                    mode="contained" onPress={() => console.log('Pressed')}
                >
                    Facebook
                    </Button>
                <Button
                    labelStyle={{
                        color: 'white'
                    }}
                    color={'salmon'}
                    icon="google"
                    mode="contained" onPress={() => console.log('Pressed')}
                >
                    Google
                    </Button>
            </View>
            {/* <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity
                    onPress={() => console.warn('ds')}
                >
                    <Text>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View> */}
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
        marginHorizontal: 16,
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
        marginTop: 60
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

    }

})
