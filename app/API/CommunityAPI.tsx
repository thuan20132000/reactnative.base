
import axios from 'axios'
import AppManager from "../AppManager";
import Constants from '../constants/Constant';
import { getStorageData, getUserAuth } from "../StorageManager";

import BaseAPI from './BaseAPI';




function getUserAccessToken(resolve) {
   getUserAuth().then(res => resolve(res))
}
class CommunityAPI extends BaseAPI {

   constructor() {
      super()
      this.accessToken = AppManager.shared.user?.access_token
      this.communityAPI = axios.create({
         baseURL: this.api_url + '/community/v1/',
         timeout: 5000,
      })
   }

   public async getPostList() {
      try {
         let response = await this.communityAPI.get('posts', this.getConfigs())
         return this.success(response.data)
      } catch (error) {
         return this.failed(error)
      }
   }

   public async getUserPostList() {
      try {
         let response = await this.communityAPI.get('user-posts', this.getConfigs())
         return this.success(response.data)
      } catch (error) {
         return this.failed(error)
      }
   }

   public async deleteUserPost(id: number) {
      try {
         let endpoint = `post-delete/${id}`
         let response = await this.communityAPI.post(endpoint, {}, this.getConfigs())
         return this.success(response.data)
      } catch (error) {
         return this.failed(error)
      }
   }
   public async getPostDetail(id: number) {
      try {
         let endpoint = `post/${id}`
         let response = await this.communityAPI.get(endpoint, this.getConfigs())
         return this.success(response.data)
      } catch (error) {
         return this.failed(error)
      }
   }

   public async togglePostFavorite(id: number) {
      try {
         let endpoint = `post/${id}/toggle-favorite`
         let response = await this.communityAPI.post(endpoint, {}, this.getConfigs())
         return this.success(response.data)
      } catch (error) {
         return this.failed(error)
      }
   }


   public async getPostComments(id: number) {
      try {
         let endpoint = `post/${id}/comments`
         let response = await this.communityAPI.get(endpoint, this.getConfigs())
         return this.success(response.data)
      } catch (error) {
         return this.failed(error)
      }
   }


   public async addPostComment(id: number, content: string, record: any) {
      try {
         let endpoint = `post/${id}/comment`
         let formdata = new FormData()
         formdata.append('content', content)
         formdata.append('record', record)
         let response = await this.communityAPI.post(endpoint, formdata, this.getConfigs())
         return this.success(response.data)
      } catch (error) {
         return this.failed(error)
      }
   }

   public async togglePostCommentFavorite(id: number, comment_id: number) {
      try {
         let endpoint = `post/${id}/comment/${comment_id}/favorite`
         let response = await this.communityAPI.post(endpoint, {}, this.getConfigs())
         return this.success(response.data)
      } catch (error) {
         return this.failed(error)
      }
   }

   public async createPost(post: any) {
      try {
         let endpoint = `post/create-post`
         let formdata = new FormData()
         formdata.append('title', post.title)
         formdata.append('record', post.record)
         formdata.append('image', post.image)

         let response = await this.communityAPI.post(endpoint, formdata, {
            headers: this.getFileHeaders()
         })
         return this.success(response.data)
      } catch (error) {
         return this.failed(error)
      }
   }
}

export default new CommunityAPI()