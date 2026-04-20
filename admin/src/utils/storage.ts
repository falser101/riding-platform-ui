const TOKEN_KEY = 'admin_token'
const USER_INFO_KEY = 'admin_user_info'

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

export const getUserInfo = <T = any>(): T | null => {
  const info = localStorage.getItem(USER_INFO_KEY)
  return info ? JSON.parse(info) : null
}

export const setUserInfo = <T = any>(info: T): void => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(info))
}

export const removeUserInfo = (): void => {
  localStorage.removeItem(USER_INFO_KEY)
}
