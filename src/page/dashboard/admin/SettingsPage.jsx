import { useState, useRef } from "react";
import { User, Phone, Mail, Camera, Lock, EyeOff, Eye } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  // Edit Mode state
  const [isEditMode, setIsEditMode] = useState(false);

  // Admin Info Form State and its backup
  const [adminInfo, setAdminInfo] = useState({
    firstName: "Pappu",
    lastName: "Roy",
    phoneNumber: "0140536366",
    emailAddress: "Pappyroy6393@gmail.com",
  });
  const [originalAdminInfo, setOriginalAdminInfo] = useState({ ...adminInfo });

  // Photo state and its backup
  const [profilePhoto, setProfilePhoto] = useState(
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  );
  const [originalProfilePhoto, setOriginalProfilePhoto] = useState(profilePhoto);

  // Password Visibility Toggle for Banner
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Toggle the Change Password form block visibility
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Change Password Form State
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fileInputRef = useRef(null);

  const handleInfoChange = (field, value) => {
    setAdminInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordInputChange = (field, value) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  // Change Photo handlers
  const triggerChangePhoto = () => {
    if (!isEditMode) return;
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePhoto(url);
      toast.success("Profile photo preview updated!");
    }
  };

  // Save changes handler (both for profile info and password)
  const handleSaveAll = (e) => {
    if (e) e.preventDefault();

    // If change password form is active, perform validation
    if (showPasswordForm) {
      if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
        toast.error("Please fill in all password fields.");
        return;
      }
      if (passwords.newPassword !== passwords.confirmPassword) {
        toast.error("New password and confirm password do not match.");
        return;
      }
    }

    // Save state backups
    setOriginalAdminInfo({ ...adminInfo });
    setOriginalProfilePhoto(profilePhoto);

    // Clear password fields
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });

    // Show success toast
    toast.success("Settings updated successfully!");

    // Close forms & exit Edit Mode
    setShowPasswordForm(false);
    setIsEditMode(false);
  };

  // Cancel edit flow
  const handleCancel = () => {
    // Restore states
    setAdminInfo({ ...originalAdminInfo });
    setProfilePhoto(originalProfilePhoto);
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });

    // Close forms & exit Edit Mode
    setShowPasswordForm(false);
    setIsEditMode(false);
    toast.info("Changes discarded.");
  };

  return (
    <div className="w-full flex flex-col gap-6 text-left max-w-5xl mx-auto select-none animate-in fade-in duration-300">
      
      {/* 1. Admin Information Card */}
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-6 w-full">
        {/* Card Header with Edit/Save actions */}
        <div className="flex justify-between items-center w-full">
          <div>
            <h2 className="text-xl font-bold text-slate-800 roboto leading-tight">
              Admin Information
            </h2>
            <p className="text-slate-400 text-sm font-semibold mt-0.5 lato">
              Manage Your Personal Information.
            </p>
          </div>
          <div>
            {!isEditMode && (
              <button
                type="button"
                onClick={() => setIsEditMode(true)}
                className="px-5 py-2 bg-secondary hover:bg-secondary/90 text-white text-sm font-bold rounded-lg cursor-pointer transition-colors shadow-sm"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 w-full">
          {/* Left Column: Avatar & Action Photo controls */}
          <div className="flex flex-col items-center justify-center md:border-r border-slate-100 pr-0 md:pr-10 gap-4 shrink-0">
            <div className="relative">
              <img
                src={profilePhoto}
                onError={(e) => {
                  e.target.src = "https://randomuser.me/api/portraits/men/32.jpg";
                }}
                alt="Admin Avatar"
                className="w-28 h-28 rounded-full border border-slate-100 object-cover relative"
              />
              
              {/* Hidden file selector input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
              />

              {/* Camera icon overlay (only active/visible in edit mode) */}
              {isEditMode && (
                <button
                  type="button"
                  onClick={triggerChangePhoto}
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 shadow-sm cursor-pointer transition-colors z-10 animate-in zoom-in duration-200"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Change Photo Button (only visible in edit mode) */}
            {isEditMode ? (
              <button
                type="button"
                onClick={triggerChangePhoto}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors text-sm font-semibold cursor-pointer lato animate-in fade-in duration-200"
              >
                Change Photo
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="px-4 py-2 border border-slate-100 text-slate-300 rounded-lg text-sm font-semibold cursor-not-allowed lato bg-slate-50/50"
              >
                Change Photo
              </button>
            )}
          </div>

          {/* Right Column: Information form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 flex-1 w-full">
            {/* First Name */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase lato mb-1.5">
                First Name
              </label>
              <div className="relative w-full">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={adminInfo.firstName}
                  disabled={!isEditMode}
                  onChange={(e) => handleInfoChange("firstName", e.target.value)}
                  className="w-full bg-[#FAFBFD] disabled:bg-slate-50/50 disabled:text-slate-500 disabled:cursor-not-allowed border border-slate-200 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary/20 pl-10 pr-4 py-2.5 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none transition-all shadow-sm text-sm font-semibold"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase lato mb-1.5">
                Last Name
              </label>
              <div className="relative w-full">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={adminInfo.lastName}
                  disabled={!isEditMode}
                  onChange={(e) => handleInfoChange("lastName", e.target.value)}
                  className="w-full bg-[#FAFBFD] disabled:bg-slate-50/50 disabled:text-slate-500 disabled:cursor-not-allowed border border-slate-200 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary/20 pl-10 pr-4 py-2.5 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none transition-all shadow-sm text-sm font-semibold"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase lato mb-1.5">
                Phone Number
              </label>
              <div className="relative w-full">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={adminInfo.phoneNumber}
                  disabled={!isEditMode}
                  onChange={(e) => handleInfoChange("phoneNumber", e.target.value)}
                  className="w-full bg-[#FAFBFD] disabled:bg-slate-50/50 disabled:text-slate-500 disabled:cursor-not-allowed border border-slate-200 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary/20 pl-10 pr-4 py-2.5 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none transition-all shadow-sm text-sm font-semibold"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-slate-500 uppercase lato mb-1.5">
                Email Address
              </label>
              <div className="relative w-full">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={adminInfo.emailAddress}
                  disabled={!isEditMode}
                  onChange={(e) => handleInfoChange("emailAddress", e.target.value)}
                  className="w-full bg-[#FAFBFD] disabled:bg-slate-50/50 disabled:text-slate-500 disabled:cursor-not-allowed border border-slate-200 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary/20 pl-10 pr-4 py-2.5 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none transition-all shadow-sm text-sm font-semibold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Password Banner Card */}
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
        {/* Left Side elements */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#DCF3FF] flex items-center justify-center text-secondary shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-bold text-slate-700 tracking-wider roboto leading-none mb-1">
              {isPasswordVisible ? "PappyRoy@2026!" : "************"}
            </span>
            <span className="text-slate-400 text-xs font-semibold lato leading-normal">
              For Your Security, Keep Your Password Strong And Secure.
            </span>
          </div>
        </div>

        {/* Right Side Action controls */}
        <div className="flex items-center gap-5 w-full sm:w-auto shrink-0 justify-end">
          {/* Eye Icon Column toggler */}
          <div className="flex items-center justify-center border-l sm:border-r border-slate-100 pl-4 pr-5 h-12 text-slate-400">
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
            >
              {isPasswordVisible ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
            </button>
          </div>

          {/* Change Password button (only clickable in edit mode) */}
          {isEditMode ? (
            <button
              type="button"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-800 rounded-lg transition-colors shadow-sm text-sm font-bold cursor-pointer flex items-center gap-2 roboto animate-in fade-in duration-200"
            >
              <Lock className="w-4 h-4" />
              <span>Changepassword</span>
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="px-4 py-2.5 border border-slate-100 text-slate-300 rounded-lg text-sm font-bold cursor-not-allowed flex items-center gap-2 roboto bg-slate-50/50"
            >
              <Lock className="w-4 h-4" />
              <span>Changepassword</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Change Password Form Card (Toggled section, only visible in edit mode) */}
      {isEditMode && showPasswordForm && (
        <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-6 text-left animate-in slide-in-from-top-4 duration-300 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Current Password */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 lato mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter Current Password"
                value={passwords.currentPassword}
                onChange={(e) => handlePasswordInputChange("currentPassword", e.target.value)}
                className="w-full bg-[#FAFBFD] border border-slate-200 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-2.5 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none transition-all shadow-sm text-sm font-semibold"
              />
            </div>

            {/* New Password */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 lato mb-1.5">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter New Password"
                value={passwords.newPassword}
                onChange={(e) => handlePasswordInputChange("newPassword", e.target.value)}
                className="w-full bg-[#FAFBFD] border border-slate-200 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-2.5 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none transition-all shadow-sm text-sm font-semibold"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-700 lato mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={passwords.confirmPassword}
                onChange={(e) => handlePasswordInputChange("confirmPassword", e.target.value)}
                className="w-full bg-[#FAFBFD] border border-slate-200 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-4 py-2.5 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none transition-all shadow-sm text-sm font-semibold"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Bottom Main Action Save Controls */}
      {isEditMode && (
        <div className="flex items-center justify-end gap-3 mt-4 border-t border-slate-100 pt-5 animate-in fade-in duration-200">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors text-sm font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-all focus:outline-none roboto text-center text-sm leading-none cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      )}

    </div>
  );
}
