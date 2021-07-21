
import { config } from "../constants/index";
import axios from 'axios'

class ConversationAPI {

    constructor() {
        this.api_url = config.api_url
        this.axios = axios
    }

    async getAllConversationPost(topic_id=null) {
        let path = `/conversation/v1/conversations-post`;
        path = topic_id == null?path:`${path}?topic=${topic_id}`
        return this.axios.get(this.api_url + path, {
            params: {}
        })
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            })
    }

    async getConversationTopicList(post_id=null) {
        let path = `/conversation/v1/conversations-topic`;
        return this.axios.get(this.api_url + path, {
            params: {}
        })
            .then(function (response) {
                return response.data
            })
            .catch(function(error){
                throw error
            })
    }

    async getConversationPostDetail(conversation_id){
        let path = `/conversation/v1/conversations-post/${conversation_id}`;
        return this.axios.get(this.api_url + path, {
            params: {}
        })
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            })
    }


}

export default new ConversationAPI();