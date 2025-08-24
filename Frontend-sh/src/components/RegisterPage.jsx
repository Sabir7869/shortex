import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        setLoader(true);
        try {
            await api.post(
                "/api/auth/public/register",
                data
            );
            reset();
            navigate("/login");
            toast.success("Registration Successful!")
        } catch {
            toast.error("Registration Failed!")
        } finally {
            setLoader(false);
        }
    };

  return (
    <div className='min-h-screen bg-gradient-to-br from-bitly-navy via-slate-800 to-slate-900 flex justify-center items-center py-12 px-4'>
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit(registerHandler)}
                className="bg-white shadow-bitly py-8 px-8 rounded-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Create your account
                    </h1>
                    <p className="text-gray-600">Join Shortex and start shortening your links</p>
                </div>

                <div className="space-y-6">
                    <TextField
                        label="Username"
                        required
                        id="username"
                        type="text"
                        message="*Username is required"
                        placeholder="Choose a username"
                        register={register}
                        errors={errors}
                    />

                    <TextField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="*Email is required"
                        placeholder="Enter your email"
                        register={register}
                        errors={errors}
                    />

                    <TextField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="*Password is required"
                        placeholder="Create a password"
                        register={register}
                        min={6}
                        errors={errors}
                    />
                </div>

                <button
                    disabled={loader}
                    type='submit'
                    className='w-full mt-6 bg-bitly-lightBlue hover:bg-blue-600 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:transform-none'>
                    {loader ? "Creating account..." : "Sign up free"}
                </button>

                <p className='text-center text-sm text-gray-600 mt-6'>
                    Already have an account? 
                    <Link
                        className='font-medium text-bitly-lightBlue hover:text-blue-600 ml-1'
                        to="/login">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage