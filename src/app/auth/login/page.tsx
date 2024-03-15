import LoginForm from "@/components/login-form"
import Link from "next/link"

const Login = () => {
  
  return (
    <div className='grid grid-cols-2 min-h-screen'>
      <div className="relative">
        <img src="/images/market-login.jpg" alt="Market Tree" className="object-cover w-full h-full"/>
        <p className="absolute bottom-3 left-3 font-semibold text-white opacity-85">Image by Freepik</p>
      </div>
      <div className="flex flex-col items-center justify-center px-10">
        <div className="py-10">
          <p className='font-bold text-6xl'>Login <span className='text-lg font-semibold'>to</span> Marketree.co</p>
          <p className='font-medium text-lg text-gray-600'>Please enter your credential below.</p>
        </div>
        <LoginForm />
        <p className="self-start pt-3">Don't have an account? <Link href={'/auth/register'} className="font-medium text-link">Create one!</Link></p>
      </div>
    </div>
  )
}

export default Login