// components/commons/seo.jsx
'use client'

import { useEffect } from 'react'

// Configuration
export const seoConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  title: 'Wan - Software Engineer',
  description: 'My portfolio website showcasing my projects and skills as a software engineer.',
  twitter: '@one',
  author: 'Wan Ilhami',
  socialBanner: '/images/banner.png',
  siteLogo: '/static/images/logo.png',
  locale: 'en_US',
  type: 'website',
}

// Utility Functions
export const buildImageUrl = (image) => {
  if (!image) return seoConfig.socialBanner
  if (image.includes('http')) return image
  return `${seoConfig.siteUrl}${image.startsWith('/') ? image : '/' + image}`
}

export const buildImageUrls = (images) => {
  if (!images || (Array.isArray(images) && images.length === 0)) {
    return [buildImageUrl(seoConfig.socialBanner)]
  }
  const imageArray = Array.isArray(images) ? images : [images]
  return imageArray.map((img) => buildImageUrl(img))
}

export const formatDate = (date) => {
  return new Date(date).toISOString()
}

// Meta Tags Component
const MetaTags = ({
  title,
  description,
  canonicalUrl,
  ogType,
  ogImage,
  twImage,
  noindex,
  nofollow,
  pathname,
}) => {
  useEffect(() => {
    // Set title
    document.title = title

    // Remove old meta tags
    const existingMetas = document.querySelectorAll('meta[data-seo="true"]')
    existingMetas.forEach((el) => el.remove())

    const createMeta = (name, content, isProperty = false) => {
      const meta = document.createElement('meta')
      if (isProperty) {
        meta.setAttribute('property', name)
      } else {
        meta.setAttribute('name', name)
      }
      meta.setAttribute('content', content)
      meta.setAttribute('data-seo', 'true')
      document.head.appendChild(meta)
    }

    // Basic meta tags
    const robots = [
      !noindex ? 'index' : 'noindex',
      !nofollow ? 'follow' : 'nofollow',
    ].join(', ')
    
    createMeta('description', description)
    createMeta('robots', robots)

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"][data-seo="true"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      canonicalLink.setAttribute('data-seo', 'true')
      document.head.appendChild(canonicalLink)
    }
    const currentUrl = canonicalUrl || `${seoConfig.siteUrl}${pathname}`
    canonicalLink.setAttribute('href', currentUrl)

    // Open Graph
    createMeta('og:title', title, true)
    createMeta('og:description', description, true)
    createMeta('og:type', ogType, true)
    createMeta('og:url', currentUrl, true)
    createMeta('og:site_name', seoConfig.title, true)
    createMeta('og:locale', seoConfig.locale, true)

    const ogImages = Array.isArray(ogImage) ? ogImage : [ogImage]
    ogImages.forEach((img) => {
      createMeta('og:image', img, true)
    })

    // Twitter Card
    createMeta('twitter:card', 'summary_large_image')
    createMeta('twitter:site', seoConfig.twitter)
    createMeta('twitter:title', title)
    createMeta('twitter:description', description)
    createMeta('twitter:image', twImage)

    return () => {
      const metasToRemove = document.querySelectorAll('meta[data-seo="true"]')
      metasToRemove.forEach((el) => el.remove())
      const linkToRemove = document.querySelector('link[rel="canonical"][data-seo="true"]')
      if (linkToRemove) linkToRemove.remove()
    }
  }, [title, description, canonicalUrl, ogType, ogImage, twImage, noindex, nofollow, pathname])

  return null
}

// Structured Data Component
const StructuredData = ({ data }) => {
  useEffect(() => {
    // Remove old structured data script
    const oldScript = document.querySelector('script[type="application/ld+json"][data-seo="true"]')
    if (oldScript) oldScript.remove()

    // Create new script
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-seo', 'true')
    script.textContent = JSON.stringify(data, null, 2)
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-seo="true"]')
      if (scriptToRemove) scriptToRemove.remove()
    }
  }, [data])

  return null
}

// Common SEO Component
const CommonSEO = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = seoConfig.socialBanner,
  twImage = seoConfig.socialBanner,
  noindex,
  nofollow,
  pathname,
}) => {
  const ogImageUrls = buildImageUrls(ogImage)
  const twImageUrl = Array.isArray(twImage) ? twImage[0] : twImage

  return (
    <MetaTags
      title={title}
      description={description}
      canonicalUrl={canonicalUrl}
      ogType={ogType}
      ogImage={ogImageUrls}
      twImage={twImageUrl}
      noindex={noindex}
      nofollow={nofollow}
      pathname={pathname}
    />
  )
}

