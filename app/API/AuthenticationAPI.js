import { config } from "../constants/index";
import axios from 'axios'

class AuthenticationAPI {

    constructor() {
        this.axios = axios
        this.facebook_graph = `https://graph.facebook.com/v11.0/me?`
    }

    async signinWithFacebook(access_token){
        return this.axios.get(this.facebook_graph+`fields=id,name,link,picture{url}&access_token=${access_token}`)
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            }
        )
    }


}

export default new AuthenticationAPI();