import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../../Services/authService";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = () => {
  const { setUserSession } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // 👈 state to toggle

  const { login, error } = useAuth();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    toast.dismiss();
    try {
      const res = await loginUser(formData);
      if (res.success) {
        toast.success(res?.message);
        setUserSession(res?.token, res?.data);
        navigate("/");
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.log(err.response?.data?.message);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mx-auto py-8 pt-20 max-w-md">
      <h1 className="text-2xl font-bold mb-6 w-full text-center">Sign In</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            className="w-full border p-2 rounded pr-10"
            required
          />
          <div
            className="absolute top-9 right-3 cursor-pointer text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={20} />
            ) : (
              <AiFillEye size={20} />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
      <div className="mt-4 w-full text-center">
        <p>
          New Customer?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
