import { useEffect, useState } from 'react'
import { getLoginStatus, getLayoutStatus } from '@/utils/LoginStatus'
import  {getById}  from '../../server/api'

export default function Settings () {
    const [userName, setusetName] = useState('未登录')
    const [phone, setphone] = useState('未登录')

    useEffect(() => {
        let tokenID = getLoginStatus();
        if (tokenID) {
          setphone(tokenID);
          const fetchData = async () => {
            try {
              const response = await getById( tokenID );
              setusetName(response.userName)
            } catch (error) {
              console.log(error);
            }
          };
      
          fetchData();
        }
    },[])

    return (
        <>
            <main id='Settings' className="flex-1">
                <div className="mt-8 relative mx-auto max-w-4xl md:px-8 xl:px-0">
                    <div className="pt-10 pb-16">
                        <div className="px-4 sm:px-6 md:px-0">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">设置</h1>
                        </div>
                        <div className="px-4 sm:px-6 md:px-0">
                            <div className="py-6">
                                {/* Tabs */}

                                {/* Description list with inline editing */}
                                <div className="mt-10 divide-y divide-gray-200">
                                    {/* <div className="space-y-1">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                                <p className="max-w-2xl text-sm text-gray-500">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                            </div> */}
                                    <div className="mt-6">
                                        <dl className="divide-y divide-gray-200">
                                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                                <dt className="text-sm font-medium text-gray-500">姓名</dt>
                                                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                    <span className="flex-grow">{userName}</span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                        >
                                                            Update
                                                        </button>
                                                    </span>
                                                </dd>
                                            </div>
                                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                                <dt className="text-sm font-medium text-gray-500">头像</dt>
                                                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                    <span className="flex-grow">
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                            alt=""
                                                        />
                                                    </span>
                                                    <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                        >
                                                            Update
                                                        </button>
                                                        <span className="text-gray-300" aria-hidden="true">
                                                            |
                                                        </span>
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                        >
                                                            Remove
                                                        </button>
                                                    </span>
                                                </dd>
                                            </div>
                                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                                <dt className="text-sm font-medium text-gray-500">修改密码</dt>
                                                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                    <span className="flex-grow"></span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <a
                                                            href='/user/rename'
                                                            type="button"
                                                            className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                        >
                                                            Update
                                                        </a>
                                                    </span>
                                                </dd>
                                            </div>
                                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                                                <dt className="text-sm font-medium text-gray-500">手机号</dt>
                                                <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                    <span className="flex-grow">{phone}</span>
                                                    <span className="ml-4 flex-shrink-0">
                                                        <a
                                                            href='/user/rephone'
                                                            type="button"
                                                            className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                        >
                                                            Update
                                                        </a>
                                                    </span>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </main>


        </>
    )

}


