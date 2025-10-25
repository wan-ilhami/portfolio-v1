'use client';

import headerNavLinks from '../navigationbar/navigation.link.data'
import Link from '../commons/link'
import SectionContainer from '../commons/section.container'
import { navigation } from '../navigationbar/navigation.small'
import CommandPalette from '../commons/command.palette'
import ThemeSwitch from '../commons/theme.switch'
import Typewriter from 'typewriter-effect'
import { usePathname } from 'next/navigation'
import DropMenu from '../navigationbar/drop.down.menu'
import Footer from '../layout/footer'

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname()

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" >
              {/* <div className="flex items-center justify-between">
                <div className="mr-1">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div> */}
              <div className="text-primary-color dark:text-primary-color-dark flex items-center justify-between text-xl font-semibold">
                {`~${pathname}`}{' '}
                <Typewriter
                  options={{
                    strings: [],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="link-underline rounded py-1 px-2 text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 sm:py-2 sm:px-3"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <CommandPalette navigation={navigation} />
            <ThemeSwitch />
            <DropMenu />
            {/* <MobileNav /> */}
          </div>
        </header>
        <main >{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper