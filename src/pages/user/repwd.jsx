import { useState } from "react"

const [currentpassword,setcurrentpassword] = useState('') 


const pwdKey = [{name:'pre',text:'旧密码'}, {name:'new',text:'新密码'}, {name:'renew',text:'请重新输入'}]

function Password(){
  return (
    
    <>
    <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
    旧密码
    </label>
    <div className="mt-1">
      <input
        id={`prepassword`}
        name={`prepassword`}
        type={`prepassword`}
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
        autoComplete={`current-renewpassword-password`}
        required
        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  </div>
  </>

    
  )
}


export default function Example() {
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">修改密码</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <Password />

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
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  确认修改
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}
