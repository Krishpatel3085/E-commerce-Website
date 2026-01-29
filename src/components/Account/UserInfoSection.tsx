import { useState } from "react";
import { UserService } from "../../services/userService";
import { Edit3, Loader2, Mail, MapPin, Phone, X } from "lucide-react";
import { DetailItem, InputGroup } from "../../pages/AccountPage";
import { Button } from "../ui/Button";

export const UserInfoSection = ({ userData, onUpdate }: any) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [formData, setFormData] = useState({
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        phoneNumber: userData?.phoneNumber || '',
        landmark: userData?.address?.landmark || '',
        area: userData?.address?.area || '',
        city: userData?.address?.city || '',
        state: userData?.address?.state || '',
        pincode: userData?.address?.pincode || ''
    });

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const payload = {
                firstName: formData.firstName, lastName: formData.lastName,
                phoneNumber: formData.phoneNumber,
                address: {
                    landmark: formData.landmark, area: formData.area,
                    city: formData.city, state: formData.state, pincode: formData.pincode
                }
            };
            await UserService.UpdateProfile(payload);
            await onUpdate();
            setIsEditModalOpen(false);
        } catch (error) {
            alert("Update failed");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-8 pb-4 border-b">
                <h3 className="text-2xl font-bold">Profile Details</h3>
                <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100">
                    <Edit3 size={14} /> EDIT
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <DetailItem icon={Mail} label="Email Address" value={userData?.email} />
                <DetailItem icon={Phone} label="Contact" value={userData?.phoneNumber || 'N/A'} />
                <div className="sm:col-span-2">
                    <DetailItem icon={MapPin} label="Delivery Address" value={userData?.address ? `${userData.address.area}, ${userData.address.landmark}, ${userData.address.city}, ${userData.address.state} - ${userData.address.pincode}` : 'No address saved.'} />
                </div>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white rounded-3xl w-full max-w-2xl my-auto shadow-2xl relative">
                        <div className="flex items-center justify-between px-8 py-5 border-b sticky top-0 bg-white rounded-t-3xl z-10">
                            <h3 className="text-xl font-bold">Update Profile</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleUpdate} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <InputGroup label="First Name" value={formData.firstName} onChange={(v) => setFormData({ ...formData, firstName: v })} />
                            <InputGroup label="Last Name" value={formData.lastName} onChange={(v) => setFormData({ ...formData, lastName: v })} />
                            <InputGroup label="Phone" type="number" value={formData.phoneNumber} onChange={(v) => setFormData({ ...formData, phoneNumber: v })} />
                            <InputGroup label="Landmark" value={formData.landmark} onChange={(v) => setFormData({ ...formData, landmark: v })} />
                            <InputGroup label="Area" value={formData.area} onChange={(v) => setFormData({ ...formData, area: v })} />
                            <InputGroup label="City" value={formData.city} onChange={(v) => setFormData({ ...formData, city: v })} />
                            <InputGroup label="State" value={formData.state} onChange={(v) => setFormData({ ...formData, state: v })} />
                            <InputGroup label="Pincode" type="number" value={formData.pincode} onChange={(v) => setFormData({ ...formData, pincode: v })} />
                            <div className="md:col-span-2 pt-4">
                                <Button type="submit" className="w-full h-12 text-sm font-bold uppercase tracking-widest" disabled={isUpdating}>
                                    {isUpdating ? <><Loader2 className="animate-spin mr-2" size={16} /> Saving...</> : 'Save Profile'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

