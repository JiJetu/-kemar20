import { useState } from "react";
import { Lock, Eye, EyeOff, X } from "lucide-react";
import { useChangePasswordMutation } from "../../../redex/features/profile/profile.api";
import { toast } from "sonner";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    
    try {
      await changePassword({
        old_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }).unwrap();

      toast.success("Password updated successfully!");
      handleClose();
    } catch (error) {
      console.error("Change password error:", error);
      let errorMsg = "Failed to change password. Please verify current password.";
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

  const handleClose = () => {
    // Reset modal states
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrentPass(false);
    setShowNewPass(false);
    setShowConfirmPass(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 sm:p-8 w-full max-w-md shadow-xl flex flex-col gap-6 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-secondary" /> Change Password
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          {/* Current Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">
              Current Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-secondary">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showCurrentPass ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 focus:border-secondary focus:bg-white rounded-xl pl-12 pr-12 py-3 text-sm text-slate-800 focus:outline-none transition-all placeholder-slate-400"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">
              New Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-secondary">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showNewPass ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 focus:border-secondary focus:bg-white rounded-xl pl-12 pr-12 py-3 text-sm text-slate-800 focus:outline-none transition-all placeholder-slate-400"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-secondary">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showConfirmPass ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 focus:border-secondary focus:bg-white rounded-xl pl-12 pr-12 py-3 text-sm text-slate-800 focus:outline-none transition-all placeholder-slate-400"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold py-2.5 px-5 rounded-xl transition-all text-sm w-full sm:flex-1 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#39842B] hover:bg-[#39842B]/90 text-white font-bold py-2.5 px-5 rounded-xl transition-all text-sm w-full sm:flex-1 disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
