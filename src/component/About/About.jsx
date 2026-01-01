import React, { useCallback, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Footer from "../footer/Footer";
import about_img from '../images/multicultural-students.jpg'
import { ShoppingCart, Rocket, Edit, Users, Facebook, Twitter, Linkedin } from "lucide-react";
import Hand_book from "../images/hand_book.jpg";
import book2 from "../images/books-2.jpg";
import { motion, AnimatePresence } from "framer-motion"
import slide_1 from "../images/slider img-1.jpg";
import slide_2 from "../images/slider img-2.jpg";
import slide_3 from "../images/slider img-3.jpg";
import review from "../images/customer_review.jpg";
import { FaStar } from 'react-icons/fa';
import book3 from "../images/img_7.jpg";
import book4 from "../images/img_8.jpg";
import book5 from "../images/img_9.jpg";
import Header from "../NavBar/Header";



export default function About() {
  const [currentReview, setCurrentReview] = useState(0);

  // Team

  const teamMembers = [
    {
      name: "John Doe",
      role: "Creative Director",
      image: book3,
      social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      name: "Jane Smith",
      role: "Lead Designer",
      image: book5,
      social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
    {
      name: "Mike Johnson",
      role: "Senior Developer",
      image: book4,
      social: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
      },
    },
  ]

  const Real = [
    { icon: Rocket, title: "Publishing", description: "Maecenas etiam placerat et has viverra aliquam magnis sapien." },
    { icon: ShoppingCart, title: "Selling Book", description: "Maecenas etiam placerat et has viverra aliquam magnis sapien." },
    { icon: Edit, title: "Editing", description: "Maecenas etiam placerat et has viverra aliquam magnis sapien." },
    { icon: Users, title: "Community", description: "Maecenas etiam placerat et has viverra aliquam magnis sapien." },
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


  return (
    <>

      <Header />
      <div className="min-h-screen bg-white">

        <section className="bg-gray-900 text-white py-20 flex items-center justify-center"
          style={{
            backgroundImage: `url(${about_img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '400px'
          }}
        >
          <div className="container mx-auto px-4 text-center ">
            <h4 className="mb-4">
              <span>
                Home <span className="mx-3">📚</span>About
              </span>
            </h4>
            <h2 className="text-4xl font-bold text-light">
              About Us
            </h2>
          </div>
        </section>

        <div className="container mx-auto">
          <div className=" bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Bookarazi</h1>
                <p className="text-xl text-gray-600">For bookworms, by passionate writers</p>
              </header>

              <main className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <p className="text-gray-700 ">
                      Euismod magna dui sagittis curabitur convallis pulvinar. Mollis neque lacinia himenaeos
                      eleifend sit justo convallis augue. Tellus rhoncus euismod vestibulum vehicula parturient
                      sagittis laoreet conubia hac. Tortor faucibus sem facilisi efficitur amet fusce. Consequat
                      facilisis taciti lorem conubia venenatis cursus odio egestas. Neque mattis dis est non augue.
                      Feugiat sed velit ornare ad blandit semper erat congue integer consequat.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-900 text-start">
                      Porttitor consectetur ad sed vitae accumsan in maximus commodo semper iaculis. Vel sociosqu mattis quis eros neque fermentum justo bibendum amet.
                    </h2>
                    <p className="text-gray-700">
                      Dictum quam natoque ridiculus ligula pretium. Magna vel felis dolor nisi tristique viverra
                      platea placerat imperdiet montes. Blandit penatibus imperdiet leo primis ipsum. Suscipit
                      rutrum finibus vulputate ut mauris odio suspendisse libero. Urna cubilia metus sollicitudin
                      dapibus condimentum molestie est vehicula netus sed efficitur.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <p className="text-gray-700">
                      Laoreet gravida congue aliquam etiam facilisi porta mollis. Platea feugiat a scelerisque
                      imperdiet parturient enim venenatis vitae ut sed luctus. Nisl primis vulputate si interdum
                      conubia sit cursus mollis enim. Lacus ridiculus nisi risus quam enim venenatis consectetuer
                      libero lectus.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900">Discover More</h3>
                    <img
                      src={book2}
                      alt="Books scattered on a couch"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </main>
            </div>
          </div>

        </div>
      </div>

      {/* Writing Books Section */}
      <div className="container  px-4 py-5">
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


      {/* team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center lg:items-start">
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <h3 className="text-red-500 font-semibold mb-2">THE TEAM</h3>
              <h2 className="text-4xl font-bold mb-4 text-start">Our Creative Team</h2>
              <p className="text-gray-600 mb-6">
                Volutpat placerat sollicitudin per tristique magnis iaculis arcu torquent turpis.
              </p>
              <Button className="w-48 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md border-0">
                View All Members
              </Button>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="relative group">
                  <img
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-center items-center text-white">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm mb-4">{member.role}</p>
                    <div className="flex space-x-4">
                      <a href={member.social.facebook} className="hover:text-red-500 transition-colors">
                        <Facebook size={24} />
                      </a>
                      <a href={member.social.twitter} className="hover:text-red-500 transition-colors">
                        <Twitter size={24} />
                      </a>
                      <a href={member.social.linkedin} className="hover:text-red-500 transition-colors">
                        <Linkedin size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


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


      {/* footer */}
      <Footer />
    </>
  );
}



