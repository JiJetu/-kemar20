import { useState, useRef, useEffect } from "react";
import { User, Phone, Mail, Camera, Lock, EyeOff, Eye } from "lucide-react";
import { toast } from "sonner";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "../../../redex/features/profile/profile.api";

export default function SettingsPage() {
  const { data: meData, isLoading } = useGetMeQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();

  // Edit Mode state
  const [isEditMode, setIsEditMode] = useState(false);

  // Admin Info Form State and its backup
  const [adminInfo, setAdminInfo] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
  });
  const [originalAdminInfo, setOriginalAdminInfo] = useState({ ...adminInfo });

  // Photo state and its backup
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [originalProfilePhoto, setOriginalProfilePhoto] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  // Toggle the Change Password form block visibility
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Change Password Form State
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fileInputRef = useRef(null);

  // Get initials for profile picture placeholder
  const getInitials = (name) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Sync state with meData when loaded (using setTimeout to avoid cascading renders warning)
  useEffect(() => {
    if (meData) {
      setTimeout(() => {
        const info = {
          fullName: meData.full_name || "",
          phoneNumber: meData.contact_number || "",
          emailAddress: meData.email || "",
        };
        setAdminInfo(info);
        setOriginalAdminInfo(info);
        setProfilePhoto(meData.profile_picture || null);
        setOriginalProfilePhoto(meData.profile_picture || null);
        setProfileImageFile(null);
      }, 0);
    }
  }, [meData]);

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
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setProfilePhoto(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
      toast.success("Profile photo preview updated!");
    }
  };

  const getErrorMessage = (error, defaultMsg) => {
    const errorData = error?.data;
    if (errorData) {
      if (errorData.detail) return errorData.detail;
      if (errorData.message) return errorData.message;
      if (typeof errorData === "object") {
        const fieldErrors = Object.entries(errorData)
          .map(([field, msgs]) => {
            const friendlyField = field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ");
            const messages = Array.isArray(msgs) ? msgs.join(" ") : msgs;
            return `${friendlyField}: ${messages}`;
          })
          .join(" | ");
        if (fieldErrors) return fieldErrors;
      }
    }
    return defaultMsg;
  };

  // Save changes handler (both for profile info and password)
  const handleSaveAll = async (e) => {
    if (e) e.preventDefault();

    // 1. Password change flow
    if (showPasswordForm) {
      if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
        toast.error("Please fill in all password fields.");
        return;
      }
      if (passwords.newPassword !== passwords.confirmPassword) {
        toast.error("New password and confirm password do not match.");
        return;
      }

      try {
        await changePassword({
          old_password: passwords.currentPassword,
          new_password: passwords.newPassword,
          confirm_password: passwords.confirmPassword,
        }).unwrap();
        toast.success("Password changed successfully!");
      } catch (err) {
        console.error("Password change error:", err);
        const errorMsg = getErrorMessage(err, "Failed to change password. Verify your current password is correct.");
        toast.error(errorMsg);
        return; // Halt save profile details if security update fails
      }
    }

    // 2. Profile update flow
    try {
      const formData = new FormData();
      formData.append("full_name", adminInfo.fullName);
      formData.append("contact_number", adminInfo.phoneNumber);
      if (profileImageFile) {
        formData.append("profile_picture", profileImageFile);
      }

      await updateProfile(formData).unwrap();

      // Save state backups
      setOriginalAdminInfo({ ...adminInfo });
      setOriginalProfilePhoto(profilePhoto);
      setProfileImageFile(null);

      // Clear password fields
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });

      // Show success toast
      toast.success("Settings updated successfully!");

      // Close forms & exit Edit Mode
      setShowPasswordForm(false);
      setIsEditMode(false);
    } catch (err) {
      console.error("Profile update error:", err);
      const errorMsg = getErrorMessage(err, "Failed to update profile info.");
      toast.error(errorMsg);
    }
  };

  // Cancel edit flow
  const handleCancel = () => {
    // Restore states
    setAdminInfo({ ...originalAdminInfo });
    setProfilePhoto(originalProfilePhoto);
    setProfileImageFile(null);
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });

    // Close forms & exit Edit Mode
    setShowPasswordForm(false);
    setIsEditMode(false);
    toast.info("Changes discarded.");
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading profile settings..." minHeight="min-h-[45vh]" />;
  }

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
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Admin Avatar"
                  className="w-28 h-28 rounded-full border border-slate-100 object-cover relative animate-in fade-in duration-200"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-[#E8F0FE] text-[#1A73E8] border border-slate-100 flex items-center justify-center text-3xl font-bold roboto shrink-0">
                  {getInitials(adminInfo.fullName)}
                </div>
              )}
              
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
                className="px-4 py-2 border border-slate-200 hover:bg-slate-55 text-slate-600 rounded-lg transition-colors text-sm font-semibold cursor-pointer lato animate-in fade-in duration-200"
              >
                Change Photo
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="px-4 py-2 border border-slate-155 text-slate-300 rounded-lg text-sm font-semibold cursor-not-allowed lato bg-slate-50/50"
              >
                Change Photo
              </button>
            )}
          </div>

          {/* Right Column: Information form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 flex-1 w-full">
            {/* Full Name */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase lato mb-1.5">
                Full Name
              </label>
              <div className="relative w-full">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={adminInfo.fullName}
                  disabled={!isEditMode}
                  onChange={(e) => handleInfoChange("fullName", e.target.value)}
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
                  disabled
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
            <span className="text-lg font-bold text-slate-800 roboto mb-1">
              Account Password
            </span>
            <span className="text-slate-400 text-xs font-semibold lato leading-normal">
              For your security, keep your password strong and secure.
            </span>
          </div>
        </div>

        {/* Right Side Action controls */}
        <div className="flex items-center gap-5 w-full sm:w-auto shrink-0 justify-end">
          {/* Change Password button (only clickable in edit mode) */}
          {isEditMode ? (
            <button
              type="button"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="px-4 py-2.5 border border-slate-200 hover:bg-slate-55 text-slate-705 hover:text-slate-800 rounded-lg transition-colors shadow-sm text-sm font-bold cursor-pointer flex items-center gap-2 roboto animate-in fade-in duration-200"
            >
              <Lock className="w-4 h-4" />
              <span>Change Password</span>
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="px-4 py-2.5 border border-slate-155 text-slate-300 rounded-lg text-sm font-bold cursor-not-allowed flex items-center gap-2 roboto bg-slate-50/50"
            >
              <Lock className="w-4 h-4" />
              <span>Change Password</span>
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
            className="px-6 py-2.5 border border-slate-200 hover:bg-slate-55 text-slate-600 rounded-lg transition-colors text-sm font-semibold cursor-pointer"
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
