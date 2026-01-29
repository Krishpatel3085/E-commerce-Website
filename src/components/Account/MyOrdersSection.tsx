import { useEffect, useState } from "react";
import { OrderService } from "../../services/OrderService";
import { Camera, Eye, Loader2, Pen, ShoppingBag, Star, User, X } from "lucide-react";
import { Button } from "../ui/Button";
import { useAuth } from "../../contexts/AuthContext";
import { reviewService } from "../../services/reviewService";

export const MyOrdersSection = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [selectedItemDetail, setSelectedItemDetail] = useState<any>(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [selectedProductForReview, setSelectedProductForReview] = useState<any>(null);

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [submittingReview, setSubmittingReview] = useState(false);
    const { isAuthenticated } = useAuth();

    // FIX: Added 'reviewImage' to the initial state definition
    const [reviewForm, setReviewForm] = useState({
        rating: 5,
        title: '',
        comment: '',
        userName: '',
        images: [] as File[]// Consistent naming with your UI logic
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setOrdersLoading(true);
                const response = await OrderService.getUserOrders();
                if (response.success) setOrders(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setOrdersLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const file = files[0];
            if (file.size > 2 * 1024 * 1024) {
                alert("File is too large! Please select an image under 2MB.");
                return;
            }
            setReviewForm({
                ...reviewForm,
                images: [...reviewForm.images, ...files],
            });
        }
    };


    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) {
            alert("Please login to write a review");
            return;
        }

        if (!selectedProductForReview) return;

        try {
            setSubmittingReview(true);
            const reviewData = {
                ...reviewForm,
                orderId: selectedProductForReview.OrderId,
                productId: selectedProductForReview.productId,
                images: reviewForm.images.length > 0 ? reviewForm.images : undefined
                
            };
            await reviewService.submitReview(reviewData);

            setShowReviewModal(false);
            // FIX: Resetting form with ALL properties matching the state definition
            setReviewForm({
                rating: 5,
                title: '',
                comment: '',
                userName: '',
                images: [],
            });
            alert("Review submitted successfully!");
        } catch (error) {
            alert("Failed to submit review");
        } finally {
            setSubmittingReview(false);
        }
    };

    const OrderStatusStepper = ({ currentStatus }: { currentStatus: string }) => {
        const statuses = ["Confirmed", "Placed", "Packaging", "Out of Delivery", "Delivered"];
        const currentIndex = statuses.indexOf(currentStatus);
        return (
            <div className="w-full py-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-2 left-0 w-full h-0.5 bg-gray-100 z-0" />
                    <div className="absolute top-2 left-0 h-0.5 bg-blue-600 transition-all duration-500 z-0" style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }} />
                    {statuses.map((s, i) => (
                        <div key={s} className="relative z-10 flex flex-col items-center">
                            <div className={`w-4 h-4 rounded-full border-2 ${i <= currentIndex ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`} />
                            <p className={`text-[9px] mt-2 font-bold uppercase tracking-tighter ${i <= currentIndex ? 'text-blue-600' : 'text-gray-400'}`}>{s}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="animate-in fade-in duration-500">
                <h3 className="text-2xl font-bold mb-6">Purchase History</h3>
                {ordersLoading ? (
                    <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>
                ) : orders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b text-gray-400 text-[10px] uppercase tracking-widest font-black">
                                    <th className="pb-4">Vendor Order ID</th>
                                    <th className="pb-4">Product</th>
                                    <th className="pb-4">Status</th>
                                    <th className="pb-4">Price</th>
                                    <th className="pb-4 text-right">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {orders.map((parentOrder) =>
                                    parentOrder.items.map((item: any, idx: number) => (
                                        <tr key={`${parentOrder._id}-${idx}`} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="py-5 font-bold text-gray-700 text-xs uppercase">{item.OrderId || "Pending"}</td>
                                            <td className="py-5">
                                                <p className="text-sm font-bold text-gray-800 line-clamp-1">{item.productName}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">{item.vendorDetails?.vendorName}</p>
                                            </td>
                                            <td className="py-5">
                                                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[9px] font-black rounded uppercase border border-blue-100">
                                                    {parentOrder.orderStatus?.current || 'Confirmed'}
                                                </span>
                                            </td>
                                            <td className="py-5 font-bold text-gray-900 text-sm">₹{item.price}</td>
                                            <td className="py-5 text-right flex gap-2 justify-end">
                                                <button
                                                    onClick={() => { setSelectedItemDetail({ ...item, parent: parentOrder }); setIsOrderModalOpen(true); }}
                                                    className="p-2 bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-400 rounded-lg transition-all"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                {/* FIX: Properly reading current item for review */}
                                                <button
                                                    onClick={() => {
                                                        setSelectedProductForReview(item);
                                                        setShowReviewModal(true);
                                                    }}
                                                    className="p-2 bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-400 rounded-lg transition-all"
                                                >
                                                    <Pen size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-gray-400 font-bold uppercase text-sm tracking-widest">No Purchases found</p>
                    </div>
                )}
            </div>

            {/* --- ORDER ITEM DETAILS MODAL --- */}
            {isOrderModalOpen && selectedItemDetail && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white rounded-3xl w-full max-w-3xl my-auto shadow-2xl relative">
                        <div className="flex items-center justify-between px-8 py-5 border-b sticky top-0 bg-white rounded-t-3xl z-10">
                            <div>
                                <h3 className="text-xl font-bold uppercase">Item Details</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tracking ID: {selectedItemDetail.parent.trackingId || "N/A"}</p>
                            </div>
                            <button onClick={() => setIsOrderModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
                        </div>

                        <div className="p-8 space-y-8">
                            <OrderStatusStepper currentStatus={selectedItemDetail.parent.orderStatus?.current || "Confirmed"} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Product Manifest</h4>
                                        <div className="p-4 bg-gray-50 rounded-2xl border">
                                            <p className="font-bold text-gray-800">{selectedItemDetail.productName}</p>
                                            <div className="mt-2 text-[10px] font-bold text-gray-500 uppercase flex gap-4">
                                                <span>Qty: {selectedItemDetail.quantity}</span>
                                                <span>Size: {selectedItemDetail.size}</span>
                                                <span>Color: {selectedItemDetail.colorName}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showReviewModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white rounded-3xl w-full max-w-lg my-8 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Create Review</h3>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Sharing your experience helps others</p>
                            </div>
                            <button onClick={() => setShowReviewModal(false)} className="p-2 border bg-white rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleReviewSubmit} className="p-6 space-y-5">
                            <div className="text-center pb-4 border-b border-dashed">
                                <label className="block text-sm font-black mb-3 uppercase tracking-widest text-gray-400">Overall Rating</label>
                                <div className="flex justify-center gap-3">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button key={star} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                            className={`transition-all active:scale-90 ${reviewForm.rating >= star ? 'text-yellow-400' : 'text-gray-200'}`}>
                                            <Star fill={reviewForm.rating >= star ? "currentColor" : "none"} size={38} strokeWidth={1.5} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-gray-500">What's your public name?</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input required className="w-full border-2 border-gray-100 rounded-2xl py-3 pl-11 pr-4 focus:border-[#0d6efd] focus:bg-white bg-gray-50 outline-none transition-all font-medium"
                                        placeholder="Example: Nilesh P." value={reviewForm.userName} onChange={e => setReviewForm({ ...reviewForm, userName: e.target.value })} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-gray-500">Headline</label>
                                <input required className="w-full border-2 border-gray-100 rounded-2xl p-3 focus:border-[#0d6efd] focus:bg-white bg-gray-50 outline-none transition-all font-medium"
                                    placeholder="What's most important to know?" value={reviewForm.title} onChange={e => setReviewForm({ ...reviewForm, title: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-gray-500">Written Review</label>
                                <textarea required rows={3} className="w-full border-2 border-gray-100 rounded-2xl p-3 focus:border-[#0d6efd] focus:bg-white bg-gray-50 outline-none transition-all font-medium"
                                    placeholder="What did you like or dislike? How was the fit?" value={reviewForm.comment} onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-gray-500">Product Photo</label>
                                <div className="flex flex-wrap gap-4 items-center">
                                    <label className="p-4 w-24 h-24 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 flex flex-col items-center justify-center gap-1 group hover:border-[#0d6efd] hover:bg-blue-50/30 transition-all cursor-pointer">
                                        <Camera size={18} className="text-gray-400 group-hover:text-[#0d6efd]" />
                                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter text-center group-hover:text-[#0d6efd]">Add Photo</p>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    </label>

                                    {reviewForm.images && reviewForm.images.length > 0 && (
                                        <div className="relative group w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                                            <img src={URL.createObjectURL(reviewForm.images[0])} alt="Preview" className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => setReviewForm({ ...reviewForm, images: [] })}
                                                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white border border-white/30">
                                                    <X size={16} strokeWidth={3} />
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Button type="submit" disabled={submittingReview} className={`w-full h-14 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2
                        ${submittingReview ? 'bg-gray-400' : 'bg-[#0d6efd] hover:bg-[#0b5ed7] shadow-blue-100'}`}>
                                {submittingReview ? <Loader2 className="animate-spin" /> : 'SUBMIT REVIEW'}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};