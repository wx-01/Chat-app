import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User } from "lucide-react";

const Profile = () => {
  const { authUser, isUpdating, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
  return (
    <div className="bg-base-200 pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-100 border-2 border-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your Profile Information</p>
          </div>
          {/* avatar upload section*/}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePic || "avatar.png"}
                alt="Profile"
                className="size-32 object-cover rounded-full border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 
              bg-base-content hover:scale-105 p-2 rounded-full 
              cursor-pointer transition-all duration-200  ${
                isUpdating ? "animate-pulse pointer-events-none" : ""
              }`}
              >
                <Camera className="size-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdating}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-700">
              {isUpdating
                ? "Uploading.."
                : "Click the camera icon to update progile pic"}
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-grey-400 flex items-center gap-2">
                <User className="size-4" />
                User Name
              </div>
              <p className="px-4 py-2,5 bg-primary/50 rounded-lg border">
                {" "}
                {authUser?.fullName}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-grey-400 flex items-center gap-2">
                <User className="size-4" />
                Email Address
              </div>
              <p className="px-4 py-2,5 bg-primary/50 rounded-lg border">
                {" "}
                {authUser?.email}
              </p>
            </div>
          </div>
          <div className="mt-6 bg-zinc-200 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Inormation</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 px-2  border-2 bg-primary/50 rounded-lg  border-zinc-700">
                <span>Member since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2 px-2 border-2 bg-primary/50 rounded-lg border-base-zinc-700">
                <span>Account status</span>
                <span className="text-accent/100">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
