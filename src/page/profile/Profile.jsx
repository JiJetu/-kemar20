import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Camera, LogOut, Trash2, ChevronRight, Edit3 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal";

const Profile = () => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);
  const displayName = useSelector((state) => state.auth.displayName);

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(displayName || "Pappu");
  const [email] = useState(authUser?.email || "Appyroy6393@Gmail.Com");
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  );

  // Backup states for reverting changes on Cancel
  const [backupFirstName, setBackupFirstName] = useState(firstName);
  const [backupProfileImage, setBackupProfileImage] = useState(profileImage);

  // Password Visibility & General Settings States
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Change Password Modal States
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Actions for Editing Profile
  const startEditing = () => {
    setBackupFirstName(firstName);
    setBackupProfileImage(profileImage);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Changes saved successfully!");
  };

  const handleCancel = () => {
    setFirstName(backupFirstName);
    setProfileImage(backupProfileImage);
    setIsEditing(false);
  };

  const handleLogout = () => {
    alert("Logging out...");
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      alert("Account deleted.");
      navigate("/signup");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setProfileImage(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col gap-8 text-white select-none">
      {/* Page Title & Subtitle */}
      <div className="text-center flex flex-col gap-2">
        <h2 className="text-3xl sm:text-[36px] font-bold text-white tracking-wide font-sans">
          My Account
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-medium">
          Manage Your Profile And Account Settings
        </p>
      </div>

      {/* Card 1: Profile & Basic Info */}
      <div className="bg-[#001131] border border-[#192B4C] rounded-[20px] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg relative">
        {/* Edit Button or Editing Badge */}
        {!isEditing ? (
          <button
            type="button"
            onClick={startEditing}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 border border-[#5D9E32] text-[#5D9E32] hover:bg-[#5D9E32]/10 transition-all rounded-[10px] px-3.5 py-1.5 flex items-center gap-1.5 text-xs font-bold"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Profile
          </button>
        ) : (
          <span className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#5D9E32]/10 text-[#5D9E32] border border-[#5D9E32]/25 rounded-[10px] px-3 py-1.5 text-xs font-bold">
            Editing Profile
          </span>
        )}

        {/* Avatar Area */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={profileImage}
              alt="User profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-[#192B4C] shadow-md"
            />
            {isEditing && (
              <label
                htmlFor="profile-image-upload"
                className="absolute bottom-0 right-1 bg-[#5D9E32] hover:bg-[#4d8229] text-white p-2 rounded-full cursor-pointer shadow-lg transition-all flex items-center justify-center w-8 h-8"
              >
                <Camera className="w-4 h-4" />
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
          {isEditing && (
            <label
              htmlFor="profile-image-upload"
              className="border border-[#5D9E32] text-[#5D9E32] hover:bg-[#5D9E32]/10 transition-all rounded-[10px] px-4 py-2 text-xs font-bold cursor-pointer"
            >
              Change Photo
            </label>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-28 bg-[#192B4C]" />

        {/* Inputs Area */}
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-semibold text-slate-400">
              First Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[#5D9E32]">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
                className={`w-full bg-[#031435] border rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-slate-500 font-medium ${
                  isEditing
                    ? "focus:border-[#5D9E32] border-[#192B4C]"
                    : "opacity-75 cursor-not-allowed border-transparent"
                }`}
                placeholder="First Name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-semibold text-slate-400">
              Email
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[#5D9E32] opacity-60">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                value={email}
                readOnly
                disabled
                className="w-full bg-[#031435] border border-transparent opacity-60 cursor-not-allowed rounded-xl pl-12 pr-4 py-3 text-sm text-slate-400 focus:outline-none placeholder-slate-500 font-medium"
                placeholder="Email Address"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Password */}
      <div className="bg-[#001131] border border-[#192B4C] rounded-[20px] p-6 shadow-lg text-left">
        <h3 className="text-lg font-bold text-white mb-4">Password</h3>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          {/* Left section with lock icon & password description */}
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-[#5D9E32] text-white p-3 rounded-full flex items-center justify-center w-12 h-12 shrink-0 shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-widest text-[#5D9E32] select-none h-6 flex items-center">
                {showPassword ? "Appyroy1234!" : "************"}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 mt-1">
                For Your Security, Keep Your Password Strong And Secure.
              </span>
            </div>
          </div>

          <div className="flex items-center w-full md:w-auto justify-end gap-6 border-t border-[#192B4C] md:border-t-0 pt-4 md:pt-0 shrink-0">
            {/* Password toggle visibility (Center Section) */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#5D9E32] hover:bg-[#5D9E32]/10 p-2 rounded-full transition-all flex items-center justify-center"
            >
              {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            </button>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px h-10 bg-[#192B4C]" />

            {/* Change Password button */}
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="border border-[#192B4C] hover:border-[#5D9E32] text-[#5D9E32] hover:bg-[#5D9E32]/10 transition-all rounded-[10px] px-4 py-2.5 flex items-center gap-2 text-sm font-semibold"
            >
              <Lock className="w-4 h-4 text-[#5D9E32]" /> Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Card 3: Notification Preference */}
      <div className="bg-[#001131] border border-[#192B4C] rounded-[20px] p-6 shadow-lg text-left">
        <h3 className="text-lg font-bold text-white mb-4">Notification Preference</h3>
        <div className="flex items-center justify-between gap-6">
          {/* Left info */}
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-[#5D9E32] text-white p-3 rounded-full flex items-center justify-center w-12 h-12 shrink-0 shadow-md">
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-white">
                Email Notifications
              </span>
              <span className="text-xs sm:text-sm text-slate-400 mt-1">
                Receive updates about your publishing journey, book status, and important announcements.
              </span>
            </div>
          </div>

          {/* Divider and Toggle */}
          <div className="flex items-center gap-6 shrink-0">
            {/* Vertical Divider */}
            <div className="hidden sm:block w-px h-10 bg-[#192B4C]" />

            {/* Toggle Switch */}
            <button
              type="button"
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`w-14 h-7 rounded-full p-1 flex items-center cursor-pointer transition-colors shadow-inner ${
                emailNotifications ? "bg-[#5D9E32]" : "bg-[#031435] border border-[#192B4C]"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 transform ${
                  emailNotifications ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons: Save & Cancel (Visible only when editing) */}
      {isEditing && (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#5D9E32] hover:bg-[#4d8229] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all text-center w-full sm:flex-1 text-sm tracking-wide"
          >
            Save & Changes
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-[#f4f2ee] hover:bg-[#e7e5e0] text-[#001131] font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all text-center w-full sm:flex-1 text-sm tracking-wide"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Card 4: Log Out & Delete Account */}
      <div className="bg-[#001131] border border-[#192B4C] rounded-[20px] p-6 shadow-lg flex flex-col divide-y divide-[#192B4C] text-left">
        {/* Log Out Option */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-between py-4 first:pt-0 last:pb-0 hover:bg-white/5 transition-all rounded-lg px-2 w-full text-left"
        >
          <div className="flex items-center gap-4">
            <LogOut className="w-6 h-6 text-white shrink-0" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-white">Log Out</span>
              <span className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Sign Out From Your Account
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>

        {/* Delete Account Option */}
        <button
          type="button"
          onClick={handleDeleteAccount}
          className="flex items-center justify-between py-4 last:pb-0 hover:bg-red-500/5 transition-all rounded-lg px-2 w-full text-left"
        >
          <div className="flex items-center gap-4">
            <Trash2 className="w-6 h-6 text-red-500 shrink-0" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-red-500">Delete Account</span>
              <span className="text-xs sm:text-sm text-red-500/70 mt-0.5 font-medium">
                Permanently Delete Your Account And All Data
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-red-500" />
        </button>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
