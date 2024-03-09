import LoginForm from "@/components/login_form"

const Login = () => {
  
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <div className="w-1/2 border-2 rounded-lg border-black px-5 py-3">
        <div className="">
          <p className='font-bold text-4xl text-center'>Login <span className='text-lg font-semibold'>to</span> Marketree.co</p>
          <p className='font-medium text-[1rem] text-gray-600'>Please enter your credential below.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login