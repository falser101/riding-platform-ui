import request from '../request'

// 发送验证码
export const sendCode = (phone: string, type: 'login' | 'register' | 'bind' = 'login') => {
  return request({
    url: '/auth/send-code',
    method: 'POST',
    data: { phone, type }
  })
}

// 用户登录
export const login = (data: {
  phone: string
  code?: string
  password?: string
  type: 'h5' | 'admin'
  loginType: 'code' | 'password'
}) => {
  return request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}

// 用户注册
export const register = (data: { phone: string; password: string; code: string }) => {
  return request({
    url: '/auth/register',
    method: 'POST',
    data
  })
}

// 退出登录
export const logout = () => {
  return request({
    url: '/auth/logout',
    method: 'POST'
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'GET'
  })
}
