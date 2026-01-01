import { useEffect, useState } from 'react'
import { Button } from "../component/ui/Button"
import { Input } from "../component/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "../component/ui/Card"
import { Tabs, TabsContent } from "../component/ui/Tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../component/ui/Avatar"
import { ShoppingCart, User, CreditCard, Settings, LogOut } from "lucide-react"
import Header from '../component/NavBar/Header'
import Footer from '../component/footer/Footer'
import { APi_URL } from '../Utils/apiConfig'
import axios from 'axios'
import Cookies from 'js-cookie'
export default function UserProfile() {
    const [activeTab, setActiveTab] = useState("profile")
    const [cartItems, setcartItems] = useState("")

    const name = localStorage.getItem("username")
    const email = localStorage.getItem("useremail")
    const user = {
        name: name,
        email: email,
        avatar: "/placeholder.svg?height=100&width=100&text=JD",
        joinDate: "January 2023",

    }

    // const cartItems = [
    //     { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 12.99 },
    //     { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 14.99 },
    //     { id: 3, title: "1984", author: "George Orwell", price: 11.99 },
    // ]

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

                setcartItems(mergedCart);

                // const total = mergedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                // setGtotal(total);

            } catch (error) {
                console.error("Error fetching cart data:", error);
                alert("There was an error fetching your cart.");
            }
        };

        fetchCartData();
    }, []);
    const transactions = [
        { id: 1, date: "2023-10-15", amount: 27.98, items: 2 },
        { id: 2, date: "2023-09-22", amount: 14.99, items: 1 },
        { id: 3, date: "2023-08-30", amount: 39.97, items: 3 },
    ]

    return (
        <div className="min-h-screen bg-[#f5f0e8]">

            <Header />

            <main className="container mx-auto px-4 py-8 pt-5 ">
                <div className="grid md:grid-cols-[250px_1fr] gap-8 pt-5 mt-5">
                    <aside>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center">
                                    <Avatar className="w-24 h-24 mb-4">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-2xl font-bold text-[#8b4513] mb-2">{user.name}</h2>
                                    <p className="text-[#d2691e] mb-4">{user.email}</p>
                                    <p className="text-sm text-[#8b4513]">Member since {user.joinDate}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <nav className="mt-8">
                            <Button
                                variant="ghost"
                                className={`w-full d-flex justify-content-start mb-2 ${activeTab === 'profile' ? 'bg-[#f5f0e8] text-[#8b4513]' : 'text-[#d2691e]'}`}
                                onClick={() => setActiveTab('profile')}
                            >
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full d-flex justify-content-start mb-2 ${activeTab === 'cart' ? 'bg-[#f5f0e8] text-[#8b4513]' : 'text-[#d2691e]'}`}
                                onClick={() => setActiveTab('cart')}
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Cart
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full d-flex justify-content-start mb-2 ${activeTab === 'transactions' ? 'bg-[#f5f0e8] text-[#8b4513]' : 'text-[#d2691e]'}`}
                                onClick={() => setActiveTab('transactions')}
                            >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Transactions
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full d-flex justify-content-start mb-2 ${activeTab === 'settings' ? 'bg-[#f5f0e8] text-[#8b4513]' : 'text-[#d2691e]'}`}
                                onClick={() => setActiveTab('settings')}
                            >
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Button>
                            <Button variant="ghost" className="w-full d-flex justify-content-start text-red-500">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </nav>
                    </aside>
                    <div>
                        <Tabs value={activeTab} className="space-y-4">
                            <TabsContent value="profile">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Profile Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <form className="space-y-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-[#8b4513]">Name</label>
                                                <Input id="name" defaultValue={user.name} className="mt-1" />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-[#8b4513]">Email</label>
                                                <Input id="email" defaultValue={user.email} className="mt-1" />
                                            </div>
                                            <div>
                                                <label htmlFor="bio" className="block text-sm font-medium text-[#8b4513]">Bio</label>
                                                <textarea
                                                    id="bio"
                                                    rows={3}
                                                    className="mt-1 block w-full rounded-md border-[#d2691e] shadow-sm focus:border-[#8b4513] focus:ring focus:ring-[#8b4513] focus:ring-opacity-50"
                                                    placeholder="Tell us about yourself..."
                                                />
                                            </div>
                                            <Button className="bg-[#d2691e] text-white hover:bg-[#8b4513]">Save Changes</Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="cart">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Shopping Cart</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {cartItems.length > 0 ? (
                                            <ul className="divide-y divide-[#d2691e]">
                                                {cartItems.map((item) => (
                                                    <li key={item.id} className="py-4 flex justify-between">
                                                        <div>
                                                            <h3 className="text-lg font-medium text-[#8b4513]">{item.title}</h3>
                                                            <p className="text-[#d2691e]">{item.author}</p>
                                                        </div>
                                                        <div className="text-[#8b4513] font-bold">${item.price.toFixed(2)}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-center text-[#d2691e]">Your cart is empty</p>
                                        )}
                                        {cartItems.length > 0 && (
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="text-lg font-bold text-[#8b4513]">
                                                    Total: ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                                                </div>
                                                <Button className="bg-[#d2691e] text-white hover:bg-[#8b4513]">Checkout</Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="transactions">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Transaction History</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {transactions.length > 0 ? (
                                            <ul className="divide-y divide-[#d2691e]">
                                                {transactions.map((transaction) => (
                                                    <li key={transaction.id} className="py-4 flex justify-between">
                                                        <div>
                                                            <h3 className="text-lg font-medium text-[#8b4513]">{transaction.date}</h3>
                                                            <p className="text-[#d2691e]">{transaction.items} item(s)</p>
                                                        </div>
                                                        <div className="text-[#8b4513] font-bold">${transaction.amount.toFixed(2)}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-center text-[#d2691e]">No transactions yet</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="settings">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Account Settings</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <form className="space-y-4">
                                            <div>
                                                <label htmlFor="password" className="block text-sm font-medium text-[#8b4513]">New Password</label>
                                                <Input id="password" type="password" className="mt-1" />
                                            </div>
                                            <div>
                                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#8b4513]">Confirm New Password</label>
                                                <Input id="confirmPassword" type="password" className="mt-1" />
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    id="notifications"
                                                    type="checkbox"
                                                    className="h-4 w-4 text-[#8b4513] focus:ring-[#d2691e] border-[#d2691e] rounded"
                                                />
                                                <label htmlFor="notifications" className="ml-2 block text-sm text-[#8b4513]">
                                                    Receive email notifications
                                                </label>
                                            </div>
                                            <Button className="bg-[#d2691e] text-white hover:bg-[#8b4513]">Update Settings</Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}