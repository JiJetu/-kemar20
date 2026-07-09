import { User, Mail, Camera, Phone, Building, BookOpen, Clock, Edit3 } from "lucide-react";
import { ICONS } from "../../../assets";

const StudentInfoCard = ({
  isEditing,
  fullName,
  setFullName,
  email,
  contactNumber,
  setContactNumber,
  currentSchool,
  setCurrentSchool,
  studentClass,
  setStudentClass,
  preferredTime,
  setPreferredTime,
  profilePicture,
  handleImageChange,
  onStartEditing,
}) => {
  const avatarDisplayUrl = profilePicture || ICONS.studentIcon;

  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-md relative">
      {/* Edit Button or Editing Badge */}
      {!isEditing ? (
        <button
          type="button"
          onClick={onStartEditing}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 border border-[#39842B] text-[#39842B] hover:bg-[#39842B]/10 transition-all rounded-[10px] px-3.5 py-1.5 flex items-center gap-1.5 text-xs font-bold bg-white cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" /> Edit Profile
        </button>
      ) : (
        <span className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#39842B]/10 text-[#39842B] border border-[#39842B]/25 rounded-[10px] px-3 py-1.5 text-xs font-bold">
          Editing Profile
        </span>
      )}

      {/* Avatar Area */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={avatarDisplayUrl}
            alt="User profile"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-slate-200 shadow-md bg-slate-50"
          />
          {isEditing && (
            <label
              htmlFor="profile-image-upload"
              className="absolute bottom-0 right-1 bg-[#39842B] hover:bg-[#39842B]/90 text-white p-2 rounded-full cursor-pointer shadow-lg transition-all flex items-center justify-center w-8 h-8"
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
            className="border border-[#39842B] text-[#39842B] hover:bg-[#39842B]/10 transition-all rounded-[10px] px-4 py-2 text-xs font-bold cursor-pointer"
          >
            Change Photo
          </label>
        )}
      </div>

      {/* Vertical Divider */}
      <div className="hidden md:block w-px h-36 bg-slate-200" />

      {/* Inputs Area */}
      <div className="flex-1 w-full text-left">
        <h3 className="text-base font-bold text-slate-800 mb-4 roboto uppercase tracking-wider border-b border-slate-100 pb-2">
          Student Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Student Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-semibold text-slate-600">
              Full Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={!isEditing}
                className={`w-full bg-slate-50 border rounded-xl pl-12 pr-4 py-3 text-sm text-slate-800 focus:outline-none transition-all placeholder-slate-400 font-medium ${
                  isEditing
                    ? "focus:border-[#39842B] border-slate-300 bg-white"
                    : "opacity-75 cursor-not-allowed border-transparent bg-slate-50/50"
                }`}
                placeholder="Full Name"
              />
            </div>
          </div>

          {/* Email (Read Only) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-semibold text-slate-600">
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 opacity-60">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                value={email}
                readOnly
                disabled
                className="w-full bg-slate-100 border border-slate-200 opacity-60 cursor-not-allowed rounded-xl pl-12 pr-4 py-3 text-sm text-slate-500 focus:outline-none placeholder-slate-400 font-medium"
                placeholder="Email Address"
              />
            </div>
          </div>

          {/* Contact Number */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-semibold text-slate-600">
              Contact Number
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <Phone className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                disabled={!isEditing}
                className={`w-full bg-slate-50 border rounded-xl pl-12 pr-4 py-3 text-sm text-slate-800 focus:outline-none transition-all placeholder-slate-400 font-medium ${
                  isEditing
                    ? "focus:border-[#39842B] border-slate-300 bg-white"
                    : "opacity-75 cursor-not-allowed border-transparent bg-slate-50/50"
                }`}
                placeholder="Contact Number"
              />
            </div>
          </div>

          {/* School */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-semibold text-slate-600">
              Current School
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <Building className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={currentSchool}
                onChange={(e) => setCurrentSchool(e.target.value)}
                disabled={!isEditing}
                className={`w-full bg-slate-50 border rounded-xl pl-12 pr-4 py-3 text-sm text-slate-800 focus:outline-none transition-all placeholder-slate-400 font-medium ${
                  isEditing
                    ? "focus:border-[#39842B] border-slate-300 bg-white"
                    : "opacity-75 cursor-not-allowed border-transparent bg-slate-50/50"
                }`}
                placeholder="School Name"
              />
            </div>
          </div>

          {/* Class Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-semibold text-slate-600">
              Student Class
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <BookOpen className="w-5 h-5" />
              </span>
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                disabled={!isEditing}
                className={`w-full bg-slate-50 border rounded-xl pl-12 pr-4 py-3 text-sm text-slate-800 focus:outline-none transition-all placeholder-slate-400 font-medium appearance-none ${
                  isEditing
                    ? "focus:border-[#39842B] border-slate-300 bg-white cursor-pointer"
                    : "opacity-75 cursor-not-allowed border-transparent bg-slate-50/50"
                }`}
              >
                <option value="">Select Class</option>
                <option value="4th">4th</option>
                <option value="5th">5th</option>
                <option value="6th">6th</option>
                <option value="7th">7th</option>
                <option value="8th">8th</option>
                <option value="9th">9th</option>
                <option value="10th">10th</option>
              </select>
            </div>
          </div>

          {/* Preferred Time Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-semibold text-slate-600">
              Preferred Study Time
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400">
                <Clock className="w-5 h-5" />
              </span>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                disabled={!isEditing}
                className={`w-full bg-slate-50 border rounded-xl pl-12 pr-4 py-3 text-sm text-slate-800 focus:outline-none transition-all placeholder-slate-400 font-medium appearance-none ${
                  isEditing
                    ? "focus:border-[#39842B] border-slate-300 bg-white cursor-pointer"
                    : "opacity-75 cursor-not-allowed border-transparent bg-slate-50/50"
                }`}
              >
                <option value="">Select Time</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoCard;
