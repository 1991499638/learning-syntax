export { checkTokenExpiration }
//对token的时间进行判断，如果无效那就剔除
const checkTokenExpiration = (expTime) => {
   const expirationTime = expTime * 1000
   const currentTime = Date.now()
   if (currentTime > expirationTime) {
      localStorage.removeItem('token')
   }
}