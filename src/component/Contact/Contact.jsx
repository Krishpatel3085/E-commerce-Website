import React from "react";
import Button from 'react-bootstrap/Button';
import { FaBook, FaBuilding, FaPhone, FaEnvelope } from 'react-icons/fa'; // React Icons
import Footer from "../footer/Footer";
import contact from '../images/reading-a-book.jpg'
import Header from "../NavBar/Header";

function Contact() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100">
        <section className="bg-gray-900 text-white py-20 flex items-center justify-center"
          style={{
            backgroundImage: `url(${contact})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '400px'
          }} >
            
          <div className="container mx-auto px-4 text-center">
            <h4 className="mb-4">
              <span className='text-dark text-2xl'>
                Home <span className="mx-3">📚</span>Contact
              </span>
            </h4>
            <h2 className="text-4xl font-bold">
            Contact Us
            </h2>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="row">
            {[
              { title: 'Bookstore Central', icon: <FaBook /> },
              { title: 'Publishing Office', icon: <FaBuilding /> },
              { title: 'Phone / FAX', icon: <FaPhone /> },
              { title: 'Email Address', icon: <FaEnvelope /> }
            ].map((item, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-3 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-md ">
                  <div className="icon mb-3 text-danger text-center" style={{ fontSize: "2rem" }}>
                    {item.icon}
                  </div>
                  <h2 className="text-xl font-semibold mb-2 ">{item.title}</h2>
                  <p className="text-gray-600">123 Example Street</p>
                  <p className="text-gray-600">City, State 12345</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Map and Form Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="row">
            {/* Map */}
            <div className="col-12 col-lg-6 mb-4">
              <div className="bg-gray-300 md:h-80 rounded-lg overflow-hidden h-100">
                <div className="w-full flex items-center justify-center text-gray-500">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d289177.0732720988!2d72.41493388340731!3d23.02047409694801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e1!3m2!1sen!2sin!4v1722940937079!5m2!1sen!2sin"
                    width="100%"
                    height={470}
                    style={{ border: 0, borderRadius: "20px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="map"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-12 col-lg-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <span className="text-danger pb-2">Send us a message</span>
                <h2 className="text-2xl font-semibold mb-4">We will be in touch shortly</h2>
                <form className="space-y-4">
                  <input className="form-control mb-3" placeholder="Name" />
                  <input className="form-control mb-3" type="email" placeholder="Email" />
                  <input className="form-control mb-3" placeholder="Subject" />
                  <textarea className="form-control mb-3" placeholder="Message" rows="4" />
                  <Button className="w-full bg-ganger" >Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
