import { defineStore } from 'pinia'
import { getToken, setToken, removeToken, setUserInfo, removeUserInfo } from '@/utils/storage'
import { login as loginApi, getUserInfo, logout as logoutApi } from '@/api/modules/auth'

interface UserState {
  token: string | null
  userInfo: Record<string, any> | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: getToken(),
    userInfo: null
  }),

  actions: {
    async login(phone: string, code: string) {
      try {
        const res = await loginApi({ phone, code, type: 'admin', loginType: 'code' })
        this.token = res.data.token
        this.userInfo = res.data.userInfo
        setToken(res.data.token)
        setUserInfo(res.data.userInfo)
        return res
      } catch (error) {
        throw error
      }
    },

    async fetchUserInfo() {
      if (!this.token) return
      try {
        const res = await getUserInfo()
        this.userInfo = res.data
        if (res.data) {
          setUserInfo(res.data)
        }
      } catch (error) {
        console.error('获取用户信息失败', error)
      }
    },

    async logout() {
      try {
        await logoutApi()
      } catch (error) {
        console.error('退出登录失败', error)
      } finally {
        this.token = null
        this.userInfo = null
        removeToken()
        removeUserInfo()
      }
    }
  },

  persist: true
})
