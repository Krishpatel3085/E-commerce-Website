import { Mail, Phone, MapPin, } from 'lucide-react';

export const CustomerCareSection = () => {
    const contacts = [
        { label: "Email Support", value: "support@yourdomain.com", icon: Mail },
        { label: "Phone Line", value: "+91 99999 00000", icon: Phone },
        { label: "Corporate Office", value: "Mumbai, Maharashtra, India", icon: MapPin }
    ];

    return (
        <div className="animate-in fade-in duration-500">
            <h3 className="text-2xl font-bold mb-6">Customer Care</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {contacts.map((c, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border rounded-2xl">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><c.icon size={20} /></div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{c.label}</p>
                            <p className="text-sm font-bold text-gray-800">{c.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-blue-600 rounded-3xl p-8 text-white">
                <h4 className="text-xl font-bold mb-2">Need Immediate Help?</h4>
                <p className="text-blue-100 text-sm mb-6">Our live support is available 24/7 for order-related queries.</p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all">Start Live Chat</button>
            </div>
        </div>
    );
};