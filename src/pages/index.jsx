import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon,
  Bars3Icon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CheckIcon as CheckIconOutline,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { CheckIcon as CheckIconMini, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Search } from '@/components/Search'
import Link from 'next/link'
import {getLayoutStatus} from '../utils/LoginStatus'

const tiers = [
  {
    name: '区块链',
    href: '/docs',
    priceMonthly: 12,
    description: '区块链是一种去中心化的分布式账本技术，可以确保数据的安全性和透明性。区块链技术的应用有助于提高效率、降低成本、保障隐私',
    features: ['没有中心化的控制机构，所有参与者共同维护账本。', '数据存储在多个节点上，确保数据的安全性和可靠性。','通过密码学和共识机制确保数据的安全性和不可篡改性。'],
  },
  {
    name: 'BTC',
    href: '/docs',
    priceMonthly: 24,
    description: 'BTC是一种去中心化的数字货币，发行和交易都是基于区块链技术。BTC的应用场景包括支付、投资、交易等。',
    features: [
      '可以用于支付、投资、交易等场景。',
      '交易记录不包含个人身份信息，保护用户隐私。',
      'BTC的总量是有限的，目前为2100万枚。',
    ],
  },
  {
    name: 'ETH',
    href: '/docs',
    priceMonthly: 32,
    description: 'ETH是一种基于区块链技术的智能合约平台，可以被用于开发去中心化应用。ETH的应用场景包括去中心化金融、数字身份、供应链管理等。',
    features: [
      '支持智能合约的开发和执行。',
      '可以被用于开发去中心化应用（DApps）。',
      '可以应用于去中心化金融、数字身份、供应链管理等领域。',
      '受到了广泛关注和支持，开发工具和社区生态丰富。',
    ],
  },
  {
    name: 'Solidity',
    href: '/docs?pu=solidity',
    priceMonthly: 48,
    description: 'Solidity是一种面向合约的编程语言，被用于开发基于以太坊的智能合约。Solidity支持面向对象编程和函数式编程，语法和结构类似于JavaScript。',
    features: [
      '专门用于开发智能合约的编程语言。 ',
      '支持面向对象编程，可以提高代码的复用性和可维护性。',
      '支持函数式编程，可以提高代码的可读性和可测试性。',
      '开发工具包括Remix、Truffle等，可以提高开发效率和代码质量。',
    ],
  },
]
const features = [
  {
    name: '区块链浏览器',
    description: '一个区块链浏览器可以让用户查看区块链上的交易记录、地址余额和区块链上的其他信息。',
  },
  {
    name: '钱包',
    description: '一个钱包可以让用户存储、发送和接收数字货币。',
  },
  {
    name: '交易所',
    description: '一个交易所可以让用户交易数字货币，并提供市场深度、价格行情和其他交易相关的信息。',
  },
  {
    name: '区块链开发工具',
    description: '一个区块链开发工具可以让开发者轻松地开发和部署智能合约，并提供调试和测试工具。',
  },
  {
    name: 'DApp 浏览器',
    description: '一个 DApp 浏览器可以让用户访问和使用去中心化应用。',
  },
  {
    name: '区块链数据分析工具',
    description: '一个区块链数据分析工具可以让用户分析区块链上的交易数据和其他信息。',
  },
  {
    name: '区块链教育和社区',
    description: '一个区块链教育和社区可以提供区块链知识和技能培训，以及与其他区块链开发者和爱好者交流的平台。',
  },
]
const logos = [
  { name: '科技金融', url: 'https://tailwindui.com/img/logos/tuple-logo-purple-200.svg' },
  { name: '智慧教育', url: 'https://tailwindui.com/img/logos/mirage-logo-purple-200.svg' },
  { name: '智能治理', url: 'https://tailwindui.com/img/logos/statickit-logo-purple-200.svg' },
  { name: '网络安全', url: 'https://tailwindui.com/img/logos/transistor-logo-purple-200.svg' },
  { name: '数字文化', url: 'https://tailwindui.com/img/logos/workcation-logo-purple-200.svg' },
]
const faqs = [
  {
    id: 1,
    question: '什么是区块链？',
    answer:
      '区块链是一种去中心化的分布式账本技术，它通过一系列加密算法和协议，实现了数据的安全存储和传输。区块链的特点包括去中心化、分布式、安全、透明等。',
  },
  {
    id: 2,
    question: "BTC和ETH之间有什么区别？它们各自的应用场景是什么？",
    answer:
      "BTC和ETH之间的最大区别在于它们的设计目的和应用场景。BTC是一种数字货币，旨在成为一种去中心化的、匿名的、安全的支付工具。ETH则是一种智能合约平台，旨在为开发者提供一个去中心化的、可编程的应用平台。BTC的总量有限，目前为2100万枚，而ETH则没有总量限制。",
  },
  {
    id: 3,
    question: 'Solidity是什么？它有哪些特点和优势？',
    answer: 'Solidity是一种面向合约编程语言，用于编写智能合约。它具有面向对象编程和函数式编程的特点，可以帮助开发者编写安全、高效、易于维护的智能合约。Solidity还提供了丰富的开发工具和库，使得开发者可以更轻松地构建复杂的智能合约。',
  },
  {
    id: 4,
    question: '如何学习区块链和Web3？',
    answer:
      "学习区块链和Web3需要具备一定的编程和网络基础，可以从以下途径入手：阅读相关的书籍和文档，参加线上或线下的培训课程，加入开发者社区和论坛，参与开源项目的贡献和实践等。此外，需要不断学习和探索新的技术和应用，以跟上区块链和Web3的发展趋势。",
  },
]
const footerNavigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Pricing', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'API Status', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  legal: [
    { name: 'Claim', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Dribbble',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function LanguageSelect(){
  return (
    <>
      <div className="mt-12 xl:mt-0">
        <h3 className="text-base font-medium text-white">Language &amp; Currency</h3>
        <form className="mt-4 space-y-4 sm:max-w-xs">
          <fieldset className="w-full">
            <label htmlFor="language" className="sr-only">
              Language
            </label>
            <div className="relative">
              <select
                id="language"
                name="language"
                className="block w-full rounded-md border border-transparent bg-gray-800 bg-none text-base text-white focus:border-white focus:ring-white sm:text-sm"
                defaultValue="English"
              >
                <option>English</option>
                <option>French</option>
                <option>German</option>
                <option>Japanese</option>
                <option>Spanish</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <ChevronDownIcon className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
            </div>
          </fieldset>
          <fieldset className="w-full">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <div className="relative mt-1.5">
              <select
                id="currency"
                name="currency"
                className="block w-full rounded-md border border-transparent bg-gray-800 bg-none text-base text-white focus:border-white focus:ring-white sm:text-sm"
                defaultValue="AUD"
              >
                <option>ARS</option>
                <option>AUD</option>
                <option>CAD</option>
                <option>CHF</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>JPY</option>
                <option>USD</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <ChevronDownIcon className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  )
}



