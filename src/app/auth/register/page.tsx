
import RegisterForm from "@/components/register-form";

const Register = () => {

    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <div className="w-1/2 border-2 rounded-lg border-black px-5 py-3">
                <div className="">
                    <p className='font-bold text-4xl text-center'>Register <span className='text-lg font-semibold'>to</span> Marketree.co</p>
                    <p className='font-medium text-[1rem] text-gray-600'>Please enter your credential below.</p>
                </div>
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register