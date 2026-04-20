import request from '../request'

// 获取用户列表
export const getUserList = (params: {
  page: number
  pageSize: number
  phone?: string
  nickname?: string
}) => {
  return request({
    url: '/users',
    method: 'GET',
    params
  })
}

// 获取用户详情
export const getUserDetail = (id: string) => {
  return request({
    url: `/users/${id}`,
    method: 'GET'
  })
}

// 更新用户信息
export const updateUser = (data: { id: string; nickname?: string; avatar?: string; role?: string; status?: number }) => {
  return request({
    url: `/users/${data.id}`,
    method: 'PUT',
    data
  })
}

// 修改密码
export const changePassword = (data: {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}) => {
  return request({
    url: '/user/change-password',
    method: 'POST',
    data
  })
}

// 上传头像
export const uploadAvatar = (file: File) => {
  const formData = new FormData()
  formData.append('avatar', file)
  return request({
    url: '/user/upload-avatar',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
