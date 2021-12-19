
import axios from 'axios'
import AppManager from "../AppManager";
import { getStorageData, getUserAuth } from "../StorageManager";

import BaseAPI from './BaseAPI';




function getUserAccessToken(resolve) {
    getUserAuth().then(res => resolve(res))
}
class CommunityAPI extends BaseAPI {

    constructor() {
        super()
        this.api_url = this.api_url + '/community/v1/'
    }

    public async getPostList() {
        try {
            let token = AppManager.shared.user.access_token
            let endpoint = `posts`
            let response = await this.axios.get(this.api_url + endpoint, {
                params: {},
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return this.success(response.data)
        } catch (error) {
            return this.failed(error)
        }

    }

    public async getUserPostList() {
        try {
            let token = AppManager.shared.user.access_token
            let endpoint = `user-posts`
            let response = await this.axios.get(this.api_url + endpoint, {
                params: {},
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return this.success(response.data)
        } catch (error) {
            return this.failed(error)
        }

    }

    public async deleteUserPost(id: number) {
        try {
            let token = AppManager.shared.user.access_token
            let endpoint = `post-delete/${id}`
            let response = await this.axios.post(this.api_url + endpoint, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return this.success(response.data)
        } catch (error) {
            return this.failed(error)
        }
    }
    public async getPostDetail(id: number) {
        try {
            let token = AppManager.shared.user.access_token
            let endpoint = `post/${id}`
            let response = await this.axios.get(this.api_url + endpoint, {
                params: {},
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return this.success(response.data)
        } catch (error) {
            return this.failed(error)
        }
    }

    public async togglePostFavorite(id: number) {
        try {
            let token = AppManager.shared.user.access_token
            let endpoint = `post/${id}/toggle-favorite`
            let response = await this.axios.post(this.api_url + endpoint, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return this.success(response.data)
        } catch (error) {
            return this.failed(error)
        }
    }


    public async getPostComments(id: number) {
        try {
            let token = AppManager.shared.user.access_token
            let endpoint = `post/${id}/comments`
            let response = await this.axios.get(this.api_url + endpoint, {
                params: {},
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return this.success(response.data)
        } catch (error) {
            return this.failed(error)
        }
    }


    public async addPostComment(id: number, content: string, record: any) {
        try {
            let token = AppManager.shared.user.access_token
            let endpoint = `post/${id}/comment`
            let formdata = new FormData()
            formdata.append('content', content)
            formdata.append('record', record)

            console.log('ss: ', record)

            let response = await this.axios.post(this.api_url + endpoint, formdata, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return this.success(response.data)
        } catch (error) {
            return this.failed(error)
        }
    }

    public async togglePostCommentFavorite(id: number, comment_id: number) {
        try {
            let token = AppManager.shared.user.access_token
            let endpoint = `post/${id}/comment/${comment_id}/favorite`

            let response = await this.axios.post(this.api_url + endpoint, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return this.success(response.data)
        } catch (error) {
            return this.failed(error)
        }
    }

    public async createPost(post: any) {
        try {
            let token = AppManager.shared.user.access_token
            let endpoint = `post/create-post`
            let formdata = new FormData()
            formdata.append('title', post.title)
            formdata.append('record', post.record)
            formdata.append('image', post.image)

            let response = await this.axios.post(this.api_url + endpoint, formdata, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            return this.success(response.data)
        } catch (error) {
            return this.failed(error)
        }
    }
}

export default new CommunityAPI()