import { Link } from "react-router-dom";


function Register(){
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-evenly bg-gray-100 text-[2vw] md:text-[1.75vw] lg:text-[1.5vw] xl:text-[1vw]">
            <div className="w-[70vw] h-[50vh] bg-white rounded-[2vw] flex flex-col md:flex-row">
                <div className="w-full h-[40%] md:h-full flex flex-col items-center justify-center text-[2em] font-bold px-[1em]">
                    <h1>
                        Create Your Account
                    </h1>
                    <h2>
                        Enter your details
                    </h2>
                </div>
                <div className="w-full h-[60%] md:h-full flex flex-col items-center justify-evenly ">
                    <div className="flex flex-col items-center justify-center w-full px-[2em]">
                        <input type="text" placeholder="User Name" className="border-2 w-full py-[0.5em] mb-[1em] pl-[1em] outline-none focus:border-blue-600"/>
                        <input type="text" placeholder="Password" className="border-2 w-full py-[0.5em] mb-[1em] pl-[1em] outline-none focus:border-blue-600"/>
                        <input type="text" placeholder="email" className="border-2 w-full py-[0.5em] mb-[1em] pl-[1em] outline-none focus:border-blue-600"/>
                    </div>
                    {/* Buttons */}
                    <div className="w-full px-[1em] flex items-center justify-center md:justify-end">
                        <Link to="/">
                            <button className="bg-blue-600 text-white px-[1em] py-[0.5em] rounded-full cursor-pointer hover:bg-blue-700 mx-[0.5em]">
                                Cancel
                            </button>
                        </Link>
                        <button className="bg-blue-600 text-white px-[1em] py-[0.5em] rounded-full cursor-pointer hover:bg-blue-700 mx-[0.5em] ">
                            Register
                        </button>
                    </div>

                </div>
            </div>
            {/* sending to login page */}
            <div>
                <h1>
                    Already a user? <a className="text-blue-600 underline text-[1.5em]" href="/login">Login</a>
                </h1>
            </div>
        </div>
    )
}

export default Register;