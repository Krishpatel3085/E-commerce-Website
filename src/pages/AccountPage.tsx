import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, Package, ShieldCheck, Headset, LogOut, Loader2,
} from 'lucide-react';
import { UserService } from '../services/userService';

// Section Imports
import { UserInfoSection } from '../components/Account/UserInfoSection';
import { MyOrdersSection } from '../components/Account/MyOrdersSection';
import { TermsSection } from '../components/Account/TermsSection';
import { CustomerCareSection } from '../components/Account/CustomerCareSection';

export const AccountPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await UserService.getUser();
            if (response.success) {
                setUserData(response.data);
            }
        } catch (error) {
            console.error("Profile fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProfile(); }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

                {/* --- Sidebar --- */}
                <aside className="w-full md:w-1/4">
                    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6 border border-gray-100">
                        <div className="text-center md:text-left">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4 text-2xl font-bold text-blue-600 uppercase">
                                {userData?.firstName?.[0]}{userData?.lastName?.[0]}
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                                {userData?.firstName} {userData?.lastName}
                            </h2>
                            <p className="text-xs text-gray-400 font-medium">Personal Account</p>
                        </div>
                        <nav className="space-y-1">
                            {[
                                { id: 'profile', label: 'User Information', icon: User },
                                { id: 'orders', label: 'My Orders', icon: Package },
                                { id: 'terms', label: 'Terms & Conditions', icon: ShieldCheck },
                                { id: 'support', label: 'Customer Care', icon: Headset },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === item.id
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                        : 'text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    <item.icon size={18} /> {item.label}
                                </button>
                            ))}
                            <button
                                onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl mt-4 border-t pt-4"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* --- Main Content --- */}
                <main className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[400px]">
                    {activeTab === 'profile' && (
                        <UserInfoSection userData={userData} onUpdate={fetchProfile} />
                    )}

                    {activeTab === 'orders' && (
                        <MyOrdersSection />
                    )}

                    {activeTab === 'terms' && (
                        <TermsSection />
                    )}

                    {activeTab === 'support' && (
                        <CustomerCareSection />
                    )}
                </main>
            </div>
        </div>
    );
};


export const DetailItem = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-2xl bg-gray-50/30">
        <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600 border border-gray-100">
            <Icon size={20} />
        </div>
        <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="text-gray-800 font-bold text-sm leading-tight">{value}</p>
        </div>
    </div>
);

export const InputGroup = ({ label, value, type = "text", onChange }: {
    label: string;
    value: string;
    type?: "text" | "number";
    onChange: (v: string) => void
}) => (
    <div className="space-y-1">
        <label className="text-xs font-bold text-gray-500 uppercase">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-all"
        />
    </div>
);

