import React, { useState } from 'react';

import logo_main from "../images/main_logo.jpg";
import main_img from '../images/main_login.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { APi_URL } from '../../Utils/apiConfig';

function Login() {
  const [email, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(APi_URL + 'user/login', {
        email,
        userName,
        password,
      });
      console.log(response);
      const token = response.data.user.token
      localStorage.setItem("token", token)
      localStorage.setItem("username", response.data.user.username)
      localStorage.setItem("useremail", response.data.user.email)
      if (response.data) {
        Cookies.set('User-userEmail', email, { expires: 7 });
        Cookies.set('User-username', userName, { expires: 7 });
        alert('✔️ Login successfully 👍');
        navigate('/');
      }
    } catch (error) {
      alert(error.response?.data?.message || ' 🙅‍♂️ User Not Found or Invalid Credentials 👎');
      console.error("Login error:", error.response?.data);
      navigate('/');
    }
  };

  const gotoRagister = () => {
    navigate('/registration');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto py-5">
        <div className="flex flex-col md:flex-row justify-center items-stretch">
          {/* Image container hidden on mobile and tablet sizes */}
          <div className="hidden md:flex items-center w-[400px] h-[800px] mr-2">
            <img
              src={main_img}
              alt="login form"
              className="object-cover h-full rounded-l-lg"
            />
          </div>
          {/* Form container */}
          <div className="flex items-center w-full md:w-[600px] h-[800px] p-4 bg-white rounded-lg shadow-md">
            <div className="w-full">
              <div className="flex items-center mb-5">
                <img src={logo_main} alt="Logo" className="w-24 h-30" />
              </div>
              <h5 className="text-2xl font-semibold mb-5">Sign into your account</h5>
              <form onSubmit={LoginUser}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter your Username"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="pt-1 mb-4">
                  <button
                    className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <span className="text-sm text-gray-500">Forgot password?</span>
                <p className="mt-4 text-gray-700">
                  Don't have an account?{" "}
                  <span onClick={gotoRagister} className="text-blue-500 cursor-pointer hover:underline">
                    Register here
                  </span>
                </p>
                <div className="mt-4">
                  <span className="text-sm text-gray-500">Terms of use.</span>
                  <span className="text-sm text-gray-500">Privacy policy</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