// Page SEO Component
export const PageSEO = ({
  title = seoConfig.title,
  description = seoConfig.description,
  canonicalUrl,
  ogImage = seoConfig.socialBanner,
  twImage = seoConfig.socialBanner,
  pathname = '/',
  ...rest
}) => {
  return (
    <CommonSEO
      title={title}
      description={description}
      canonicalUrl={canonicalUrl}
      ogType="website"
      ogImage={ogImage}
      twImage={twImage}
      pathname={pathname}
      {...rest}
    />
  )
}

// Blog SEO Component
export const BlogSEO = ({
  title,
  description,
  summary,
  date,
  lastmod,
  url,
  canonicalUrl,
  authorDetails,
  images = [],
  ogImage,
  twImage,
  pathname = '/',
  ...rest
}) => {
  const publishedAt = formatDate(date)
  const modifiedAt = lastmod ? formatDate(lastmod) : publishedAt

  const imageUrls = buildImageUrls(images)
  const ogImageUrl = ogImage ? buildImageUrls(ogImage)[0] : imageUrls[0]
  const twImageUrl = twImage ? buildImageUrls(twImage)[0] : imageUrls[0]

  const featuredImages = imageUrls.map((img) => ({
    '@type': 'ImageObject',
    url: img,
  }))

  let authorList = {
    '@type': 'Person',
    name: seoConfig.author,
  }

  if (authorDetails && authorDetails.length > 0) {
    authorList = authorDetails.map((author) => ({
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
    }))
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    description: summary || description,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: seoConfig.author,
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.siteUrl}${seoConfig.siteLogo}`,
      },
    },
  }

  useEffect(() => {
    // Add article metadata
    const createMeta = (name, content, isProperty = false) => {
      let meta = document.querySelector(`meta[${isProperty ? 'property' : 'name'}="${name}"][data-seo="true"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(isProperty ? 'property' : 'name', name)
        meta.setAttribute('data-seo', 'true')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    if (date) createMeta('article:published_time', publishedAt, true)
    if (lastmod) createMeta('article:modified_time', modifiedAt, true)
    createMeta('article:author', seoConfig.author, true)

    return () => {
      const metas = document.querySelectorAll('meta[data-seo="true"][name^="article:"], meta[data-seo="true"][property^="article:"]')
      metas.forEach((el) => el.remove())
    }
  }, [date, lastmod, publishedAt, modifiedAt])

  return (
    <>
      <CommonSEO
        title={title}
        description={summary || description}
        canonicalUrl={canonicalUrl}
        ogType="article"
        ogImage={ogImageUrl}
        twImage={twImageUrl}
        pathname={pathname}
        {...rest}
      />
      <StructuredData data={structuredData} />
    </>
  )
}

// Tag SEO Component
export const TagSEO = ({
  title,
  description,
  canonicalUrl,
  ogImage = seoConfig.socialBanner,
  twImage = seoConfig.socialBanner,
  feedUrl,
  pathname = '/',
  ...rest
}) => {
  useEffect(() => {
    // Add RSS feed link
    let rssLink = document.querySelector('link[rel="alternate"][type="application/rss+xml"][data-seo="true"]')
    if (!rssLink) {
      rssLink = document.createElement('link')
      rssLink.setAttribute('rel', 'alternate')
      rssLink.setAttribute('type', 'application/rss+xml')
      rssLink.setAttribute('data-seo', 'true')
      document.head.appendChild(rssLink)
    }
    const rssUrl = feedUrl || `${seoConfig.siteUrl}${pathname}/feed.xml`
    rssLink.setAttribute('title', `${description} - RSS feed`)
    rssLink.setAttribute('href', rssUrl)

    return () => {
      const link = document.querySelector('link[rel="alternate"][type="application/rss+xml"][data-seo="true"]')
      if (link) link.remove()
    }
  }, [feedUrl, pathname, description])

  return (
    <CommonSEO
      title={title}
      description={description}
      canonicalUrl={canonicalUrl}
      ogType="website"
      ogImage={ogImage}
      twImage={twImage}
      pathname={pathname}
      {...rest}
    />
  )
}