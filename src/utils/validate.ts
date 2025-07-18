/**
 * 验证手机号 (11位, 含虚拟运营商)
 * @param phone 待验证的手机号（字符串）
 */
export const validatePhone = (phone: string): boolean => {
  return /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(phone)
}
