// src/app/(pages)/blog/[slug]/page.jsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '../../../lib/mdx';
import Link from 'next/link';
import Image from 'next/image';
import { BsCalendarDate } from 'react-icons/bs';
import { HiOutlinePencil, HiOutlineClock } from 'react-icons/hi';

const authorDetails = [
  {
    name: 'Wan Ilhami',
    avatar: '/static/images/avatar.png',
    linkedin: 'https://www.linkedin.com/in/wan-ilhami-43515a184/',
  },
];

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
  };
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  console.log("Rendering post:", post);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-red-600">Post not found</h1>
        <Link
          href="/blog"
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mt-4 inline-block"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/blog/${post.slug}`;

  return (
    <article className="w-full">
      <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
        {/* Header */}
        <header className="pt-6 xl:pb-5">
          <div className="space-y-1 text-center">
            <div className="space-y-10">
              <div>
                <p className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time dateTime={post.frontmatter.date}>
                    <BsCalendarDate className="mr-1.5 -mt-1.5 inline h-4 w-4" />
                    {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </p>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl md:leading-14">
                {post.frontmatter.title}
              </h1>
            </div>
            <div className="flex justify-center gap-5 py-4 flex-wrap">
              {post.frontmatter.readingTime && (
                <>
                  <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                    <HiOutlinePencil className="h-5 w-5" />
                    {post.frontmatter.readingTime.words} words
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                    <HiOutlineClock className="h-5 w-5" />
                    {post.frontmatter.readingTime.text}
                  </span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div
          className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          {/* Sidebar */}
          <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
            <dt className="sr-only">Authors</dt>
            <dd>
              <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                {authorDetails.map((author) => (
                  <li key={author.name} className="flex items-center space-x-2">
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        width={38}
                        height={38}
                        alt={author.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    )}
                    <dl className="whitespace-nowrap text-sm font-medium leading-5">
                      <dt className="sr-only">Name</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                      {author.linkedin && (
                        <dd>
                          <Link
                            href={author.linkedin}
                            className="text-sky-500 hover:text-sky-500 dark:hover:text-primary-400"
                          >
                            @{author.linkedin.replace('https://www.linkedin.com/in/', '')}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="ml-0.5 inline-block h-4 w-4 fill-current"
                            >
                              <path d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z" />
                              <path d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z" />
                            </svg>
                          </Link>
                        </dd>
                      )}
                    </dl>
                  </li>
                ))}
              </ul>
            </dd>
          </dl>

          {/* Main Content */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div className="prose max-w-none pt-10 pb-8 dark:prose-invert">
              <MDXRemote source={post.content} />
            </div>
          </div>

          {/* Footer */}
          <footer>
            <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="py-4 xl:py-8">
                  <h2 className="pb-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {(post.next || post.prev) && (
                <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                  {post.prev && (
                    <div>
                      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Previous Article
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/blog/${post.prev.slug}`}>{post.prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {post.next && (
                    <div>
                      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Next Article
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/blog/${post.next.slug}`}>{post.next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="pt-4 xl:pt-8">
              <Link
                href="/blog"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                ← Back to the blog
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}
