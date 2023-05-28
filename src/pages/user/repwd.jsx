/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"
import { rePwd } from "@/server/api"
import { Toast } from 'antd-mobile'
import {useNavigate} from 'react-router-dom';






const pwdKey = [{name:'pre',text:'旧密码'}, {name:'new',text:'新密码'}, {name:'renew',text:'请重新输入'}]


export default function Example() {

  const [currentpassword,setcurrentpassword] = useState('') 
const [newpassword,setnewpassword] = useState('')
const [confirmnewpassword,setconfirmnewpassword] = useState('')




const verifyPwdRepect = () =>{
  if(newpassword != confirmnewpassword){
    Toast.show({
      content:'两次输入密码不一致，请确定您的密码'
    })
    return
  }
}

const onSubRePwd = async(currentpassword,confirmnewpassword)=>{

  try{
    const response = await rePwd({
      body:{
        "password":currentpassword,
        "newpassword":confirmnewpassword
      }
    })
    if(response.status === 200){
      Toast.show({
        content:'修改成功'
      })
      //跳转至指定的路由器 
      

    }else{
      Toast.show({
        content:'修改失败请稍后再试'
      })
    }
  }catch(error){
    console.log('errormessage',error)
    throw error
  }
}
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">修改密码</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" >
                    <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    旧密码
                    </label>
                    <div className="mt-1">
                      <input
                        id={`prepassword`}
                        name={`prepassword`}
                        type={`prepassword`}
                        value={currentpassword}
                        onChange={(e)=>{
                          setcurrentpassword(e.target.value)
                        }}
                        autoComplete={`current-prepassword-password`}
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    新密码
                    </label>
                    <div className="mt-1">
                      <input
                        id={`newpassword`}
                        name={`newpassword`}
                        type={`newpassword`}
                        autoComplete={`current-newpassword-password`}
                        value={newpassword}
                        onChange={(e)=>{
                          setnewpassword(e.target.value)
                        }}
                        required
                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                确认新密码
                </label>
                <div className="mt-1">
                  <input
                    id={`renewpassword`}
                    name={`renewpassword`}
                    type={`renewpassword`}
                    value={confirmnewpassword}
                    onChange={(e) =>{
                      setconfirmnewpassword(e.target.value)
                    }}
                    autoComplete={`current-renewpassword-password`}

                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <submit
                  type=""
                  className="flex w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={()=>{onSubRePwd(currentpassword,confirmnewpassword)}}
                >
                  确认修改
                </submit>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}
