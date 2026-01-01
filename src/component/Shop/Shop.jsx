import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import chid from "../images/father_book.png";
import Footer from "../footer/Footer";
import { APi_URL } from "../../Utils/apiConfig";
import Button from 'react-bootstrap/Button';
import Main_bg from '../images/young-bookstore.jpg';
import Header from "../NavBar/Header";

function Shop() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

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

  const addToCart = async (item) => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.post(APi_URL + "checkout/order", {
        itemId: item._id,
        title: item.title,
        imageUrl : item.url,
        price: item.price,
        author : item.author,
        quantity: 1,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

      if (response.data) {
        alert("Item added to cart successfully");
        navigate("/checkout");
      } else {
        alert(`Failed to add item to cart: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="bg-gray-900 text-white py-20 flex items-center justify-center"
        style={{
          backgroundImage: `url(${Main_bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '400px'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h4 className="mb-4">
            <span>
              Home <span className="mx-3">📚</span> Shop
            </span>
          </h4>
          <h2 className="text-4xl font-bold text-light">
            SHOP
          </h2>
        </div>
      </section>

      {/* Second Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-aos="fade-left" data-aos-duration="2000">
              Discover new books
            </h2>
            <p className="text-gray-600" data-aos="fade-left" data-aos-duration="2000">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec <br className="hidden md:block" /> ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>

          <div className="flex justify-between items-center mb-6 border-t border-gray-300 pt-4">
            <h2 className="text-3xl font-bold text-start mb-4">Discover Your Next Book</h2>
            <span className="text-blue-500 hover:underline cursor-pointer">View All Books</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className="overflow-hidden h-[600px] border rounded-lg shadow-lg text-center">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-[400px] object-cover mx-auto"
                  />
                  <div className="p-2 text-center">
                    <h2 className="text-2xl font-bold pb-2">{item.title}</h2>
                    <h3 className="text-lg pb-2">{item.author}</h3>
                    <div className="flex justify-center items-center space-x-2 pb-2">
                      <span className="text-base text-gray-500 line-through">${item.price2}.00</span>
                      <span className="text-xl text-red-500 font-bold">${item.price}.00</span>
                    </div>
                    <Button
                      className="w-28 text-red-500 border border-red-500 rounded-lg bg-white hover:text-black transition-all duration-300 ease-in-out"
                      onClick={() => addToCart(item)}
                    >
                      Shop Now
                    </Button>

                  </div>
                </div>
              ))
            ) : (
              <p>Loading Books...</p>
            )}
          </div>
        </div>
      </section>

      {/* Third Section */}
      <div className="w-full bg-[#f5f0e8] py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
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
              <p className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Price: <span className="text-red-500">$40.00</span></p>
              <Button className="w-40 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md border-0">
                Add to Cart
              </Button>
            </div>

            <div className="lg:w-1/2 flex justify-center p-6 lg:p-12">
              <img
                src={chid}
                alt="Me & My Dad book cover"
                className="rounded-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Shop;
