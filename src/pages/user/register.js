import { useEffect, useState, useMemo } from 'react'
// import { Toast } from 'antd-mobile/es/components/action-sheet/index'
import { Toast } from 'antd-mobile'
import { judgeCellphone, passwordValid } from '@/utils/utils'
import { getCode } from '@/server/api'
import { register } from '@/server/api'



export default function Register () {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpsw, setconfirmpsw] = useState('')
  const [userName, setUserName] = useState('')
  const [code, setCode] = useState('')
  const [seconds, setSeconds] = useState(60)

  const [btnDisabled, setBtnDisabled] = useState(false)


  let judgement = judgeCellphone(phone)
  let judgmentpwd = passwordValid(password)


  //验证码老三样
  let timer
  useEffect(() => {
    if (seconds <= 0) {
      setBtnDisabled(false)
      setSeconds(60)
    }
  }, [seconds])


  const sendCode = async () => {

    //暂时没有验证码哦

    // const { data } = await getCode({
    //   phone: phone,
    // })
    Toast.show({
      //content:data.msg
      content: '获取成功,请稍等',
    })
  }




  //获取验证码的主执行函数，包括获取验证码和计时器
  const getCaptcha = () => {
    verifyinformation()

    timer = setInterval(() => setSeconds(pre => pre - 1), 1000)


    sendCode()

    setBtnDisabled(true)

  }
  //验证手机号格式是否正确
  const verifyPhone = () => {
    if (!phone) return
    if (judgement == false) {
      Toast.show({
        content: '您的手机号码格式不对'
      })
      return
    }
  }


  //验证密码是否正确

  const verifyPwdFormat = () => {
    if (!password) return
    if (judgmentpwd == false) {
      Toast.show({
        content: '密码长度过短'
      })

      return
    }

  }

  //验证密码与确定密码是否一致
  const verifyPwdRepect = () => {
    if (password !== confirmpsw) {
      Toast.show({
        content: '两次输入密码不一致，请确定您的密码'
      })
      return
    }
  }

  //验证用户名
  const verifyUsername = () => {
    if (userName == '' || userName.length > 10) {
      Toast.show({
        content: '用户名不能为空,或过长'
      })
      return
    }
  }

  //验证信息汇总
  const verifyinformation = () => {
    verifyUsername()
    verifyPwdFormat()
    verifyPwdRepect()
    verifyPhone()
  }

  //将他妈的数据传送至后端
  const onSubmitRegister = async (phone, password, userName) => {
    verifyinformation()
    try {
      const status = await register({
        body: {
          "phone": phone,
          "password": password,
          "userName": userName
        }
      })

      if (status === 200) {
        Toast.show(
          {
            content: '注册成功'
          }
        )
      } else {
        Toast.show({
          content: '注册失败，请稍后重试'
        })
      }

    } catch (error) {
      console.error('An error occurred during registration:', error)
    }
  }

  return (
    <>

      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">开始您的web3ladder学习之旅</h2>

        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  User Name
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    onChange={(e) => {
                      setUserName(e.target.value)
                    }}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="confirmpassword"
                    autoComplete="confirmpassword"
                    onChange={(e) => {
                      setconfirmpsw(e.target.value)
                    }}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="Telnumber" className="block text-sm font-medium text-gray-700">
                  Telnumber
                </label>
                <div className="mt-1">
                  <input
                    id="Telnumber"
                    name="Telnumber"
                    type="Telnumber"
                    autoComplete="Telnumber"
                    onChange={(e) => {
                      setPhone(e.target.value)
                    }}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="verificationcode" className="block text-sm font-medium text-gray-700" >
                  验证码
                </label>
                <div className="mt-1 flex" style={{ justifyContent: "space-between" }}>
                  <input style={{ width: "12vh" }}
                    id="verificationcode"
                    name="verificationcode"
                    type="verificationcode"
                    autoComplete="verificationcode"
                    required
                    onChange={(e) => {
                      setCode(e.target.value)
                    }}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                  /><button
                    disabled={btnDisabled}
                    onClick={() => getCaptcha()}
                    type="button"
                    className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    {!btnDisabled ? '获取验证码' : `${seconds}s后重发`}

                  </button>
                </div>
              </div>

              <div>
                <submit
                  // type="submit"
                  className="cursor-pointer flex w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  onClick={() => onSubmitRegister(phone, password, userName)}
                >
                  Register
                </submit>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <a
                    href="#"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Twitter</span>
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with GitHub</span>
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
