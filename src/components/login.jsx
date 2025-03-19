import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


function Login(){

    const [formData,setFormData] = useState({
        userName: "",
        password: ""
    })
    const [error,setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError("");

        try{

            const response = await fetch("http://localhost:3000/api/login",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if(!response.ok){
                throw new Error(data.message || "Login Failed");
            }

            // STore the token in local Storage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login Successful");
            navigate("/");

        }catch(err){
            setError(err.message);
            alert(`Error: ${err.message}`)
        }
    }



    return (
        <div className="w-screen h-screen flex flex-col items-center justify-evenly bg-gray-100 text-[2vw] md:text-[1.75vw] lg:text-[1.5vw] xl:text-[1vw]">
            <form onSubmit={handleSubmit} className="w-[70vw] h-[50vh] bg-white rounded-[2vw] flex flex-col lg:flex-row">
                <div className="w-full h-[50%] lg:h-full flex flex-col items-center justify-center text-[2em] font-bold">
                    <h1>
                        Login to your Account
                    </h1>
                    <h2>
                        Enter your details
                    </h2>
                </div>
                <div className="w-full h-[50%] lg:h-full flex flex-col items-center justify-evenly ">
                    <div className="flex flex-col items-center justify-center w-full px-[2em]">
                        <input 
                            type="text" 
                            name="userName" 
                            placeholder="User Name" 
                            className="border-2 w-full py-[0.5em] mb-[1em] pl-[1em] outline-none focus:border-blue-600"
                            value={formData.userName}
                            onChange={handleChange}
                        />
                        <input 
                            type="text" 
                            name="password" 
                            placeholder="Password" 
                            className="border-2 w-full py-[0.5em] mb-[1em] pl-[1em] outline-none focus:border-blue-600"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Buttons */}
                    <div className="w-full px-[1em] flex items-center justify-center lg:justify-end">
                        <Link to="/">
                            <button className="bg-blue-600 text-white px-[1em] py-[0.5em] rounded-full cursor-pointer hover:bg-blue-700 mx-[0.5em]">
                                Cancel
                            </button>
                        </Link>
                        <button type="submit" className="bg-blue-600 text-white px-[1em] py-[0.5em] rounded-full cursor-pointer hover:bg-blue-700 mx-[0.5em] ">
                            Login
                        </button>
                    </div>

                </div>
            </form>
            {/* sending to registration page */}
            <div>
                <h1>
                    Not a user? <a className="text-blue-600 underline text-[1.5em]" href="/Register">Register</a>
                </h1>
            </div>
        </div>
    )
}

export default Login;