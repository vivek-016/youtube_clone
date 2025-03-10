import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        email: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:3000/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData), // ✅ Correct JSON format
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            alert("Registration Successful");
            navigate("/login");

        } catch (err) {
            console.error("Registration Error:", err);
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-evenly bg-gray-100">
            <div className="w-[70vw] h-[50vh] bg-white rounded-[2vw] flex flex-col md:flex-row">
                <div className="w-full h-[40%] md:h-full flex flex-col items-center justify-center text-[2em] font-bold px-[1em]">
                    <h1>Create Your Account</h1>
                    <h2>Enter your details</h2>
                </div>
                <form onSubmit={handleSubmit} className="w-full h-[60%] md:h-full flex flex-col items-center justify-evenly">
                    <div className="flex flex-col items-center justify-center w-full px-[2em]">
                        <input
                            type="text"
                            name="userName" // ✅ Corrected name attribute
                            placeholder="User Name"
                            value={formData.userName} // ✅ Controlled component
                            onChange={handleChange}
                            className="border-2 w-full py-[0.5em] mb-[1em] pl-[1em] outline-none focus:border-blue-600"
                        />
                        <input
                            type="password"
                            name="password" // ✅ Corrected name attribute
                            placeholder="Password"
                            value={formData.password} // ✅ Controlled component
                            onChange={handleChange}
                            className="border-2 w-full py-[0.5em] mb-[1em] pl-[1em] outline-none focus:border-blue-600"
                        />
                        <input
                            type="email"
                            name="email" // ✅ Corrected name attribute
                            placeholder="Email"
                            value={formData.email} // ✅ Controlled component
                            onChange={handleChange}
                            className="border-2 w-full py-[0.5em] mb-[1em] pl-[1em] outline-none focus:border-blue-600"
                        />
                    </div>
                    {/* Buttons */}
                    <div className="w-full px-[1em] flex items-center justify-center md:justify-end">
                        <Link to="/">
                            <button className="bg-blue-600 text-white px-[1em] py-[0.5em] rounded-full cursor-pointer hover:bg-blue-700 mx-[0.5em]">
                                Cancel
                            </button>
                        </Link>
                        <button type="submit" className="bg-blue-600 text-white px-[1em] py-[0.5em] rounded-full cursor-pointer hover:bg-blue-700 mx-[0.5em]">
                            Register
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <h1>Already a user? <Link to="/login" className="text-blue-600 underline text-[1.5em]">Login</Link></h1>
            </div>
        </div>
    );
}

export default Register;
