'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { montserrat } from '@/theme/fonts'

export default function Home() {
  const bgAnimate = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
      },
    }
  }
  const bgAnimation = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        duration: 1,
        delayChildren: 1,
      }
    }
  }
  const textAnimate = {
    hidden: {
      x: 0,
      opacity: 0,
    },
    show: (i: number) => ({
      x: i,
      opacity: 1,
      transition: {
        ease: 'easeOut',
        duration: 0.8,
      }
    })
  }
  const lineAnimate = {
    hidden: {
      x: 0,
      opacity: 0,
    },
    show: (i: number) => ({
      x: i,
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        duration: 0.3,
        delay: 2,
      }
    })
  }
  const imageAnimate = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.6,
        delayChildren: 3.6,
        ease: [0.25, 0.4, 0.25, 1],
      }
    }
  }
  const imageAnimateChild = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        ease: 'easeInOut'
      }
    }
  }
  const navAnimate = {
    hidden: {
      y: "-110%",
    },
    show: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        delay: 2,
      }
    }
  }
  const textParagraph = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        delay: 2.8,
      }
    }
  }
  const buttonAnimation = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        delay: 3,
      }
    }
  }
  return (
    <main className=''>
      <motion.div className='absolute inset-0 w-screen h-screen z-0' variants={bgAnimate} initial="hidden" animate="show">
        <Image src="/images/market-tree-landing.jpg" alt="background" fill sizes="(max-width:768px) 33vw, (max-width:1024px) 50vw, 100vw" priority={true} className='object-cover brightness-[.6]' />
      </motion.div>

      <motion.nav className='flex justify-between items-center text-white relative z-10 pt-4 mx-5' variants={navAnimate} initial="hidden" animate="show">
        <div className='font-semibold text-xl underline'>Marketree.co</div>
        <ul className='flex gap-8 items-center font-bold'>
          <li>Home</li>
          <li>Marketplace</li>
          <li>Nearby</li>
          <li className='rounded-lg bg-white py-2 px-5 flex justify-center items-center text-black font-medium'>Login</li>
        </ul>
      </motion.nav>

      <motion.div className='px-16 relative top-8' variants={bgAnimation} initial="hidden" animate="show">
        <div className='bg-white w-8 h-full absolute z-10' />
        <motion.div>
          <motion.p className={`text-9xl text-[#eaeaea] tracking-tighter font-semibold z-10 ${montserrat.className}`} variants={textAnimate} custom={45}>Welcome!</motion.p>
        </motion.div>
        <motion.div className='flex gap-5'>
          <motion.h1 className={`text-9xl text-[#eaeaea] tracking-tighter font-semibold z-10 ${montserrat.className}`} variants={textAnimate} custom={45}>to</motion.h1>
          <motion.div>
            <motion.div custom={45} className='w-full bg-white rounded-lg' variants={lineAnimate} >
              <motion.h1 className='text-9xl text-gray-950 font-semibold tracking-tighter z-10 px-10'>Marketree.co</motion.h1>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div className='bg-slate-900 py-5 px-10 absolute bottom-0' variants={imageAnimate} initial="hidden" animate="show">
        <motion.div className='mb-8' variants={textParagraph} initial="hidden" animate="show">
          <motion.p className='leading-5 text-[#eaeaea] text-lg'>
            Selamat datang di website kami, kami percaya bahwa setiap langkah maju dimulai dengan sebuah ide cemerlang.
            Kami akan memberi Anda kenyamanan dalam berbelanja serta dirancang khusus untuk memenuhi kebutuhan Anda.
            Dengan layanan unggulan, kami hadir untuk mempermudah hidup Anda dan membawa Anda menuju kegembiraan.
          </motion.p>
        </motion.div>
        <motion.a href='/user/marketplace' className='inline-block bg-white rounded-lg py-3 px-6 font-semibold text-gray-900' variants={buttonAnimation} initial="hidden" animate="show">
          See Marketplace!
        </motion.a>
      </motion.div>
      {/* <motion.div className='flex gap-4 absolute bottom-4' variants={imageAnimate} initial="hidden" animate="show">
        <motion.div className='relative w-[300px] h-[200px]' variants={imageAnimateChild}>
          <Image src="/img/img-1.webp" alt="image" fill sizes="(max-width:768px) 33vw, (max-width:1024px) 50vw, 100vw" className='object-cover rounded-sm saturate-150' />
        </motion.div>
        <motion.div className='relative w-[300px] h-[200px]' variants={imageAnimateChild}>
          <Image src="/img/img-2.webp" alt="image" fill sizes="(max-width:768px) 33vw, (max-width:1024px) 50vw, 100vw" className='object-cover rounded-sm saturate-150' />
        </motion.div>
        <motion.div className='relative w-[300px] h-[200px]' variants={imageAnimateChild}>
          <Image src="/img/img-3.webp" alt="image" fill sizes="(max-width:768px) 33vw, (max-width:1024px) 50vw, 100vw" className='object-cover rounded-sm saturate-150' />
        </motion.div>
      </motion.div> */}
    </main>
  )
}
