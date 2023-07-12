/* eslint-disable @next/next/no-html-link-for-pages */
import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import Directory from '@/components/directory'
import { navigation,solidity } from '@/routes';
// import { Logo,Logomark } from '@/components/Logo'
import { Header } from '@/components/Layout';
import clsx from 'clsx'
import cool from '@/images/cool-3.png'

function GitHubIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  )
}

const tiers = [
  {
    name: 'BTC',
    href: '/docs',
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
    description: 'Solidity是一种面向合约的编程语言，被用于开发基于以太坊的智能合约。Solidity支持面向对象编程和函数式编程，语法和结构类似于JavaScript。',
    features: [
      '专门用于开发智能合约的编程语言。 ',
      '支持面向对象编程，可以提高代码的复用性和可维护性。',
      '支持函数式编程，可以提高代码的可读性和可测试性。',
      '开发工具包括Remix、Truffle等，可以提高开发效率和代码质量。',
    ],
  },
]

const footerNavigation = {
  social: [
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
      href: 'https://github.com/lilywest2022/learning-syntax',
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
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Example() {


if(typeof window!=='undefined'&&window.innerHeight){
  var screenHeight = window.innerHeight;
  var timer;

  window.addEventListener('scroll', function() {
    clearTimeout(timer);
    
    timer = setTimeout(function() {
      var scrollDistance = window.pageYOffset;
      if (scrollDistance < 400) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }else if(scrollDistance >=400&&scrollDistance<780){
        window.scrollTo({ top: screenHeight, behavior: 'smooth' });
      }
    }, 250); // 设置计时器超时时间为250毫秒
    
  });
}



  return (
    <div className=" min-h-screen flex flex-col">
      <Header  />
      {/* Pricing with four tiers and toggle */}
      <div className="">
        <div className="mx-auto pb-16 ">
          <div 
          id='bg-index'
          className="relative h-screen my-auto overflow-hidden w-screen " 
          style={{
            maxWidth: "-webkit-fill-available", 
            backgroundImage: `url(${cool})`,
            backgroundPosition: 'center calc(50% - 100px)'
            }}>
            <div id='index_title' className="text-center select-none absolute top-1/3 w-full h-20 font-display text-5xl font-bold tracking-tight text-orange-500 sm:text-center">
              Web3 Learning
            </div>
            <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center mx-auto'>
              <button  
              onClick={()=>{
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
              }}
              className='mx-2 md:font-bold border-0 rounded-lg px-10 h-12 mt-10 duration-200 text-white md:text-lg bg-blue-700 hover:bg-blue-700 hover:px-14 '>
                Get started
              </button>
              <a href="" 
              className='mx-2 md:font-bold md:pt-2 border-2  rounded-lg px-10 h-12 mt-10 duration-200 text-white md:text-lg bg-inherit  hover:backdrop-blur hover:px-14 '>
                Learn more
              </a>
              
            </div>
          </div>
          <div id='directory' className='h-2'></div>
          <div  className='w-5/6 mx-auto'>
            {/* <hr className='mb-5' /> */}
            <div className='myicon my-10'>
              <h1 className=' text-left md:px-10 md:indent-10 text-2xl font-bold font-display'>BTC</h1>
              <p className='md:px-10 font-medium text-sm my-5 indent-10'>BTC是一种去中心化的数字货币，发行和交易都是基于区块链技术。BTC的应用场景包括支付、投资、交易等。</p>
              <Directory data={navigation} />
            </div>
            <div className='myicon pt-6'>
              <h1 className='text-left md:px-10 md:indent-10 text-2xl font-bold font-display'>ETH</h1>
              <p className='md:px-10 font-medium text-sm my-5 indent-10'>ETH是一种基于区块链技术的智能合约平台，可以被用于开发去中心化应用。ETH的应用场景包括去中心化金融、数字身份、供应链管理等。</p>
              <Directory data={navigation} />
            </div>
            <div className='myicon pt-6'>
              <h1 className='mt-5 text-left md:px-10 md:indent-10 text-2xl font-bold font-display'>Solidity</h1>
              <p className='md:px-10 font-medium text-sm my-5 indent-10'>Solidity是一种面向合约的编程语言，被用于开发基于以太坊的智能合约。Solidity支持面向对象编程和函数式编程，语法和结构类似于JavaScript。</p>
              <Directory data={solidity} />
            </div>
          </div>
          
        </div>
      </div>

      {/* Footer 4-column with newsletter and localization dark */}
      <footer className="bg-gray-900 mb-0 mt-auto">
        <div className="mx-auto max-w-7xl py-6 px-6 lg:py-6 lg:px-4">
          <h2 className="sr-only">Footer</h2>
          <div className="my-1 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {footerNavigation.social.map((item) => (
                <Link key={item.name} href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <p className=" text-base text-gray-400 md:order-1 md:mt-0">
              &copy; 成都信息工程大学.区块链产业学院
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
