import { config } from "../constants/index";
import axios from 'axios'
import UserModel from '../models/userModel'
import { getUniqueId, getManufacturer, getDeviceId } from 'react-native-device-info';
import { getStorageData, setStorageData, setUserAuth } from "../StorageManager";
import AppManager from "../AppManager";

class AuthenticationAPI {

    constructor() {
        this.axios = axios
        this.facebook_graph = `https://graph.facebook.com/v11.0/me?`
        this.api_url = config.api_url
    }

    async signinWithFacebook(access_token) {
        try {
            let res = await this.axios.get(this.facebook_graph + `fields=id,name,link,picture{url}&access_token=${access_token}`);
            let resData = await res.data;
            console.log('sas: ',resData)
            let user = new UserModel(resData)
            user.device_id = getUniqueId()
            let signinData = await this.signin(
                user.id,
                user.username,
                user.image_path,
                user.device_id,
                'facebook',
                access_token
            )
            // console.log('signin data: ',signinData)
            // user.descriptions = signinData?.data?.descriptions
            // console.log('user:  ',user)
            // setUserAuth(user.toString())
            // AppManager.shared.user = user
            // setStorageData('access_token',signinData.access)
            // console.log('user modfel: ', user)
            // console.log('user signin: ', signinData)
            user.descriptions = signinData?.data?.descriptions
            user.access_token = signinData?.access

            user.setProfilePic(signinData?.data?.profile_pic)
            // AppManager.shared.user = signinData.data

            return user
        } catch (error) {
            AppManager.shared.user = null

            throw error
        }

    }

    async signin(id, username, profile_pic, device_id, provider, access_token) {
        try {

            let dataform = new FormData()
            dataform.append('id', id)
            dataform.append('username', username)
            dataform.append('profile_pic', profile_pic)
            dataform.append('device_id', device_id)
            dataform.append('provider', provider)
            dataform.append('access_token', access_token)
            let res = await this.axios.post(`${this.api_url}/conversation/v1/signin`, dataform, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let resData = await res.data
            return resData

        } catch (error) {
            console.warn('error : ', error.response?.data)
            throw error

        }

    }


    async updateNotificationId(notification_id) {
        let dataform = new FormData()
        dataform.append('notification_id', notification_id)

        let token = AppManager.shared.user.access_token
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


}

export default new AuthenticationAPI();
