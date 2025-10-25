'use client'

import { PageSEO } from '../../components/commons/seo'
import { usePathname } from 'next/navigation'
import { AiFillLinkedin } from 'react-icons/ai'
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation'
import Link from 'next/link'
import NextImage from 'next/image'
import Experience from '../../components/commons/experience'
import { experienceData } from './data.experience'
import { motion } from 'framer-motion'

export default function About() {
  const pathname = usePathname()

  return (
    <>
      <PageSEO title="About - Wan Ilhami" description="A little trivia about me" pathname={pathname} />
      <div className="min-h-screen">
        <div className="w-full mx-auto px-4">
          <div className="space-y-10 mb-16">
            {/* Header */}

            <motion.span
              className="inline-block text-sm font-semibold uppercase tracking-widest"
              style={{ color: 'var(--secondary)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              about me
            </motion.span>
            <motion.header
              className="space-y-4 text-center sm:text-left mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
                A little trivia about me
              </h1>
            </motion.header>

            {/* Grid Layout */}
            <div className="xl:grid xl:grid-cols-3 xl:gap-10">
              {/* Left: Profile */}
              <motion.div
                className="flex flex-col items-center space-y-3 py-8 px-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-[#2A2A2A]/60 shadow-lg shadow-gray-200/40 dark:shadow-black/30 backdrop-blur-md transition-all duration-300 xl:sticky xl:top-10"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  boxShadow: '0px 8px 20px rgba(6, 182, 212, 0.3)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 250, damping: 15 }}
              >
                <motion.div
                  className="relative"
                  whileHover={{
                    rotate: [0, -3, 3, 0],
                    transition: { duration: 0.6 },
                  }}
                >
                  <NextImage
                    src="/static/images/me.jpg"
                    alt="avatar"
                    width={192}
                    height={192}
                    className="h-48 w-48 rounded-full object-cover border-4 border-cyan-400/50 shadow-lg"
                    placeholder="blur"
                    blurDataURL="/static/images/SVG-placeholder.png"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full ring-2 ring-cyan-400/30"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.6, 0.2, 0.6],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>

                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                  Wan Ilhami
                </h3>
                <p className="text-gray-700 dark:text-gray-300">Full Stack Developer</p>
                <p className="text-gray-600 dark:text-gray-400">Neuko Sdn Bhd</p>

                <motion.a
                  href="https://www.linkedin.com/in/wan-ilhami-43515a184/"
                  target="_blank"
                  rel="noreferrer noopener"
                  whileHover={{
                    scale: 1.05,
                    background:
                      'linear-gradient(90deg, rgba(14,118,168,1) 0%, rgba(10,102,194,1) 100%)',
                    color: '#fff',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center mt-4 rounded-full border border-gray-300 dark:border-gray-600 px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-300"
                >
                  <AiFillLinkedin className="mr-2 h-5 w-5" />
                  Connect on LinkedIn
                </motion.a>

              </motion.div>

              {/* Right: About Content */}
              <div className="prose dark:prose-invert max-w-none pt-10 xl:col-span-2 leading-relaxed text-gray-700 dark:text-gray-300">
                <p>
                  <RoughNotation
                    type="bracket"
                    brackets={['left', 'right']}
                    show={true}
                    color="#06b6d4"
                    animationDelay={300}
                    animationDuration={3000}
                  >
                    I'm currently focused on backend logic, cloud infrastructure, and
                    modern web technologies to deliver seamless, high-performance
                    experiences at{' '}
                    <Link
                      href="https://www.neuko.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300 hover:text-cyan-500 group"
                    >
                      Neuko
                      <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    .
                  </RoughNotation>
                </p>

                <p className="mt-4">
                  This is what I'm up to right{' '}
                  <Link
                    href="/now"
                    className="underline underline-offset-4 decoration-cyan-400 hover:text-cyan-600 transition-colors duration-200"
                  >
                    now
                  </Link>
                  .
                </p>

                <p className="mt-4">
                  I'm passionate about leveraging <span className="font-semibold text-cyan-500">AWS</span> and
                  cloud-native technologies to build scalable, cost-efficient
                  architectures. I'm also{' '}
                  <RoughNotation
                    type="underline"
                    color="#FBCFE8"
                    show={true}
                    animationDelay={1600}
                    animationDuration={2200}
                  >
                    exploring AI and other emerging technologies to drive innovation and
                    deepen my technical expertise.
                  </RoughNotation>
                </p>

                <p className="mt-4">
                  I'm an advocate for open-source collaboration and love working with
                  other developers to build meaningful, impactful solutions. If you'd
                  like to connect or share ideas, feel free to reach out via{' '}
                  <Link
                    href="mailto:wan.ilhami0@gmail.com"
                    className="underline underline-offset-4 decoration-cyan-400 hover:text-cyan-600 transition-colors duration-200"
                  >
                    Email
                  </Link>{' '}
                  or{' '}
                  <Link
                    href="https://wa.me/60103923664"
                    className="underline underline-offset-4 decoration-cyan-400 hover:text-cyan-600 transition-colors duration-200"
                  >
                    WhatsApp
                  </Link>
                  .
                </p>

                <section className="mt-10 space-y-4">
                  <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    Fun Facts
                  </h2>

                  <RoughNotationGroup show={true}>
                    <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                      <li>
                        I believe{' '}
                        <RoughNotation type="highlight" color="#06b6d4" padding={2}>
                          dark mode
                        </RoughNotation>{' '}
                        makes code run faster — it's science (or at least it feels like it 😎).
                      </li>

                      <li>
                        My debugging ritual always starts with{' '}
                        <RoughNotation type="underline" color="#f59e0b" strokeWidth={2}>
                          coffee
                        </RoughNotation>
                        , not logic.
                      </li>

                      <li>
                        If I write the same code twice, I'll{' '}
                        <RoughNotation type="box" color="#8b5cf6" strokeWidth={2}>
                          automate it
                        </RoughNotation>{' '}
                        the third time.
                      </li>

                      <li>
                        I once turned a random{' '}
                        <RoughNotation type="circle" color="#10b981" strokeWidth={2}>
                          2 a.m. idea
                        </RoughNotation>{' '}
                        into a working web app by sunrise.
                      </li>

                      <li>
                        I enjoy fine-tuning{' '}
                        <RoughNotation type="underline" color="#3b82f6" strokeWidth={2}>
                          AWS setups
                        </RoughNotation>{' '}
                        just to save a few extra cents in the cloud.
                      </li>

                      <li>
                        My{' '}
                        <RoughNotation type="highlight" color="#ef4444" padding={2}>
                          terminal
                        </RoughNotation>{' '}
                        knows more secrets than I probably should admit.
                      </li>

                      <li>
                        I still think{' '}
                        <RoughNotation type="underline" color="#14b8a6" strokeWidth={2}>
                          console.log
                        </RoughNotation>{' '}
                        is a perfectly valid debugging strategy.
                      </li>
                    </ul>
                  </RoughNotationGroup>
                </section>
              </div>
            </div>

            {/* Experience Section */}
            <motion.section
              className='mt-10'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight 
                                bg-gradient-to-r from-[#7B0323] via-[#8B1874] to-[#2B0B3F] 
                                bg-clip-text text-transparent">
                  Proficiency & Experience
                </h1>
              </div>

              <div className="mt-10 space-y-8">
                {experienceData.map((d, i) => (
                  <motion.div
                    key={d.company}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.15 }}
                    viewport={{ once: true }}
                  >
                    <Experience {...d} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </>
  )
}