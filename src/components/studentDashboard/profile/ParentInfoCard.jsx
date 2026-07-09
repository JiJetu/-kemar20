import { User, Mail, Phone } from "lucide-react";

const ParentInfoCard = ({
  isEditing,
  parentFullName,
  setParentFullName,
  parentEmail,
  setParentEmail,
  parentContactNumber,
  setParentContactNumber,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-[20px] p-6 sm:p-8 shadow-md text-left">
      <h3 className="text-base font-bold text-slate-800 mb-4 roboto uppercase tracking-wider border-b border-slate-100 pb-2">
        Parent Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Parent Full Name */}
        <div className="flex flex-col gap-2">
          <label className="text-xs sm:text-sm font-semibold text-slate-600">
            Parent Full Name
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-slate-400">
              <User className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={parentFullName}
              onChange={(e) => setParentFullName(e.target.value)}
              disabled={!isEditing}
              className={`w-full bg-slate-50 border rounded-xl pl-12 pr-4 py-3 text-sm text-slate-800 focus:outline-none transition-all placeholder-slate-400 font-medium ${
                isEditing
                  ? "focus:border-[#39842B] border-slate-300 bg-white"
                  : "opacity-75 cursor-not-allowed border-transparent bg-slate-50/50"
              }`}
              placeholder="Parent Name"
            />
          </div>
        </div>

        {/* Parent Email */}
        <div className="flex flex-col gap-2">
          <label className="text-xs sm:text-sm font-semibold text-slate-600">
            Parent Email
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-slate-400">
              <Mail className="w-5 h-5" />
            </span>
            <input
              type="email"
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              disabled={!isEditing}
              className={`w-full bg-slate-50 border rounded-xl pl-12 pr-4 py-3 text-sm text-slate-800 focus:outline-none transition-all placeholder-slate-400 font-medium ${
                isEditing
                  ? "focus:border-[#39842B] border-slate-300 bg-white"
                  : "opacity-75 cursor-not-allowed border-transparent bg-slate-50/50"
              }`}
              placeholder="Parent Email"
            />
          </div>
        </div>

        {/* Parent Contact Number */}
        <div className="flex flex-col gap-2">
          <label className="text-xs sm:text-sm font-semibold text-slate-600">
            Parent Contact Number
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-slate-400">
              <Phone className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={parentContactNumber}
              onChange={(e) => setParentContactNumber(e.target.value)}
              disabled={!isEditing}
              className={`w-full bg-slate-50 border rounded-xl pl-12 pr-4 py-3 text-sm text-slate-800 focus:outline-none transition-all placeholder-slate-400 font-medium ${
                isEditing
                  ? "focus:border-[#39842B] border-slate-300 bg-white"
                  : "opacity-75 cursor-not-allowed border-transparent bg-slate-50/50"
              }`}
              placeholder="Parent Phone"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentInfoCard;
