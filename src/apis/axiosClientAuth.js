import axios from 'axios'
import { API_CONSTANTS as constants } from '@root/constants'
import store from '@root/store/store'

const axiosClient = axios.create()

axiosClient.defaults.baseURL = constants.HOST_URL

// axiosClient.defaults.headers = constants.headers
axiosClient.interceptors.request.use(function (config) {
  const token = store.getState().authentication.isAccessToken
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${token || accessToken}`
    // config.headers['Access-Control-Allow-Origin'] = '*'
    // 'Access-Control-Allow-Origin': '*',
  }
  return config
})

// To share cookies to cross site domain, change to true.
axiosClient.defaults.withCredentials = true

export function getRequestAuth(URL) {
  return axiosClient.get(`/${URL}`).then(response => response)
}

export function postRequestAuth(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then(response => response)
}

export function patchRequestAuth(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then(response => response)
}

export function putRequestAuth(URL, payload) {
  return axiosClient.put(`/${URL}`, payload).then(response => response)
}

export function deleteRequestAuth(URL) {
  return axiosClient.delete(`/${URL}`).then(response => response)
}
