import { useMemo } from 'react'
import axios from 'axios'
import { AxiosError, AxiosResponse } from 'axios'
import { ACCESS_TOKEN, REFRESH_TOKEN, clearLocalStorageTokens, isTokenExpired } from '../utils/token'
import AuthApis from '../api/auth'
import { signIn } from '../utils/auth'
import { removeUserData } from '../state/user/authSlice'
import { store } from '../state/store'

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN) || ''
  const token = localStorage.getItem(ACCESS_TOKEN) || ''

  try {
    const response = await fetch(AuthApis.refresh(), {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ refreshToken }),
    })

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Failed to refresh token', error)
    throw error
  }
}

export const useApi = () => {
  const api = useMemo(
    () =>
      axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
    [],
  )
  const { dispatch } = store

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRequest = async (config: any) => {
    let token = localStorage.getItem(ACCESS_TOKEN) || ''

    if (token) {
      if (isTokenExpired(token)) {
        try {
          const data = await refreshToken()
          token = data.access_token
          clearLocalStorageTokens()
          dispatch(removeUserData())
          signIn(data)
          config.headers['Authorization'] = `Bearer ${token}`
        } catch {
          dispatch(removeUserData())
          clearLocalStorageTokens()
        }
      } else {
        config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
      }
    }
    return config
  }

  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[response error] [${JSON.stringify(error)}]`)

    return Promise.reject(error)
  }

  const onResponse = (response: AxiosResponse): AxiosResponse => {
    // Do something with response data
    if (response.status === 201) {
      // Do something
    }

    if (response.status === 202) {
      // Do something
    }

    return response
  }

  const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    if (error.response && error.response.status === 400) {
      // Do something
    }

    if (error.response && error.response.status === 500) {
      // Do something
    }

    return Promise.reject(error)
  }

  api.interceptors.response.use(onResponse, onResponseError)
  api.interceptors.request.use(onRequest, onRequestError)

  return api
}
