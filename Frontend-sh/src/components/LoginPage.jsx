import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useStoreContext } from '../contextApi/ContextApi';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const { setToken } = useStoreContext();

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

    const loginHandler = async (data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post(
                "/api/auth/public/login",
                data
            );
            setToken(response.token);
            localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
            toast.success("Login Successful!");
            reset();
            navigate("/");
        } catch {
            toast.error("Login Failed!")
        } finally {
            setLoader(false);
        }
    };

  return (
    <div className='min-h-screen bg-gradient-to-br from-bitly-navy via-slate-800 to-slate-900 flex justify-center items-center py-12 px-4'>
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit(loginHandler)}
                className="bg-white shadow-bitly py-8 px-8 rounded-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back
                    </h1>
                    <p className="text-gray-600">Sign in to your Shortex account</p>
                </div>

                <div className="space-y-6">
                    <TextField
                        label="Username"
                        required
                        id="username"
                        type="text"
                        message="*Username is required"
                        placeholder="Enter your username"
                        register={register}
                        errors={errors}
                    />

                    <TextField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="*Password is required"
                        placeholder="Enter your password"
                        register={register}
                        min={6}
                        errors={errors}
                    />
                </div>

                <button
                    disabled={loader}
                    type='submit'
                    className='w-full mt-6 bg-bitly-lightBlue hover:bg-blue-600 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 disabled:transform-none'>
                    {loader ? "Signing in..." : "Sign in"}
                </button>

                <p className='text-center text-sm text-gray-600 mt-6'>
                    Don&apos;t have an account? 
                    <Link
                        className='font-medium text-bitly-lightBlue hover:text-blue-600 ml-1'
                        to="/register">
                        Sign up free
                    </Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default LoginPage