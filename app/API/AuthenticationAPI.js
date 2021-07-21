import { config } from "../constants/index";
import axios from 'axios'
import UserModel from '../models/userModel'
import { getUniqueId, getManufacturer, getDeviceId } from 'react-native-device-info';

class AuthenticationAPI {

    constructor() {
        this.axios = axios
        this.facebook_graph = `https://graph.facebook.com/v11.0/me?`
    }

    async signinWithFacebook(access_token) {
        try {
            let res = await this.axios.get(this.facebook_graph + `fields=id,name,link,picture{url}&access_token=${access_token}`);
            let resData = await res.data;
            let user = new UserModel(resData)
            user.token = access_token
            user.device_id = getUniqueId()
            let signinData = await this.signin(
                user.id,
                user.name,
                user.image_path,
                user.device_id,
                'facebook',
                access_token
            )
            return user
        } catch (error) {
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
            let res = await this.axios.post(`http://192.168.1.4:8000/conversation/v1/signin`, dataform, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let resData = await res.data
            return resData

        } catch (error) {
            throw error

        }

    }


}

export default new AuthenticationAPI();