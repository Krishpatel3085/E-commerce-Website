import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import { Tab, Nav } from 'react-bootstrap';
import Header from "../NavBar/Header";
import Footer from "../footer/Footer";
import bgSecond from '../images/group-of-books.jpg';
import professional from "../images/professional.jpg";
import { APi_URL } from "../../Utils/apiConfig";

import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Details() {
  const [selectedTab, setSelectedTab] = useState('Description');
  const { _id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(APi_URL + `book/get1book/${_id}`);
        console.log("API Response:", response);
        if (response.data && response.data.data) {
          console.log("API Data:", response.data.data);
          setItem(response.data.data);
        } else {
          console.error("Unexpected response structure:", response);
        }
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;
  if (!item) return <div>No data found</div>;

  return (
    <>
      <Header />


      <div className="min-h-screen bg-gray-50 pt-5 ">
        <section id="content" className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 pt-4">
              <div className="md:w-1/2" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500">
                <img
                  src={item.url}
                  alt={item.title}
                  className="rounded-lg shadow-lg w-[400px] h-[510px] m-auto"
                />
              </div>
              <div className="md:w-1/2" data-aos="fade-up" data-aos-duration="3000">
                <div className="mb-4">
                  <span className="text-gray-500 line-through mr-2">${item.price2}.00</span>
                  <span className="text-red-600 font-bold text-2xl">${item.price}.00</span>
                </div>
                <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <div className="flex items-center mb-6">
                  <span className="mr-2">Share:</span>
                  <Facebook className="w-6 h-6 text-blue-600 mr-2" />
                  <Twitter className="w-6 h-6 text-blue-400 mr-2" />
                  <Linkedin className="w-6 h-6 text-blue-700 mr-2" />
                  <Instagram className="w-6 h-6 text-pink-600" />
                </div>
                <hr className="mb-6" />
                <p className="mb-2"><strong>Author:</strong> {item.author}</p>
                <p className="mb-6"><strong>Language:</strong> {item.language}</p>
                <button className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition duration-300">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <Tab.Container activeKey={selectedTab} onSelect={(k) => setSelectedTab(k)}>
              <Nav variant="tabs" className="flex space-x-4 border-b">
                {['Description', 'Additional information', 'Reviews'].map((category) => (
                  <Nav.Item key={category}>
                    <Nav.Link
                      eventKey={category}
                      className={`py-2 px-4 text-lg font-medium leading-5 ${selectedTab === category
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      {category}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
              <Tab.Content className="mt-4">
                <Tab.Pane eventKey="Description" data-aos="flip-up" data-aos-duration="3000">
                  <h2 className="text-2xl font-bold mb-4">Description</h2>
                  <p className="text-gray-600">{item.description}</p>
                </Tab.Pane>
                <Tab.Pane eventKey="Additional information">
                  <h3 className="text-xl font-bold mb-4">Additional information</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="bg-gray-100">
                        <td className="p-2">Weight</td>
                        <td className="p-2">0.2Kg</td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className="p-2">Dimension</td>
                        <td className="p-2">20*10*5 CM</td>
                      </tr>
                    </tbody>
                  </table>
                </Tab.Pane>
                <Tab.Pane eventKey="Reviews">
                  <h4 className="text-xl font-bold mb-4">Reviews</h4>
                  <p className="mb-4">There are no reviews yet.</p>
                  <p className="mb-4">Be the first to review "{item.title}"</p>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="review" className="block mb-2">Your review *</label>
                      <textarea id="review" className="w-full p-2 border rounded" rows={4}></textarea>
                    </div>
                    <div>
                      <label htmlFor="name" className="block mb-2">Name *</label>
                      <input type="text" id="name" className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2">Email *</label>
                      <input type="email" id="email" className="w-full p-2 border rounded" />
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="save-info" className="mr-2" />
                      <label htmlFor="save-info">Save my name, email, and website in this browser for the next time I comment.</label>
                    </div>
                    <button type="submit" className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-gray-700 transition duration-300">
                      Submit
                    </button>
                  </form>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </section>

        <section id="writing" className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2" data-aos="fade-down-left" data-aos-duration="3000">
                <h6 className="text-red-600 uppercase mb-2">About The Author</h6>
                <h2 className="text-4xl font-bold mb-4">
                  "My enthusiasm for <br /> writing never stops" - <br /> John Doe
                </h2>
                <p className="text-gray-600 mb-6">
                  Nullam venenatis neque dis viverra hendrerit faucibus ornare feugiat urna. Tristique sollicitudin penatibus velit a class
                  auctor himenaeos. Mollis semper luctus sit efficitur nam vitae feugiat enim tortor. Tortor montes integer cras massa donec ex
                  ligula. Aliquet fringilla tellus mattis augue nam dui justo aliquam quisque suspendisse maximus. Pede velit ut dapibus
                  suspendisse vivamus pulvinar nostra morbi curae potenti netus.
                </p>
                <span className="text-dark-600 hover:underline">
                  View All My Books
                </span>
              </div>
              <div className="md:w-1/2" data-aos="fade-down-right" data-aos-duration="3000">
                <img
                  src={professional}
                  alt="Author"
                  className="rounded-lg shadow-lg w-full h-auto p-3"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Flash Sale Banner */}
        <div className="container rounded-lg overflow-hidden my-4">
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

      </div>



      <Footer />
    </>
  );
}


