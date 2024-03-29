/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  ArrowLeftOnRectangleIcon,
  CogIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Search } from '@/components/Search'
import Settings from '../../components/content/settings'
import Homes from '../../components/content/Home'
import getLayoutStatus from '@/utils/getLayoutStatus'
import { Header } from '@/components/Layout'

let navigation = [
  { name: 'Home', href: '#Home', icon: HomeIcon, current: '#Home' },
  { name: 'Settings', href: '#Settings', icon: CogIcon, current: '#Settings' },
]
const secondaryNavigation = [
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Logout', href: '/', icon: ArrowLeftOnRectangleIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function home() {
  if (typeof window != 'undefined' && window.location.href != 'undefined' && window.location.origin != "undefined") {
    window.location.href = window.location.origin
  }

}


export default function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [flag, setFlag] = useState("#Home")

  //top:
  // Home : 64px  Jobs:1156  App:2249   Mess:3342      Team:4435     Setting:5528

  function handleScroll(top) {
    if (top < 735) {
      return "#Home"
    } else if (top > 735) {
      return "#Settings"
    }
  }

  setInterval(() => {
    if (typeof window != 'undefined' && window.scrollY != 'undefined') {
      let keyScroll = handleScroll(window.scrollY)
      // console.log(keyScroll)
      setFlag(keyScroll)
    }

  }, 100)

  // useEffect(()=>{
  //   if(typeof window !='undefined' && window.scrollY != 'undefined'){
  //     let keyScroll = handleScroll(window.scrollY)
  //     // console.log(keyScroll)
  //     setFlag(keyScroll)
  //   }
  // },[])



  return (
    <>
      {/*
        This example requires updating your template:
        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-14 p-1">
                      <button
                        type="button"
                        className="flex h-12 w-12 items-center justify-center rounded-full focus:bg-gray-600 focus:outline-none"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        <span className="sr-only">Close sidebar</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4" >
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=600"
                      alt="Easywire"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="flex h-full flex-col">
                      <div className="space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-purple-50 border-purple-600 text-purple-600'
                                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group border-l-4 py-2 px-3 flex items-center text-base font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500',
                                'mr-4 flex-shrink-0 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div className="mt-auto space-y-1 pt-10">
                        {secondaryNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          >
                            <item.icon
                              className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <Header />
        <div style={{ marginTop: 88 }} className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <nav className="flex  flex-grow flex-col overflow-y-auto border-r  pt-0 pb-4">
            {/* <div className="flex flex-shrink-0 items-center px-4">
              <img onClick={home}
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=600"
                alt="Easywire"
              />
            </div> */}
            <div className="mt-5 flex-grow">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link onClick={() => setFlag(`#${item.name}`)}
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      // Active(item.current)
                      item.current === flag
                        ? 'bg-purple-50 border-purple-600 text-purple-600 '
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 ',
                      'group border-l-4 py-2 px-3 flex items-center text-sm font-medium select-none cursor-pointer'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current === flag ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="block w-full flex-shrink-0">
              {/* 下侧边栏 */}
              {secondaryNavigation.map((item) => (
                <Link
                  onClick={() => {
                    if (item.name === 'Logout') {
                      getLayoutStatus()

                    }
                  }}
                  key={item.name}
                  href={item.href}
                  className="group flex items-center border-l-4 border-transparent py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <item.icon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Content area */}
        <div className="md:pl-64 ">
          <div
            id="content"
            className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0 ">
            {/* <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 ">
              <div className="m-2 flex flex-1 justify-center px-4 md:px-0">
                <Search />
              </div>
            </div> */}
            
            <Homes />
            <Settings />
          </div>
        </div>

      </div>
    </>
  )
}