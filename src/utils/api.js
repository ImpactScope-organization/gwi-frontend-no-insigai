import axios from 'axios'
import apiUrl from './baseURL'
import { ACCESS_TOKEN_STORAGE_KEY } from './auth'

const ApiInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'content-type': 'application/json'
  },
  timeout: 100000
})

export async function getApi() {
  ApiInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
    if (accessToken) {
      config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` }
    }

    return config
  })

  return ApiInstance
}
