import { Toast } from 'antd-mobile'

export function judgeCellphone (number) {
  const regMobile = /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$/
  if (regMobile.test(number)) {
    return true
  }

  return false
}

export function passwordValid (pass) {
  let passLower = pass.toLocaleLowerCase()
  // let flag = " "
  if (pass == null || pass.length < 8 || pass.length > 20 || pass.length == "") {
    //$.messager.alert("错误","密码位数不对，长度最少8位，最大20位。");
    // flag = "密码位数不对，长度最少8位，最大20位"
    return false
  }
}