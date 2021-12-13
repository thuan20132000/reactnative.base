import axios from 'axios'
import Constants from '../constants/Constant'


export default class BaseAPI {

    protected axios = axios
    protected facebook_graph = `https://graph.facebook.com/v11.0/me?`
    protected api_url = Constants.config.api_url
    constructor() {
        this.axios = axios
        this.facebook_graph = this.facebook_graph
        this.api_url = this.api_url
    }

    protected success(data) {
        return data
    }

    protected failed(error){
        return error
    }
}