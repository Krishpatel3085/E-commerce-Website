import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../footer/Footer";
import Cookies from "js-cookie";
import { APi_URL } from "../../Utils/apiConfig";
import Header from "../NavBar/Header";
// import Button from 'react-bootstrap/Button';


import { Button } from "../ui/Button";
import { Input } from "../ui/Input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
import { X } from "lucide-react"

export default function Component() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [cart, setCart] = useState([]);
  const [gtotal, setGtotal] = useState(0);
  const [isSelectOpen, setIsSelectOpen] = useState(false); // Track dropdown state
  const [selectedState, setSelectedState] = useState("");

  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');

  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [state, setState] = useState('');



  useEffect(() => {
    const fetchCartData = async () => {
      const userName = Cookies.get("User-username");

      if (!userName) {
        alert("No user is logged in");
        return;
      }

      try {
        const response = await axios.get(APi_URL + `checkout/getorder`, {
          params: { username: userName }, // Pass username as query parameter
        });
        console.log("Checkout data fetch", response.data)
        const fetchedData = response.data || [];

        const filteredData = fetchedData.filter((item) => item.username === userName);

        console.log("filtered data", filteredData);

        const mergedCart = filteredData.reduce((acc, item) => {
          const existingItem = acc.find((i) => i.title === item.title);
          if (existingItem) {
            existingItem.quantity += item.quantity;
            existingItem.subtotal = existingItem.price * existingItem.quantity;
          } else {
            item.subtotal = item.price * item.quantity;
            acc.push(item);
          }
          return acc;
        }, []);

        setCart(mergedCart);

        const total = mergedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setGtotal(total);

      } catch (error) {
        console.error("Error fetching cart data:", error);
        alert("There was an error fetching your cart.");
      }
    };

    fetchCartData();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(APi_URL + `checkout/orderDelete/${id}`);

      const updatedCart = cart.filter((item) => item._id !== id);
      setCart(updatedCart);

      const total = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setGtotal(total);

    } catch (error) {
      console.error("There was an error deleting the item!", error);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpay = async () => {
    const token = localStorage.getItem("token")
    const isLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Fetch the order details from the backend to create a Razorpay order
    try {
      const response = await axios.post(APi_URL + "Payment/createPayment", {
        amount: gtotal,
      });
      console.log("Check payment response", response);
      const { data } = response.data;

      const options = {
        key: "rzp_test_BzZtWGTclpXVBE",
        amount: gtotal * 100,
        currency: "INR",
        order_id: data.id,
        handler: async (response) => {
          console.log("Check payment verified", response);


          const completeAddress = landmark + area + city + pincode + state;

          try {
            const verificationResponse = await axios.post(APi_URL + "Payment/verifyPayment", {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              paymentMethod: "Razorpay",
              adress: completeAddress,
              customerName: customerName,
              customerNumber: customerNumber,
              amount: gtotal,
              items: cart
            },
              {
                headers: {
                  'Authorization': ` Bearer ${token}`
                },
              }
            );

            if (verificationResponse.data.success) {
              alert("Payment successful and data created!");
              setCart([]);
              setGtotal(0);
            } else {
              alert("Payment was verified, but data creation failed.");
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("There was an error verifying the payment.");
          }
        },
        prefill: {
          name: customerName,
          contact: customerNumber,
          email: "customer@example.com"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      alert("There was an error processing your payment.");
    }
  };


  // Indian states
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ]
  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleSelect = (state) => {
    setSelectedState(state); // Set selected state
    setIsSelectOpen(false); // Close dropdown
  };
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Cart</h1>

        {/* Cart Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="py-4 px-6 text-left">Remove</th>
                <th className="py-4 px-6 text-left">Image</th>
                <th className="py-4 px-6 text-left">Product</th>
                <th className="py-4 px-6 text-left">Price</th>
                <th className="py-4 px-6 text-left">Quantity</th>
                <th className="py-4 px-6 text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <tr className="border-b" key={index}>
                    <td className="py-4 px-6">
                      <Button variant="ghost" size="sm" onClick={() => deleteItem(item._id)}>
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </td>
                    <td className="py-4 px-6">
                      <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover" />
                    </td>
                    <td className="py-4 px-6">{item.title}</td>
                    <td className="py-4 px-6">${item.price.toFixed(2)}</td>
                    <td className="py-4 px-6">{item.quantity}</td>
                    <td className="py-4 px-6">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-600">
                    Your cart is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total and Checkout */}
        <div className="flex justify-end mt-8">
          <div className="w-full max-w-md">
            <div className="flex justify-between py-2">
              <span className="font-bold">Grand total:</span>
              <span className="font-bold">${gtotal.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white" onClick={() =>
              setIsModalOpen(true)}
            >
              Checkout
            </Button>
          </div>
        </div>

        {/* Checkout Modal */}
        <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Checkout Details</DialogTitle>
            </DialogHeader>
            <form className="space-y-6 mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleRazorpay(); // Call Razorpay function here
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Customer Name
                  </label>
                  <Input id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="mobile" className="text-sm font-medium">
                    Mobile Number
                  </label>
                  <Input id="mobile" type="tel"
                    value={customerNumber}
                    onChange={(e) => setCustomerNumber(e.target.value)}
                    required />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Address Details</h3>

                <div className="space-y-0 grid grid-cols-1">
                  <label htmlFor="area" className="text-sm font-medium">
                    Area, Street, Flat/House
                  </label> <br />
                  <Input id="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    required />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="house" className="text-sm font-medium">
                      House No, Flat/Company
                    </label>
                    <Input id="house"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="pincode" className="text-sm font-medium">
                      Pincode
                    </label>
                    <Input id="pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">
                      Town/City
                    </label>
                    <Input id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="state" className="text-sm font-medium">
                      State
                    </label>
                    <Select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <SelectTrigger onClick={toggleSelect}>
                        <SelectValue value={selectedState} />
                      </SelectTrigger>
                      <SelectContent isOpen={isSelectOpen}>
                        {indianStates.map((state) => (
                          <SelectItem
                            key={state}
                            value={state}
                            onSelect={() => handleSelect(state)}

                          >
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#8b4513] hover:bg-[#d2691e] text-white"
                onClick={handleRazorpay}
              >
                Proceed to Payment
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  )
}