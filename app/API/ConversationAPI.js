
import { config } from "../constants/index";
import axios from 'axios'
import AppManager from "../AppManager";
import { getStorageData, getUserAuth } from "../StorageManager";
import FriendShipEnum from "../Enums/FriendShipEnum";




function getUserAccessToken(resolve) {
    getUserAuth().then(res => resolve(res))
}
class ConversationAPI {

    constructor() {
        this.api_url = config.api_url
        this.axios = axios
        this.headers = ''

    }


    async getAllConversationTopic() {
        let path = `/conversation/v1/conversations-topic`;
        let token = AppManager.shared.user.access_token
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


    async getAllConversationPost(topic_id = null) {
        let path = `/conversation/v1/conversations-post`;
        path = topic_id == null ? path : `${path}?topic_id=${topic_id}`
        let token = AppManager.shared.user?.access_token
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
        let token = AppManager.shared.user.access_token

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
        let token = AppManager.shared.user.access_token

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
            let token = AppManager.shared.user.access_token

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
            let token = AppManager.shared.user.access_token

            let path = `/conversation/v1/create-conversation-group`;
            let bodyData = new FormData()
            bodyData.append('name', groupName)
            bodyData.append('conversation_id', conversation_id)

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
            let token = AppManager.shared.user.access_token

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

    async removeGroup(groupId) {
        try {
            let token = AppManager.shared.user.access_token
            let path = `/conversation/v1/conversation-group/${groupId}`;
            let res = await this.axios.post(this.api_url + path, {}, {
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

    async getAllLearners() {
        try {
            let token = AppManager.shared.user.access_token
            let path = `/conversation/v1/users`;
            let res = await this.axios.get(this.api_url + path, {
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

    async getUserGroups(user_id) {
        try {
            let token = AppManager.shared.user.access_token
            let path = `/conversation/v1/user-groups/${user_id}`;
            let res = await this.axios.get(this.api_url + path, {
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


    async getUserInformation(user_id) {
        try {
            let token = AppManager.shared.user.access_token
            let path = `/conversation/v1/user-groups/${user_id}`;
            let res = await this.axios.get(this.api_url + path, {
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

    async makeFriendship(recipient_id) {
        try {
            let token = AppManager.shared.user.access_token
            let path = `/conversation/v1/friendship`;
            let body = new FormData()
            body.append('recipient_id', recipient_id)
            // let body = {
            //     recipient_id: recipient_id
            // }
            let res = await this.axios.post(this.api_url + path, body, {
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

    async handleFriendshipRequest(friendship_id, request_status) {
        try {
            let token = AppManager.shared.user.access_token
            let path = `/conversation/v1/friendship/${friendship_id}`;
            let body = new FormData()
            body.append('request_status', request_status)

            console.warn(body)
            let res = await this.axios.put(this.api_url + path, body, {
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

    async getUserNotifications() {
        try {
            let token = AppManager.shared.user.access_token
            let path = `/conversation/v1/user-notifications`;
            let res = await this.axios.get(this.api_url + path, {
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


    async getUserFriendRequests() {
        try {
            let token = AppManager.shared.user.access_token
            let path = `/conversation/v1/user-friend-request`;
            let res = await this.axios.get(this.api_url + path, {
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

    async getUserProfile(user_id) {
        try {
            let token = AppManager.shared.user.access_token
            console.warn(user_id)
            let path = `/conversation/v1/user-profile/${user_id}`;
            let res = await this.axios.get(this.api_url + path, {
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


    async getUserFriendShip(status = FriendShipEnum.ACCEPTED) {
        try {
            let token = AppManager.shared.user.access_token
            let path = `/conversation/v1/user-friendships/${status}`;
            let res = await this.axios.get(this.api_url + path, {
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


    async getConversationGroupDetail(group_id) {
        try {
            let token = AppManager.shared.user.access_token
            let path = `/conversation/v1/conversation-group-detail/${group_id}`;
            let res = await this.axios.get(this.api_url + path, {
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

    async inviteFriendShipToConversation(friendship_id, group_id) {
        try {
            let body = new FormData()
            body.append('friendship_id', friendship_id)
            body.append('group_id', group_id)

            let token = AppManager.shared.user.access_token
            let path = `/conversation/v1/invite-friendship-conversation`;
            let res = await this.axios.post(this.api_url + path, body, {
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