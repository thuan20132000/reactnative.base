
import { config } from "../constants/index";
import axios from 'axios'
import AppManager from "../AppManager";
import { getStorageData, getUserAuth } from "../StorageManager";




function getUserAccessToken(resolve) {
    getUserAuth().then(res => resolve(res))
}
class ConversationAPI {

    constructor() {
        this.api_url = config.api_url
        this.axios = axios
        this.headers = ''

    }


    async getAllConversationPost(topic_id = null) {
        let path = `/conversation/v1/conversations-post`;
        path = topic_id == null ? path : `${path}?topic=${topic_id}`
        let token = await getStorageData('access_token')
        return this.axios.get(this.api_url + path, {
            params: {},
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            })
    }

    async getConversationTopicList(post_id = null) {
        let path = `/conversation/v1/conversations-topic`;
        let token = await getStorageData('access_token')

        return this.axios.get(this.api_url + path, {
            params: {},
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error
            })
    }

    async getConversationPostDetail(conversation_id) {
        let path = `/conversation/v1/conversations-post/${conversation_id}`;
        let token = await getStorageData('access_token')

        return this.axios.get(this.api_url + path, {
            params: {},
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                throw error?.message
            })
    }

    async getConversationGroup(conversation_id) {
        try {
            let token = await getStorageData('access_token')

            let path = `/conversation/v1/conversation-groups/${conversation_id}`;
            let res = await this.axios.get(this.api_url + path, {
                params: {},
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            let dataRes = await res.data
            return dataRes

        } catch (error) {
            throw error
        }
    }

    async createConversationGroup(groupName, conversation_id) {
        try {
            let token = await getStorageData('access_token')

            let path = `/conversation/v1/create-conversation-group`;
            let bodyData = new FormData()
            bodyData.append('name', groupName)
            bodyData.append('conversation_id', conversation_id)

            console.log(this.headers)
            let res = await this.axios.post(this.api_url + path, bodyData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            let dataRes = await res.data
            return dataRes

        } catch (error) {
            throw error
        }
    }

    async getGroupMember(groupId) {
        try {
            let token = await getStorageData('access_token')
            console.log('tk: ',token)

            let path = `/conversation/v1/conversation-group-member/${groupId}`;
            let res = await this.axios.get(this.api_url + path, {
                params: {},
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            let dataRes = await res.data
            return dataRes

        } catch (error) {
            throw error
        }
    }



}

export default new ConversationAPI();