// 校验手机号
export const validatePhone = (phone: string): boolean => {
  return /^1[3-9]\d{9}$/.test(phone)
}

// 校验密码强度：6-20位，需包含字母和数字
export const validatePassword = (password: string): boolean => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(password)
}

// 校验验证码：6位数字
export const validateCode = (code: string): boolean => {
  return /^\d{6}$/.test(code)
}

// 校验昵称：2-20字符
export const validateNickname = (nickname: string): boolean => {
  return /^[\u4e00-\u9fa5a-zA-Z0-9]{2,20}$/.test(nickname)
}
