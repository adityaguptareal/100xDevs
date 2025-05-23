import axios from "axios"
import { Button } from "../Components/ui/Button"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function Signin() {
    const navigate=useNavigate()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

    async function onSubmit(data: Record<string, any>) {
        let { email, password, username } = data    
        email = email.toLowerCase();
        const sendingData = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/signin`, { email, password, username })
        .then(response => {
            let token = response?.data?.token;
            let user = response?.data?.user;
            localStorage.setItem("SecondBrainToken", token);
            localStorage.setItem("SecondBrainUser", JSON.stringify(user));
            toast.success("Signin Successfully", { duration: 5000 });
            navigate("/dashboard");
        }).catch(err => {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message || "Something went wrong";
                toast.error(message, { duration: 5000 });

            } else {
                toast.error("An unexpected error occurred", { duration: 5000 });
            }
        })

    }

    return (


        <div className="flex min-h-full flex-1 flex-col justify-center  px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center h-full">

                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Signin to SecondBrain
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                {...register("email", { required: "Email is Required", minLength: { value: 4, message: "Email should be 4 character long" } })} />
                            {errors.email && <span className="text-sm text-red-500">{String(errors.email.message)}</span>}
                        </div>
                    </div>


                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                {...register("password", {
                                    required: "password is required", minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    }
                                })} />
                        </div>
                    </div>

                    <div>
                        <Button disabled={isSubmitting} size="large" variant="primary" text={ isSubmitting ? "SIGN IN ..." : "SIGN IN"} className={"w-full"} />
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Not a member?{' '}
                    <a href="/signup" className="font-semibold text-purple-700 hover:text-indigo-400">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Signin