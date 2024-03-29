import Head from 'next/head'
import { useRouter } from 'next/router';
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'

import 'focus-visible'
import '@/styles/tailwind.css'

function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (node.name === 'h2' || node.name === 'h3') {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.name === 'h3') {
          if (!sections[sections.length - 1]) {
            throw new Error(
              'Cannot add `h3` to table of contents without a preceding `h2`'
            )
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}

export default function App({ Component, pageProps }) {
  let title = pageProps.markdoc?.frontmatter.title

  let pageTitle =
    pageProps.markdoc?.frontmatter.pageTitle ||
    `${pageProps.markdoc?.frontmatter.title} - Docs`

  let description = pageProps.markdoc?.frontmatter.description

  let tableOfContents = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

    //大章节选择
    const router = useRouter();
    const  pu  = router.asPath;
    const parameterName = 'pu';
    const regex = new RegExp(`${parameterName}=(.*?)(&|$)`);
    const match = pu.match(regex);
    const parameterValue = match ? match[1] : '';
    // console.log(parameterValue!=='')
    let pageUrl='navigation';
    if(parameterValue!==''){
      pageUrl=parameterValue
    }

  // console.log(description === undefined)
  let content;

  if(description === undefined){
    content=(
      <Component {...pageProps} />
    )
  }else{
    content=(
      <Layout pageUrl={pageUrl} title={title} tableOfContents={tableOfContents}>
        <Component {...pageProps} />
      </Layout>
    )
  }
  // console.log(`${pageProps.markdoc?.frontmatter.title}`===`undefined`)

  let pTitle=(<title>{pageTitle}</title>)
  if(`${pageProps.markdoc?.frontmatter.title}`===`undefined`){
    pTitle=(<title>index - docs</title>)
  }

// console.log(`${window.location.href}`)

  return (
    <>
      <Head>
      <link rel="shortcut icon" href="" />
        {pTitle}
        {description && <meta name="description" content={description} />}
      </Head>
      {content}
    </>
  )
}
