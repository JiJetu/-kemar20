import { useState, useEffect } from "react";
import {
  Lock,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redex/features/auth/auth.slice";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "../../../redex/features/profile/profile.api";
import { useCheckoutPremiumMutation } from "../../../redex/features/subscription/subscription.api";
import { baseApi } from "../../../redex/api/base.api";
import ChangePasswordModal from "./ChangePasswordModal";
import StudentInfoCard from "./StudentInfoCard";
import ParentInfoCard from "./ParentInfoCard";
import SubscriptionCard from "./SubscriptionCard";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: profileData, isLoading: isProfileLoading } = useGetMeQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [checkoutPremium, { isLoading: isCheckoutLoading }] = useCheckoutPremiumMutation();

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);

  // Form fields state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [currentSchool, setCurrentSchool] = useState("");
  const [parentFullName, setParentFullName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentContactNumber, setParentContactNumber] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [profileImageFile, setProfileImageFile] = useState(null);

  // Sync state from profileData
  useEffect(() => {
    if (profileData) {
      setTimeout(() => {
        setFullName(profileData.full_name || "");
        setEmail(profileData.email || "");
        setContactNumber(profileData.contact_number || "");
        setCurrentSchool(profileData.current_school || "");
        setParentFullName(profileData.parent_full_name || "");
        setParentEmail(profileData.parent_email || "");
        setParentContactNumber(profileData.parent_contact_number || "");
        setStudentClass(profileData.student_class || "");
        setPreferredTime(profileData.preferred_time || "");
        setProfilePicture(profileData.profile_picture || "");
        setProfileImageFile(null);
      }, 0);
    }
  }, [profileData]);

  // General Settings States
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Change Password Modal States
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleSubscribe = async () => {
    try {
      const response = await checkoutPremium().unwrap();
      if (response?.order_url) {
        toast.success("Redirecting to secure DimePay checkout...");
        window.location.href = response.order_url;
      } else {
        toast.error("Checkout link not received from server.");
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      toast.error("Failed to start checkout. Please try again.");
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("contact_number", contactNumber);
      formData.append("current_school", currentSchool);
      formData.append("parent_full_name", parentFullName);
      formData.append("parent_email", parentEmail);
      formData.append("parent_contact_number", parentContactNumber);
      formData.append("student_class", studentClass);
      formData.append("preferred_time", preferredTime);
      if (profileImageFile) {
        formData.append("profile_picture", profileImageFile);
      }

      await updateProfile(formData).unwrap();
      
      toast.success("Profile updated successfully!");
      setProfileImageFile(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      let errorMsg = "Failed to update profile. Please try again.";
      const errorData = error?.data;
      if (errorData) {
        if (errorData.detail) {
          errorMsg = errorData.detail;
        } else if (errorData.message) {
          errorMsg = errorData.message;
        } else if (typeof errorData === "object") {
          const fieldErrors = Object.entries(errorData)
            .map(([field, msgs]) => {
              const friendlyField = field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ");
              const messages = Array.isArray(msgs) ? msgs.join(" ") : msgs;
              return `${friendlyField}: ${messages}`;
            })
            .join("\n");
          if (fieldErrors) {
            errorMsg = fieldErrors;
          }
        }
      }
      toast.error(errorMsg);
    }
  };

  const handleCancel = () => {
    if (profileData) {
      setFullName(profileData.full_name || "");
      setContactNumber(profileData.contact_number || "");
      setCurrentSchool(profileData.current_school || "");
      setParentFullName(profileData.parent_full_name || "");
      setParentEmail(profileData.parent_email || "");
      setParentContactNumber(profileData.parent_contact_number || "");
      setStudentClass(profileData.student_class || "");
      setPreferredTime(profileData.preferred_time || "");
      setProfilePicture(profileData.profile_picture || "");
    }
    setProfileImageFile(null);
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    toast.success("Logged out successfully.");
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      toast.success("Account deletion request submitted.");
      dispatch(logout());
      navigate("/signup");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setProfilePicture(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isProfileLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-10 h-10 border-4 border-[#39842B] border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium roboto">Loading profile details...</p>
      </div>
    );
  }

  const isPremiumSubscribed = profileData?.is_premium;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col gap-8 text-slate-800 select-none font-sans animate-in fade-in duration-300">
      {/* Page Title & Subtitle */}
      <div className="text-center flex flex-col gap-2">
        <h2 className="text-3xl sm:text-[36px] font-bold text-slate-900 tracking-wide font-sans">
          My Account
        </h2>
        <p className="text-sm sm:text-base text-slate-500 font-medium">
          Manage Your Profile And Account Settings
        </p>
      </div>

      {/* Card 1: Student Information */}
      <StudentInfoCard
        isEditing={isEditing}
        fullName={fullName}
        setFullName={setFullName}
        email={email}
        contactNumber={contactNumber}
        setContactNumber={setContactNumber}
        currentSchool={currentSchool}
        setCurrentSchool={setCurrentSchool}
        studentClass={studentClass}
        setStudentClass={setStudentClass}
        preferredTime={preferredTime}
        setPreferredTime={setPreferredTime}
        profilePicture={profilePicture}
        handleImageChange={handleImageChange}
        onStartEditing={() => setIsEditing(true)}
      />

      {/* Card 1.1: Parent Information */}
      <ParentInfoCard
        isEditing={isEditing}
        parentFullName={parentFullName}
        setParentFullName={setParentFullName}
        parentEmail={parentEmail}
        setParentEmail={setParentEmail}
        parentContactNumber={parentContactNumber}
        setParentContactNumber={setParentContactNumber}
      />

      {/* Card 1.2: Subscription Plan */}
      <SubscriptionCard
        isPremiumSubscribed={isPremiumSubscribed}
        isCheckoutLoading={isCheckoutLoading}
        handleSubscribe={handleSubscribe}
      />

      {/* Card 2: Password */}
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-md text-left">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Password</h3>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-[#182B4E] text-white p-3 rounded-full flex items-center justify-center w-12 h-12 shrink-0 shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-950 mb-1">
                Account Password
              </span>
              <span className="text-xs sm:text-sm text-slate-500">
                For Your Security, Keep Your Password Strong And Secure.
              </span>
            </div>
          </div>

          <div className="flex items-center w-full md:w-auto justify-end gap-6 border-t border-slate-100 md:border-t-0 pt-4 md:pt-0 shrink-0">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="border border-slate-200 hover:border-[#39842B] text-[#39842B] hover:bg-[#39842B]/5 transition-all rounded-[10px] px-4 py-2.5 flex items-center gap-2 text-sm font-semibold bg-white cursor-pointer"
            >
              <Lock className="w-4 h-4 text-[#39842B]" /> Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Card 3: Notification Preference */}
      {/* <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-md text-left">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Notification Preference</h3>
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-[#182B4E] text-white p-3 rounded-full flex items-center justify-center w-12 h-12 shrink-0 shadow-md">
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-slate-800">
                Email Notifications
              </span>
              <span className="text-xs sm:text-sm text-slate-500 mt-1">
                Receive updates about your publishing journey, book status, and important announcements.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="hidden sm:block w-px h-10 bg-slate-200" />

            <button
              type="button"
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`w-14 h-7 rounded-full p-1 flex items-center cursor-pointer transition-colors shadow-inner ${
                emailNotifications ? "bg-[#182B4E]" : "bg-slate-200 border border-slate-300"
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
      </div> */}

      {/* Action Buttons: Save & Cancel (Visible only when editing) */}
      {isEditing && (
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <button
            type="button"
            disabled={isUpdating}
            onClick={handleSave}
            className="bg-[#39842B] hover:bg-[#39842B]/90 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all text-center w-full sm:flex-1 text-sm tracking-wide cursor-pointer disabled:opacity-50"
          >
            {isUpdating ? "Saving Changes..." : "Save Changes"}
          </button>
          <button
            type="button"
            disabled={isUpdating}
            onClick={handleCancel}
            className="bg-[#f4f2ee] hover:bg-[#e7e5e0] text-slate-800 border border-slate-200 font-bold py-3.5 px-8 rounded-xl shadow-md transition-all text-center w-full sm:flex-1 text-sm tracking-wide cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Card 4: Log Out & Delete Account */}
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-md flex flex-col divide-y divide-slate-100 text-left">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-between py-4 first:pt-0 last:pb-0 hover:bg-slate-50 transition-all rounded-lg px-2 w-full text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <LogOut className="w-6 h-6 text-slate-700 shrink-0" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-slate-800">Log Out</span>
              <span className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Sign Out From Your Account
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </button>

        {/* <button
          type="button"
          onClick={handleDeleteAccount}
          className="flex items-center justify-between py-4 last:pb-0 hover:bg-red-50 transition-all rounded-lg px-2 w-full text-left cursor-pointer"
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
        </button> */}
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
