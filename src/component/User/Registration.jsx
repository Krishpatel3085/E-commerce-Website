import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { APi_URL } from '../../Utils/apiConfig';
import main_img from '../images/main_login.jpg';

function Registration() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const CreateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);

    try {
      await axios.post(APi_URL + "user/register", formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
      setUsername('');

      alert(" ✅ Registration Success 👍");
      navigate('/login');
    } catch (error) {
      console.error("Error:", error);
      alert("💁‍♂️ User already exists");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto py-5">
        <div className="flex flex-col md:flex-row justify-center items-stretch">
          {/* Image container hidden on mobile and tablet sizes */}
          <div className="hidden md:flex items-center w-[400px] h-[800px] mr-2">
            <img
              src={main_img}
              alt="Sample"
              className="object-cover h-full rounded-l-lg"
            />
          </div>
          {/* Registration form container */}
          <div className="flex items-center w-full md:w-[600px] h-[800px] p-4 bg-white rounded-lg shadow-md">
            <div className="w-full">
              <h3 className="mb-5 text-2xl font-semibold text-center">
                Registration Form
              </h3>
              <form onSubmit={CreateUser}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder='Create User Name'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    id="firstname"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder='Enter Your First Name'
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    id="lastname"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder='Enter Your Last Name'
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="email">Email ID</label>
                  <input
                    type="email"
                    id="email"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder='abc@gmail.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder='Enter Confirm Password'
                    required
                  />
                </div>
                <div className="pt-1 mb-4">
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Submit Form
                  </button>
                </div>
                <h6 className='pt-3 text-center'>Already have an account? <a href="/login" className="text-blue-500 hover:underline">Sign in</a></h6>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registration;
