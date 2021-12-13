import axios from 'axios'
import UserModel from '../models/userModel'
import { getUniqueId, getManufacturer, getDeviceId } from 'react-native-device-info';
import { getStorageData, setStorageData, setUserAuth } from "../StorageManager";
import AppManager from "../AppManager";
import ProviderEnums from "../Enums/ProviderEnums";
import Constants from '../constants/Constant';
class AuthenticationAPI {

    constructor() {
        this.axios = axios
        this.facebook_graph = `https://graph.facebook.com/v11.0/me?`
        this.api_url = Constants.config.api_url
    }


    async signin(provider = ProviderEnums.FACEBOOK, access_token) {
        try {
            let dataform = new FormData()
            dataform.append('provider', provider)
            dataform.append('access_token', access_token)
            let res = await this.axios.post(`${this.api_url}/conversation/v1/signin`, dataform, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            let resData = await res.data
            let user = new UserModel(resData?.data)
            user.access_token = resData?.access
            AppManager.shared.user = user
            setUserAuth(user.toString())

            return user

        } catch (error) {
            // console.warn('error : ', error.response?.data)
            throw error

        }

    }


    async updateNotificationId(notification_id) {
        let dataform = new FormData()
        dataform.append('notification_id', notification_id)

        let token = AppManager.shared.user?.access_token
        let res = await this.axios.put(`${this.api_url}/conversation/v1/user-notification`, dataform, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`

            }
        });
        let resData = await res.data
        return resData

    }


    async upadteAvatar(avatar_file) {
        const imageData = {
            uri: avatar_file?.uri,
            type: avatar_file?.type,
            name: avatar_file?.filename || Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
        }
        const formData = new FormData()
        formData.append('image_file', imageData)


        let token = AppManager.shared.user.access_token
        let res = await this.axios.put(`${this.api_url}/conversation/v1/update-avatar`, formData, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`

            }
        });
        let resData = await res.data
        return resData

    }

    async updateUserInfo({ status = '', username = '' }) {
        try {
            const formData = new FormData()
            formData.append('status', status)
            formData.append('username', username)
            let token = AppManager.shared.user.access_token
            let res = await this.axios.put(`${this.api_url}/conversation/v1/update-info`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`

                }
            });
            let resData = await res.data
            return new UserModel(resData?.data)

        } catch (error) {
            throw error
        }

    }


}

export default new AuthenticationAPI();