export default function Example() {

let [loginStatus,setloginStatus] =useState(false)
let [lightStatus,setlightStatus] =useState(true)
useEffect(() => {
 if( localStorage.getItem('token')){
  setloginStatus(true)
 }else{
  setloginStatus(false)
 }
},[])


  return (
    <div className="bg-white">
      <Popover className="relative bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="#">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=600"
                  alt=""
                />
              </Link>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="m-0 flex flex-1 justify-center px-4 md:px-0">
              <Search />
            </div>
            <div className="hidden items-center justify-end space-x-8 md:flex md:flex-1 lg:w-0">
                {{loginStatus}? 
                <><div onClick={()=>{
                  setlightStatus(false)
                }}
                 className='w-12 h-12 border-0 bg-green-200' style={{borderRadius:44}}>用户名</div>
                {lightStatus?<div id='light' className='w-2 h-2 mt-auto mb-0 bg-green-500 border-0 rounded'></div>:
                <div id='logout'>
                <Link 
                  onClick={()=>{
                    getLayoutStatus()
                  }}
                  key='Logout'
                  href='#'
                  className="group flex items-center border-l-4 border-transparent py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Logout
                </Link>
                </div>}
                </>
                 :<><Link href="/user/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                  Sign in
                </Link>
                <Link
                  href="/setting"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-purple-100 py-2 px-4 text-base font-medium text-purple-600 hover:bg-purple-200"
                >
                  Sign up
                </Link></>}
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="space-y-6 py-6 px-5">
                <div className="space-y-6">
                  <Link
                    href="#"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-base font-medium text-white hover:bg-purple-700"
                  >
                    Sign up
                  </Link>
                  <p className="text-center text-base font-medium text-gray-500">
                    Existing customer?{' '}
                    <Link href="#" className="text-purple-600 hover:text-purple-500">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      {/* Pricing with four tiers and toggle */}
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-6 pt-24 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-center">Web3 Learning</h1>
            <p className="mt-5 text-xl text-gray-500 sm:text-center">
              知识库网站简介
            </p>
          </div>
          <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
            {tiers.map((tier) => (
              <div key={tier.name} className="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-bold leading-6 text-gray-900">{tier.name}</h2>
                  <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                  <Link
                    href={tier.href}
                    className="mt-8 block w-full rounded-md border border-transparent bg-purple-600 py-2 text-center text-sm font-semibold text-white hover:bg-purple-700"
                  >
                    Get started
                  </Link>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <h3 className="text-sm font-medium text-gray-900">What's included</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex space-x-3">
                        <CheckIconMini className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                        <span className="text-sm text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature list */}
        <div className="mx-auto max-w-7xl py-16 px-6 lg:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">All-in-one platform</h2>
            <p className="mt-4 text-lg text-gray-500">
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla
              nec.
            </p>
          </div>
          <dl className="mt-12 space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-4 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <CheckIconOutline className="absolute h-6 w-6 text-green-500" aria-hidden="true" />
                  <p className="ml-9 text-lg font-medium leading-6 text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-9 flex text-base text-gray-500 lg:py-0 lg:pb-4">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Logo cloud on brand */}
      <div className="bg-purple-600">
        <div className="mx-auto max-w-7xl py-16 px-6 sm:py-20 lg:px-8">
          <div className="lg:space-y-10">
            <h2 className="text-3xl font-bold tracking-tight text-white">
            Tutorial building collaborators
            </h2>
            <div className="mt-8 flow-root lg:mt-0">
              <div className="-mt-4 -ml-8 flex flex-wrap justify-between lg:-ml-4">
                {logos.map((logo) => (
                  <div key={logo.name} className="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
                    <img className="h-12" src={logo.url} alt={logo.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ offset */}
      <div className="mx-auto max-w-7xl py-16 px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Frequently asked questions</h2>
          </div>
          <div className="mt-12 lg:col-span-2 lg:mt-0">
            <dl className="space-y-12">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className="text-lg font-medium leading-6 text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Footer 4-column with newsletter and localization dark */}
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl py-12 px-6 lg:py-16 lg:px-8">
          <h2 className="sr-only">Footer</h2>
          <div className="space-y-4 border-gray-700 pt-8 lg:flex lg:items-center lg:justify-between lg:space-y-0 xl:mt-0">
            <div className="space-y-2">
              <h3 className="text-base font-medium text-white">Subscribe to our newsletter</h3>
              <p className="text-base text-gray-300">
                The latest news, articles, and resources, sent to your inbox weekly.
              </p>
            </div>
            
            <form className="sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 rounded-md border border-transparent bg-white py-2 px-4 placeholder-gray-500 focus:border-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 sm:max-w-xs"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <LanguageSelect />
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {footerNavigation.social.map((item) => (
                <Link key={item.name} href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
              &copy; 2023 Your Company, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
