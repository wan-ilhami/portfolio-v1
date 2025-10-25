'use client'
import { Fragment, useState } from 'react'
import {
  Menu,
  MenuButton,
  Transition,
  MenuItems,
  MenuItem,
} from '@headlessui/react'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import CustomLink from '../commons/link'
import {
  CodeIcon,
  HomeIcon,
  Pencil1Icon,
  DiscIcon,
  HamburgerMenuIcon,
  ArchiveIcon,
  PersonIcon,
  FrameIcon,
  LaptopIcon,
  BarChartIcon,
  DrawingPinIcon,
  CustomLink2Icon,
  QuoteIcon,
  CalendarIcon,
  TwitterLogoIcon,
  RocketIcon,
  ChatBubbleIcon,
  EnterIcon,
} from '@radix-ui/react-icons'
import useSound from 'use-sound'

export default function DropMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [ThemeSound] = useSound('/static/sounds/page-change.mp3')

  const toggleIcon = () => setIsOpen(!isOpen)

  return (
    <Menu as="div" className="relative z-10 inline-block text-left">
      <MenuButton
        as={motion.button}
        className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-300 p-2 ring-zinc-400 transition-all hover:bg-violet-400 hover:ring-1 dark:bg-zinc-700 dark:ring-violet-700 dark:hover:bg-violet-600"
        whileTap={{ scale: 0.5 }}
        transition={{ duration: 0.1, ease: 'easeIn' }}
        aria-label="Toggle List Menu"
      >
        <HamburgerMenuIcon className="h-4 w-4" />
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        afterEnter={() => {
          toggleIcon()
          ThemeSound()
        }}
        afterLeave={() => {
          toggleIcon()
          ThemeSound()
        }}
      >
        <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-zinc-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-zinc-700 dark:bg-zinc-800">
          <div className="py-1">
            {[
              { href: '/', label: 'Home', icon: HomeIcon },
              { href: '/blog', label: 'Blog', icon: Pencil1Icon },
              { href: '/projects', label: 'Projects', icon: ArchiveIcon },
              { href: '/about', label: 'About', icon: PersonIcon },
            ].map(({ href, label, icon: Icon }) => (
              <MenuItem key={href}>
                {({ active }) => (
                  <CustomLink
                    href={href}
                    className={classNames(
                      active
                        ? 'bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300'
                        : 'bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <div className="flex flex-row">
                      <Icon className="mr-4 mt-0.5" /> {label}
                    </div>
                  </CustomLink>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
