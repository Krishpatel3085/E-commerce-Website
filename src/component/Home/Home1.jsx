import React, { useCallback, useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import { ShoppingCart, Truck, CreditCard, HeadphonesIcon, RefreshCw, Rocket, Edit, Users } from "lucide-react";
import axios from "axios";
import { FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion"
import { APi_URL } from "../../Utils/apiConfig";
import mainHomeImage from '../images/main_home.jpg';
import { FaShoppingCart } from 'react-icons/fa';
import delivery from "../images/main_home.jpg";
import refund from "../images/bg-1.jpg";
import writing from "../images/bg-2.jpg";
import bgSecond from '../images/group-of-books.jpg'
import writing1 from "../images/hand_writing.jpg";
import Hand_book from "../images/hand_book.jpg";
import chid from "../images/father_book.png";
import read_book from "../images/read_book.jpg";
import one_book from "../images/one_book.jpg";
import second_book from "../images/second_book.jpg";
import third_book from "../images/young-woman.jpg";
import review from "../images/customer_review.jpg";
import slide_1 from "../images/slider img-1.jpg";
import slide_2 from "../images/slider img-2.jpg";
import slide_3 from "../images/slider img-3.jpg";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../NavBar/Header";



export default function BookstoreHomepage() {
    const [items, setItems] = useState([]);
    const [currentReview, setCurrentReview] = useState(0);
    const navigate = useNavigate();



    // main section
    const features = [
        {
            icon: Truck,
            title: "Free Delivery",
            description: "For all member community",
        },
        {
            icon: CreditCard,
            title: "Secure payments",
            description: "Supports various payment",
        },
        {
            icon: HeadphonesIcon,
            title: "24/7 support",
            description: "Ready to serve you",
        },
        {
            icon: RefreshCw,
            title: "7 Days Return",
            description: "7 Days Return",
        },
    ]

    // second section
    const categories = [
        {
            title: "New Release",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit dolor",
            image: delivery,
        },
        {
            title: "Pre Order",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit dolor",
            image: refund,
        },
        {
            title: "Best Seller",
            description: "Lorem ipsum dolor sit amet consectetur adipiscing elit dolor",
            image: writing,
        },
    ]

    const Real = [
        { icon: Rocket, title: "Publishing", description: "Maecenas etiam placerat et has viverra aliquam magnis sapien." },
        { icon: ShoppingCart, title: "Selling Book", description: "Maecenas etiam placerat et has viverra aliquam magnis sapien." },
        { icon: Edit, title: "Editing", description: "Maecenas etiam placerat et has viverra aliquam magnis sapien." },
        { icon: Users, title: "Community", description: "Maecenas etiam placerat et has viverra aliquam magnis sapien." },
    ]

    // blog section
    const blogPosts = [
        {
            id: 1,
            title: "How to Get Started on Bookstagram in 2022",
            date: "May 10, 2022",
            comments: "No Comments",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
            image: read_book,
        },
        {
            id: 2,
            title: "How to Get Started on Bookstagram in 2022",
            date: "May 10, 2022",
            comments: "No Comments",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
            image: one_book,
        },
        {
            id: 3,
            title: "How to Get Started on Bookstagram in 2022",
            date: "May 10, 2022",
            comments: "No Comments",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
            image: second_book,
        },
        {
            id: 4,
            title: "How to Get Started on Bookstagram in 2022",
            date: "May 10, 2022",
            comments: "No Comments",
            excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
            image: third_book,
        },
    ]

    // review section

    const reviews = [
        {
            id: 1,
            name: "Gary F.",
            role: "Journalist",
            content: "I don't always clap, but when I do, it's because of Book. Thank you so much for your help, it's incredible. Thanks to Book, we've just launched our 5th website!",
            avatar: slide_1,
            rating: 5,
        },
        {
            id: 2,
            name: "Sarah L.",
            role: "Book Lover",
            content: "Book has completely transformed how I discover and enjoy literature. The recommendations are spot-on!",
            avatar: slide_2,
            rating: 4,
        },
        {
            id: 3,
            name: "Michael R.",
            role: "Author",
            content: "As an author, I've found Book to be an invaluable platform for connecting with readers. It's user-friendly and effective.",
            avatar: slide_3,
            rating: 3,
        },
    ]

    const nextReview = useCallback(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, [reviews.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            nextReview();
        }, 5000);

        return () => clearInterval(interval);
    }, [nextReview]);


    useEffect(() => {
        axios
            .get(APi_URL + "book/getbook")
            .then((response) => {
                setItems(response.data.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);


    const handleImageClick = (id) => {
        navigate(`/details/${id}`);
    };

    const addToCart = async (item) => {
        const userName = Cookies.get("User-username");

        if (!userName) {
            alert("🙏Please log in to add items to the cart.");
            navigate("/login"); 
            return;
        }

    }
    return (
        <div className="min-h-screen bg-white">
            {/* Responsive Header */}
            <Header/>

            {/* main Section */}
            <section
                className="relative bg-cover bg-center"
                style={{ backgroundImage: `url(${mainHomeImage})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="relative container mx-auto px-4 md:px-6 py-32 text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-snug text-center md:text-left">
                        Grab your next <br />favorite book
                    </h1>
                    <p className="text-base md:text-lg mb-8 text-center md:text-left">
                        Discover new worlds and expand your horizons with our vast collection of books.
                    </p>
                    <Button className="flex items-center justify-center w-32 md:w-36 py-2 text-base md:text-lg border border-white bg-transparent text-white hover:bg-transparent mx-auto md:mx-0">
                        <FaShoppingCart className="mr-2" />
                        Shop Now
                    </Button>
                </div>

                {/* Main section box */}
                <div className="w-full px-4 py-5 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white bg-opacity-90 rounded-2xl p-6 shadow-lg backdrop-blur-sm"
                                >
                                    <div className="flex items-center space-x-4">
                                        <feature.icon className="h-8 w-8 text-danger" />
                                        <div>
                                            <h3 className="text-lg font-semibold">{feature.title}</h3>
                                            <p className="text-sm text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* second  section */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg h-64 group">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                                style={{ backgroundImage: `url(${category.image})` }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-5">
                                <h2 className="text-white text-2xl font-bold mb-2 text-start">{category.title}</h2>
                                <p className="text-white text-sm mb-4">{category.description}</p>
                                <Button
                                    variant="outline"
                                    className="w-28 self-start text-white border-white hover:bg-blue-500 hover:text-black transition-colors duration-300 rounded-lg"
                                >
                                    Shop Now
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Book Categories */}
            <section className="py-10">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-6 border-t border-gray-300 pt-4">
                        <h2 className="text-3xl font-bold text-start mb-4">Discover Your Next Book</h2>
                        <span className="text-blue-500 hover:underline">View All Books</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {items.map((item, index) => (
                            <div key={index} className="overflow-hidden h-[600px] border rounded-lg shadow-lg text-center p-2">
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    className="w-[351px] h-[400px] object-cover mx-auto rounded-lg"
                                    onClick={() => handleImageClick(item._id)}
                                />
                                <div className="p-2 text-center">
                                    <h2 className="text-2xl font-bold pb-2">{item.title}</h2>
                                    <h3 className="text-lg pb-2">{item.author}</h3>
                                    <div className="flex justify-center items-center space-x-2 pb-2">
                                        <span className="text-base text-gray-500 line-through">${item.price2}.00</span>
                                        <span className="text-xl text-red-500 font-bold">${item.price}.00</span>
                                    </div>
                                    <Button className="text-red-500 bg-transparent text-lg mt-2 border border-red-500 rounded hover:bg-transparent hover:text-red-500" onClick={() => addToCart(item)}>
                                        Shop Now
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Flash Sale Banner */}
            <div className="container rounded-md overflow-hidden">
                <div className="relative h-[300px] md:h-[400px] bg-cover bg-center " style={{ backgroundImage: `url(${bgSecond})` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                        <span className="text-sm md:text-base font-semibold mb-2">Flash SALE!</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-4">
                            Flat 50% OFF. Hurry up before the stock ends
                        </h2>
                        <Button variant="outline" className="w-32 text-white border-white hover:bg-transparent hover:text-white">
                            Shop Now
                        </Button>
                    </div>
                </div>
            </div>


            {/* About Author Section */}
            <div className="container mx-auto px-4 py-12 bg-[#faf9f5] my-5 rounded-lg">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="md:w-1/2 p-6 md:p-12">
                        <span className="text-danger font-semibold text-lg md:text-xl">About Author</span>
                        <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4 text-start">
                            Writing books makes the world go round
                        </h2>
                        <p className="text-gray-600 mb-4 text-base md:text-md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                            ullamcorper mattis, pulvinar dapibus leo.
                        </p>
                        <p className="text-gray-600 mb-6 text-base md:text-lg">
                            Interdum donec fringilla consectetuer senectus proin odio ultricies tincidunt. Leo molestie
                            bibendum eget aenean vulputate taciti proin volutpat purus.
                        </p>
                        <Button variant="default" className="w-40 text-white bg-danger border-danger hover:bg-danger hover:text-white">
                            Discover More
                        </Button>
                    </div>

                    <div className="md:w-1/2">
                        <img
                            src={writing1}
                            alt="Author writing on a typewriter"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>



            <div className="container mx-auto px-4 py-16">
                {/* Writing Books Section */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-16">
                    <div className="lg:w-1/2">
                        <img
                            src={Hand_book}
                            alt="Writing setup"
                            width={600} height={400} className="rounded-lg shadow-lg" />
                    </div>
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-bold mb-6 text-gray-800 text-start">
                            It is more than just <br /> writing books
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Real.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="flex items-start space-x-3 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                                >
                                    <feature.icon className="w-10 h-10 text-red-500 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                                        <p className="text-sm text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            {/* Book Promotion Section */}
            <div className="w-full bg-[#f5f0e8] py-12">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                        {/* Text Section */}
                        <div className="lg:w-1/2 p-6 lg:p-12">
                            <span className="text-red-500 font-semibold text-lg lg:text-xl">NEW RELEASE</span>
                            <h2 className="text-2xl lg:text-3xl font-bold mt-2 mb-4 text-gray-800 text-start">Me & My Dad</h2>
                            <p className="text-gray-600 text-md lg:text-lg mb-4">A novelette book by John Doe</p>
                            <p className="text-gray-600 text-sm lg:text-base mb-6">
                                Morbi pron condimentum urna duis lectus vivamus parturient torquent. Praesus fames lectus
                                molestie socils lacus condimentum duis. At ligula etiam magna efficitur quisque in. Maecenas
                                mattis integer sapien etiam dui sem quis libero. Fames magnis dictum. Et vivamus vehicula
                                interque portia diam sit. Interdum viverra semper dolor dignissim cum habitasse orci. Elementum
                                ullamcorper libero magna mortes ut orci suspendisse magna nam id ligula.
                            </p>
                            <p className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Price: <span className="text-danger">$40.00</span></p>
                            <Button className="w-40 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md border-0">
                                Add to Cart
                            </Button>
                        </div>

                        {/* Image Section */}
                        <div className="lg:w-1/2 flex justify-center p-6 lg:p-12">
                            <img
                                src={chid}
                                alt="Me & My Dad book cover"
                                width={500}
                                height={400}
                                className=" rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* blog section */}
            <div className="container mx-auto px-4">
                {/* Blog & News Section */}
                <div className="mb-16">
                    <div className="flex justify-between items-center mb-8 mt-5">
                        <h2 className="text-3xl font-bold text-gray-800">Blog & News</h2>
                        <Button variant="outline" className="w-48 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md border-0">View All Articles</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="overflow-hidden border rounded-lg shadow">
                            <img
                                src={blogPosts[0].image}
                                alt={blogPosts[0].title}
                                width={600}
                                height={400}
                                className="w-full h-64 object-cover m-0 p-0"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{blogPosts[0].title}</h3>
                                <p className="text-sm text-danger mb-2">
                                    {blogPosts[0].date} - {blogPosts[0].comments}
                                </p>
                                <p className="text-gray-600">{blogPosts[0].excerpt}</p>
                                <Button variant="link" className="mt-4 p-0 w-40 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md border-0 no-underline">
                                    Continue Reading
                                </Button>

                            </div>
                        </div>
                        <div className="space-y-6">
                            {blogPosts.slice(1, 4).map((post) => (
                                <div key={post.id} className="flex overflow-hidden border rounded-lg shadow">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        width={150}
                                        height={100}
                                        className="w-1/3 object-cover m-0 p-0"
                                    />
                                    <div className="p-4 w-2/3">
                                        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                                        <p className="text-sm text-danger mb-2">
                                            {post.date} - {post.comments}
                                        </p>
                                        <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            {/* review section */}
            <div className="container mx-auto px-4 mb-5">
                <div className="relative bg-white rounded-lg shadow-lg p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

                        <div className="w-full md:w-1/2">
                            <img
                                src={review}
                                alt="Customer review"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <h2 className="text-2xl font-bold text-danger mb-4 text-start">Testimonials</h2>

                            <p className="text-lg text-gray-700 mb-4 md:mb-10 leading-relaxed">
                                Porttitor eleifend facilisi euismod litora etiam consectetur. Vivamus platea quisque mauris si blandit diam id a primis himenaeos. Natoque vulputate duis nec mauris tristique integer mi. Pharetra libero quam morbi lectus lacinia. Pharetra lacus ut litora mattis cras arcu tortor bibendum vitae.
                            </p>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentReview}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{ duration: 0.5 }}
                                    className="h-full flex flex-col justify-center"
                                >
                                    <p className="text-xl text-gray-600 mb-6">{reviews[currentReview].content}</p>
                                    <div className="flex items-center mb-2">
                                        <img
                                            src={reviews[currentReview].avatar}
                                            alt={reviews[currentReview].name}
                                            className="w-12 h-12 rounded-full mr-4" // Adjust size for avatar
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-800">{reviews[currentReview].name}</p>
                                            <p className="text-sm text-gray-500">{reviews[currentReview].role}</p>
                                        </div>
                                    </div>

                                    {/* Star Rating */}
                                    <div className="flex mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={i < reviews[currentReview].rating ? 'text-yellow-500' : 'text-gray-300'}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>


            {/* Footer */}
            <Footer />
        </div >
    )
}
