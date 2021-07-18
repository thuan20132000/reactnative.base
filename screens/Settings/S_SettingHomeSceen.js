import React from 'react'
import { Image, StyleSheet, Text, View, Linking, Share } from 'react-native'
import CommonIcons from '../../utils/CommonIcons'
import RowItem from '../Settings/components/RowItem'
import LearningActivities from './components/LearningActivities'
import {
    AccessToken,
    AuthenticationToken,
    LoginButton,
    LoginManager
} from 'react-native-fbsdk-next';
import { setUserAuth } from '../../app/StorageManager';
import AppManager from '../../app/AppManager'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions/authenticationActions'

const S_SettingHomeSceen = (props) => {

    const dispatch = useDispatch();

    const _onOpenSharing = async () => {
        try {
            const result = await Share.share({
                message:
                    'https://play.google.com/store/apps/details?id=com.english_practice_askmeit',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }

    }


    const _onOpenAppReview = async () => {
        let url = "https://play.google.com/store/apps/details?id=com.english_practice_askmeit";
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }

    }

    const _onLogOut = async () => {
        console.log('logout')
        setUserAuth(null)
        // props.navigation.replace('VideoHome')
        AppManager.shared.user = null
        dispatch(logout())

    }

    return (
        <View
            style={{
                backgroundColor: 'white',
                display: 'flex',
                flex: 1
            }}
        >


            {/* <View>
                <LearningActivities />
            </View> */}

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',

                }}
            >
                <Image
                    source={
                        require('../../utils/photos/logo3.png')
                    }
                    resizeMode={'contain'}
                    style={{
                        width: 220,
                        height: 220
                    }}
                />
            </View>
            <RowItem
                label={"Nhắc nhở"}
                leftIconName={CommonIcons.bell}
                leftIconStyle={{
                    color: 'coral'
                }}
                containerStyle={[styles.itemContainer]}
                leftIconSize={26}
                labelStyle={{
                    marginLeft: 16,
                    fontSize: 16
                }}
                onItemPress={() => props.navigation.navigate('VocabularyRemind')}
            />
            <RowItem
                label={"Lịch sử tìm kiếm"}
                leftIconName={CommonIcons.search}
                leftIconStyle={{
                    color: 'coral'
                }}
                containerStyle={[styles.itemContainer]}

                leftIconSize={26}
                labelStyle={{
                    marginLeft: 16,
                    fontSize: 16

                }}
                onItemPress={() => props.navigation.navigate('SearchHistory')}

            />
            {/* <RowItem
                label={"Ngữ pháp tiếng anh"}
                leftIconName={CommonIcons.account}
                containerStyle={[styles.itemContainer]}

                leftIconSize={26}
                labelStyle={{
                    marginLeft: 16,
                    fontSize: 16

                }}
            /> */}
            {/* <RowItem
                label={"Đóng góp cải thiện"}
                leftIconName={CommonIcons.face_good}
                leftIconStyle={{
                    color: 'coral'
                }}
                containerStyle={[styles.itemContainer]}

                leftIconSize={26}
                labelStyle={{
                    marginLeft: 16,
                    fontSize: 16

                }}
                onItemPress={() => props.navigation.navigate('Contribution')}

            /> */}
            <RowItem
                label={"Đánh giá ủng hộ ứng dụng trên Google Play"}
                leftIconName={CommonIcons.bookMarker}
                leftIconStyle={{
                    color: 'coral'
                }}
                containerStyle={[styles.itemContainer]}

                leftIconSize={26}
                labelStyle={{
                    marginLeft: 16,
                    fontSize: 16
                }}
                onItemPress={_onOpenAppReview}

            />
            <RowItem
                label={"Chia sẻ ứng dụng với bạn bè"}
                leftIconName={CommonIcons.shareVariant}
                leftIconStyle={{
                    color: 'coral'
                }}
                containerStyle={[styles.itemContainer]}

                leftIconSize={26}
                labelStyle={{
                    marginLeft: 16,
                    fontSize: 16

                }}
                onItemPress={_onOpenSharing}
            />
            <RowItem
                label={"Privacy Policy"}
                leftIconName={CommonIcons.checkProgress}
                leftIconStyle={{
                    color: 'coral'
                }}
                containerStyle={[styles.itemContainer]}

                leftIconSize={26}
                labelStyle={{
                    marginLeft: 16,
                    fontSize: 16

                }}
                onItemPress={() => props.navigation.navigate('PrivacyPolicy')}
            />
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
                                console.log('adta: ', data)
                            
                            });
                        }
                    }
                }}
                onLogoutFinished={_onLogOut}
                loginTrackingIOS={'limited'}
                nonceIOS={'my_nonce'}

            />

            <View
                style={[
                    {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 12
                    }
                ]}
            >

                <Text
                    style={{
                        color: 'grey',
                        fontSize: 12,
                        fontWeight: '100',
                        fontStyle: 'italic'
                    }}
                >
                    version 1.0
                </Text>
            </View>
        </View>
    )
}

export default S_SettingHomeSceen

const styles = StyleSheet.create({
    itemContainer: {
        paddingVertical: 12
    }
})
