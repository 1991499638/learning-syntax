import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { Hero } from '@/components/Hero'
import { Logo, Logomark, Mylogo } from '@/components/Logo'
import { MobileNavigation } from '@/components/MobileNavigation'
import { Navigation } from '@/components/Navigation'
import { Prose } from '@/components/Prose'
import { Search } from '@/components/Search'
import { ThemeSelector } from '@/components/ThemeSelector'
import Directory from './directory'
import { navigation, solidity } from '@/routes/index';

const themes = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'System', value: 'system' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function GitHubIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  )
}

function NoActive(props) {
  return (
    <div className="hidden items-center max-h-12 justify-end space-x-8 md:flex md:flex-1 lg:w-0" {...props}>
      <a href="/user/login"
        className="whitespace-nowrap mr-3 text-base font-medium text-gray-500 hover:text-gray-900">
        Sign in
      </a>
      <a
        href="/user/register"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-purple-100 py-2 px-4 text-base font-medium text-purple-600 hover:bg-purple-200"
      >
        Sign up
      </a>
    </div>
  )
}

function cc() {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('token')) {
    return localStorage.getItem('token')
  }
}


export function Header({ navigation }) {
  let [isScrolled, setIsScrolled] = useState(false)
  let [loginStatus] = useState(cc())//登录状态
  let [active, setactive] = useState(<NoActive />)
  let [theme, settheme] = useState('light')

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined' && typeof document.documentElement !== 'undefined')
    {
      console.log(`${document.documentElement.getAttribute('data-theme')}`)
      settheme(document.documentElement.getAttribute('data-theme')) 
    }
  }, [theme])

  useEffect(() => {
    if (loginStatus != null) {
      setactive(
        <Link href="/setting" className="group mt-3" aria-label="GitHub">
          <GitHubIcon className="h-6 w-6 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
        </Link>
      )
    }
  }, [loginStatus])

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent'
      )}
    >
      <div className="mr-6 flex lg:hidden">
        <MobileNavigation navigation={navigation} />
      </div>
      <div className="relative flex flex-grow basis-0 items-center">
        <Link href="/" aria-label="Home page">
          {/* <Logomark className="h-9 w-9 lg:hidden" /> */}
          <img className='h-9 myicon' id='logo' src='' alt="" />
          {/* <Mylogo className='h-9 w-auto myicon' /> */}
          {/* <Logo className="hidden h-9 w-auto fill-slate-700 dark:fill-purple-100 lg:block" /> */}
        </Link>
      </div>
      <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
        <Search />
      </div>
      <div className="relative flex basis-0 align-middle justify-end gap-6 sm:gap-8 md:flex-grow">
        {active}
        <ThemeSelector id='themes' className=" relative z-10 mr-8 my-3" />
      </div>
    </header>
  )
}

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id)

  let getHeadings = useCallback((tableOfContents) => {
    return tableOfContents
      .flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
      .map((id) => {
        let el = document.getElementById(id)
        if (!el) return

        let style = window.getComputedStyle(el)
        let scrollMt = parseFloat(style.scrollMarginTop)

        let top = window.scrollY + el.getBoundingClientRect().top - scrollMt
        return { id, top }
      })
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0) return
    let headings = getHeadings(tableOfContents)
    function onScroll() {
      let top = window.scrollY
      let current = headings[0].id
      for (let heading of headings) {
        if (top >= heading.top - 100) {
          current = heading.id
        } else {
          break
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [getHeadings, tableOfContents])

  return currentSection
}

export function Layout({ children, title, tableOfContents, pageUrl }) {
  let router = useRouter()
  let isHomePage = router.pathname === '/'
  let allLinks = navigation.flatMap((section) => section.links)
  let linkIndex = allLinks.findIndex((link) => link.href === router.pathname)
  let previousPage = allLinks[linkIndex - 1]
  let nextPage = allLinks[linkIndex + 1]
  let section = navigation.find((section) =>
    section.links.find((link) => link.href === router.pathname)
  )
  let currentSection = useTableOfContents(tableOfContents)

  function isActive(section) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  let nav = (
    <Navigation
      navigation={navigation}
      className=" w-64 pr-8 xl:w-72 xl:pr-16"
    />
  )
  if (pageUrl === 'solidity') {
    nav = (
      <Navigation
        navigation={solidity}
        className="w-64 pr-8 xl:w-72 xl:pr-16"
      />
    )
  }


  const [hidden, setHidden] = useState(false);
  const [hiddenmap, setHiddenmap] = useState(true);

  const handleToggle = () => {
    setHidden(!hidden);
  };
  const handleToggleMap = () => {
    setHiddenmap(!hiddenmap);
  };


  return (
    <>
      <Header navigation={navigation} />
      {/*  */}
      {isHomePage && <Hero />}

      <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12 2xl:px-0">

        {/* navigation */}
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw]  dark:hidden" />
          <div className="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
          <div className="absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block" />
          <div id='bnav' className={classNames(hidden ? 'hidden' : '', "sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-16 pl-0.5")}>
            {nav}
          </div>
        </div>

        <div className="relative min-w-0 max-w-2xl flex-auto px-4 pb-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-12">
          <button className={classNames(hidden ? '' : '', 'myicon sticky top-28 mb-2 -ml-10 flex')} onClick={handleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
          </button>
          <button className={classNames(hidden ? '' : '', 'myicon sticky top-36 -ml-10 flex')} onClick={handleToggleMap}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
          </button>
          <article style={{ marginTop: "-36px" }}>
            {(title || section) && (
              <header className="mb-9 space-y-1">
                {section && (
                  <p className="font-display text-sm font-medium text-purple-500">
                    {section.title}
                  </p>
                )}
                {title && (
                  <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                    {title}
                  </h1>
                )}
              </header>
            )}
            <Prose>{children}</Prose>
            <div className='w-full flex justify-end mt-10 px-10 '>
              <button onClick={() => {
                console.log(title)
              }} className='myicon font-display p-2 border-2 border-slate-200 hover:bg-slate-100 rounded-md ' >完成学习
              </button>
            </div>

          </article>
          <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
            {previousPage && (
              <div>
                <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                  Previous
                </dt>
                <dd className="mt-1">
                  <Link
                    href={previousPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    <span aria-hidden="true">&larr;</span> {previousPage.title}
                  </Link>
                </dd>
              </div>
            )}
            {nextPage && (
              <div className="ml-auto text-right">
                <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                  Next
                </dt>
                <dd className="mt-1">
                  <Link
                    href={nextPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    {nextPage.title} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 ">

          <nav aria-labelledby="on-this-page-title" className={classNames(hidden ? 'hidden' : '', "w-56")}>
            {tableOfContents.length > 0 && (
              <>
                <h2
                  id="on-this-page-title"
                  className="font-display text-sm font-medium text-slate-900 dark:text-white"
                >
                  On this page
                </h2>
                <ol role="list" className="mt-4 space-y-3 text-sm">
                  {tableOfContents.map((section) => (
                    <li key={section.id}>
                      <h3>
                        <Link
                          href={`#${section.id}`}
                          className={clsx(
                            isActive(section)
                              ? 'text-purple-500'
                              : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                          )}
                        >
                          {section.title}
                        </Link>
                      </h3>
                      {section.children.length > 0 && (
                        <ol
                          role="list"
                          className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                        >
                          {section.children.map((subSection) => (
                            <li key={subSection.id}>
                              <Link
                                href={`#${subSection.id}`}
                                className={
                                  isActive(subSection)
                                    ? 'text-purple-500'
                                    : 'hover:text-slate-600 dark:hover:text-slate-300'
                                }
                              >
                                {subSection.title}
                              </Link>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className={classNames(hiddenmap ? 'hidden' : '', 'duration-500 z-50 fixed bg-white/30 backdrop-brightness-50 backdrop-blur-sm inset-y-0 w-screen h-screen')}>
        <div className='overflow-y-auto px-10 border rounded-lg -translate-x-1/2 shadow-lg shadow-purple-200/50 bg-gray-100 absolute top-16 inset-x-1/2 w-5/6 h-5/6'>
          <div className='pt-10 pb-5 border-b-2 shadow-xl shadow-gray-200/50 border-b-gray-200  backdrop-blur-sm flex justify-between sticky top-0'>
            <div></div>
            <h1 className='text-center text-3xl font-display'>
              <a href="/">Directory</a>
            </h1>
            <button onClick={handleToggleMap} className=''>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <Directory data={navigation} />
          <Directory data={navigation} />

        </div>
      </div>
    </>
  )
}
