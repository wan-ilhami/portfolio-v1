'use client'

import Link from 'next/link'
import React from 'react'

const CustomLink = ({ href, children, className = '', ...rest }) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  // Internal links handled by Next.js <Link>
  if (isInternalLink) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    )
  }

  // Anchor links (within the same page)
  if (isAnchorLink) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    )
  }

  // External links (open in new tab)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`special-underline-new no-underline hover:text-gray-100 dark:hover:text-gray-100 ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

export default CustomLink