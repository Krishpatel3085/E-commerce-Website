import { FileText } from "lucide-react";

export const TermsSection = () => {
    const terms = [
        { title: "User Privacy", content: "We respect your privacy and handle data with extreme security measures." },
        { title: "Refund Policy", content: "Items can be returned within 30 days of delivery in original condition." },
        { title: "Shipping", content: "Orders are usually processed within 24-48 hours with standard tracking." }
    ];

    return (
        <div className="animate-in fade-in duration-500">
            <h3 className="text-2xl font-bold mb-6">Terms & Conditions</h3>
            <div className="space-y-4">
                {terms.map((term, i) => (
                    <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-2 text-blue-600">
                            <FileText size={20} />
                            <h4 className="font-bold text-gray-800">{term.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{term.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
