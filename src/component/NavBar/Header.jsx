import React, { useEffect, useState } from "react";
import logo_main from "../images/main_logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { APi_URL } from "../../Utils/apiConfig";

function Header() {
    const [user, setUser] = useState("");
    const [cartLength, setCartLength] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle
    const navigate = useNavigate();


    const gotologout = () => {
        Cookies.remove("User-username");
        Cookies.remove("User-userEmail");
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("useremail")
        setUser("");
        setCartLength(0);
        navigate("/login");
    };

    useEffect(() => {
        const userName = Cookies.get("User-username");
        setUser(userName || "");
        axios
            .get(APi_URL + "user/get")
            .then((response) => {
                setUser(response.data.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    useEffect(() => {
        const userName = Cookies.get("User-username");
        setUser(userName);

        const fetchCartData = async () => {
            if (userName) {
                try {
                    const response = await axios.get(`${APi_URL}checkout/getorder`, {
                        params: { username: userName },
                    });

                    const fetchedData = response.data || [];
                    const filteredData = fetchedData.filter(
                        (item) => item.username === userName
                    );
                    setCartLength(filteredData.length); // Set cart length
                } catch (error) {
                    console.error("Error fetching cart data:", error);
                }
            }
        };

        fetchCartData();
    }, [user]);

    // Function to handle toggle button click
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white shadow-lg fixed w-full z-10  ">
            <div className="container mx-auto flex items-center justify-between p-4">

                <div className="flex items-center">
                    <img src={logo_main} id="user_main_logo" alt="Main Logo" className="h-10" />
                </div>

                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-gray-600 text-3xl focus:outline-none">
                        <i className={`fa-solid ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
                    </button>
                </div>

                <div className={`hidden lg:flex space-x-8`}>
                    <Link to='/'
                        className={`text-gray-600 hover:text-blue-600`}
                    >
                        HOME
                    </Link>
                    <Link to="/about"
                        className="text-gray-600 hover:text-blue-600" activeClassName="text-blue-600"
                    >
                        ABOUT
                    </Link>

                    <div className="relative group">
                        <button className="text-gray-600 hover:text-blue-600">
                            PAGES
                        </button>
                        <div className="absolute left-0 hidden w-40 bg-white shadow-lg group-hover:block">
                            <Link to='/team'
                                className={`block px-4 py-2 text-gray-600 hover:bg-blue-600 hover:text-white `}
                            >
                                TEAM
                            </Link>
                            <Link to='/contact'
                                className={`block px-4 py-2 text-gray-600 hover:bg-blue-600 hover:text-white `}
                            >
                                CONTACT
                            </Link>
                            <Link to='/blog'
                                className={`block px-4 py-2 text-gray-600 hover:bg-blue-600 hover:text-white `}
                            >
                                BLOG
                            </Link>
                        </div>
                    </div>
                    <Link to='/event' className={`text-gray-600 hover:text-blue-600 `}>
                        EVENT
                    </Link>
                    <Link to='/shop' className={`text-gray-600 hover:text-blue-600 `}>
                        SHOP
                    </Link>
                </div>

                {/* User actions */}
                <div className="hidden lg:flex items-center space-x-4">
                    <input
                        type="search"
                        placeholder="Search..."
                        className="border rounded-full p-2"
                        aria-label="Search"
                        id="searchBar"
                    />
                    <Link to='/checkout'>
                        <button className="relative">
                            <i className="fa-solid fa-bag-shopping text-gray-600 text-3xl"></i>
                            <span className="absolute top-0 right-0 translate-x-1 translate-y-1 bg-red-500 text-white text-sm rounded-full px-1">
                                {cartLength}
                            </span>
                        </button>
                    </Link>
                    <div className="relative group">
                        <button className="flex items-center text-gray-600 hover:text-blue-600">
                            Hi! {user ? user : "Guest"} <i className="bi bi-person-circle ml-2"></i>
                        </button>
                        <div className="absolute right-0 hidden w-40 bg-white shadow-lg group-hover:block">
                            <Link to='/profile' className="block px-4 py-2 text-gray-600 hover:bg-blue-600 hover:text-white">
                                <i className="bi bi-person-circle"></i> Profile
                            </Link>
                            <Link to='/login' className="block px-4 py-2 text-gray-600 hover:bg-blue-600 hover:text-white">
                                <i className="bi bi-person-circle"></i> User Login
                            </Link>
                            <Link to='https://laibrary-admin.netlify.app/' className="block px-4 py-2 text-gray-600 hover:bg-blue-600 hover:text-white">
                                <i className="bi bi-person-circle"></i> Admin Login
                            </Link>
                            <div className="border-t border-gray-300"></div>
                            <Link onClick={gotologout} className="block px-4 py-2 text-gray-600 hover:bg-blue-600 hover:text-white">
                                <i className="fa-solid fa-right-to-bracket"></i> Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} p-4 bg-white shadow-lg`}>
                <Link to='/' className="block text-gray-600 hover:text-blue-600 py-2">HOME</Link>
                <Link to='/about' className="block text-gray-600 hover:text-blue-600 py-2">ABOUT</Link>
                <Link to='/team' className="block text-gray-600 hover:text-blue-600 py-2">TEAM</Link>
                <Link to='/contact' className="block text-gray-600 hover:text-blue-600 py-2">CONTACT</Link>
                <Link to='/blog' className="block text-gray-600 hover:text-blue-600 py-2">BLOG</Link>
                <Link to='/event' className="block text-gray-600 hover:text-blue-600 py-2">EVENT</Link>
                <Link to='/shop' className="block text-gray-600 hover:text-blue-600 py-2">SHOP</Link>
                <input
                    type="search"
                    placeholder="Search..."
                    className="w-full border rounded-full p-2 mt-2"
                    aria-label="Search"
                    id="searchBarMobile"
                />
                <div className="flex items-center justify-between mt-4">
                    <Link to='/checkout'>
                        <button className="relative">
                            <i className="fa-solid fa-bag-shopping text-gray-600 text-3xl"></i>
                            <span className="absolute top-0 right-0 translate-x-1 translate-y-1 bg-red-500 text-white text-sm rounded-full px-1">
                                {cartLength}
                            </span>
                        </button>
                    </Link>
                    <div className="relative group">
                        <button className="flex items-center text-gray-600 hover:text-blue-600">
                            Hi! {user ? user : "Guest"} <i className="bi bi-person-circle ml-2"></i>
                        </button>
                        <div className="absolute right-0 mt-4 hidden w-40 bg-white shadow-lg group-hover:block">
                            <Link to='/profile' className="block px-4 py-2 text-gray-600 hover:bg-blue-600 hover:text-white">
                                <i className="bi bi-person-circle"></i> Profile
                            </Link>
                            <Link to='/login' className="block px-4 py-2 text-gray-600 hover:bg-blue-600 hover:text-white">
                                <i className="bi bi-person-circle"></i> User Login
                            </Link>
                            <Link to='https://laibrary-admin.netlify.app/' className="block px-4 py-2 text-gray-600 hover:bg-blue-600 hover:text-white">
                                <i className="bi bi-person-circle"></i> Admin Login
                            </Link>
                            <div className="border-t border-gray-300"></div>
                            <Link onClick={gotologout} className="block px-4 py-2 text-gray-600 hover:bg-blue-600 hover:text-white">
                                <i className="fa-solid fa-right-to-bracket"></i> Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
