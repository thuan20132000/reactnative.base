import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import AppManager from '../AppManager'
import Constants from '../constants/Constant'


export default class BaseAPI {

   protected axios = axios
   protected communityAPI: AxiosInstance
   protected facebook_graph = `https://graph.facebook.com/v11.0/me?`
   protected api_url = Constants.config.api_url
   constructor() {
      this.axios = axios
      this.facebook_graph = this.facebook_graph
      this.api_url = this.api_url
      console.log('cccc')

   }
   protected accessToken: string

   protected success(data: any) {
      return data
   }

   protected failed(error: AxiosError) {
      console.log('errrrr: ', error.config);
      throw new Error(error.message);
      // return Promise.reject(error)

   }

   protected getHeaders() {
      return {
         'Authorization': `Bearer ${AppManager.shared.user?.access_token}`
      }
   }

   protected getConfigs(): AxiosRequestConfig {
      return {
         headers: this.getHeaders()
      }
   }

   protected getFileHeaders() {
      return {
         'Authorization': `Bearer ${AppManager.shared.user?.access_token}`,
         'Content-Type': 'multipart/form-data'
      }
   }
}