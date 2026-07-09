import { Gift, Check, Edit3 } from "lucide-react";

export default function PlanCards({ plans, onEditPlan }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto w-full select-none animate-in fade-in duration-300">
      {plans.map((plan) => {
        const isFree = plan.id === "free" || plan.price === 0;
        return (
          <div
            key={plan.id}
            className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden text-left"
          >
            {/* Top Section */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                {/* Custom Gift Icon Circle */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${
                    isFree ? "bg-[#E6F4EA] text-[#137333]" : "bg-[#E8F0FE] text-[#1A73E8]"
                  }`}
                >
                  <Gift className="w-7 h-7" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-slate-800 roboto">
                    {isFree ? (
                      <>
                        Start <span className="text-[#137333]">Free Trial</span>
                      </>
                    ) : (
                      <>
                        Go <span className="text-[#1A73E8]">Premium</span>
                      </>
                    )}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5 font-medium lato">
                    {plan.description || (isFree ? "Try Exceljm With Limited Access." : "Unlock all features and accelerate your success")}
                  </p>
                </div>
              </div>

              <hr className="border-slate-100 mb-6" />

              {/* Price / Subtitle */}
              <div className="mb-6">
                {isFree ? (
                  <div className="flex items-baseline">
                    <span className="text-3xl font-extrabold text-[#137333] roboto">
                      Free
                    </span>
                  </div>
                ) : (
                  <div className="flex items-baseline">
                    <span className="text-3xl font-extrabold text-[#1A73E8] roboto">
                      ${plan.price}
                    </span>
                    <span className="text-slate-400 text-sm font-semibold ml-1.5 lato">
                      /{plan.billingPeriodDays} Days
                    </span>
                  </div>
                )}
              </div>

              {/* Features List */}
              <ul className="flex flex-col gap-3.5 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
                        isFree
                          ? "border-[#D1EBD0] bg-[#E2F4DF] text-[#137333]"
                          : "border-[#D3E3FD] bg-[#E8F0FE] text-[#1A73E8]"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <span className="text-slate-655 text-sm font-medium leading-tight">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Edit Button */}
            <button
              type="button"
              onClick={() => onEditPlan(plan)}
              className={`w-full py-3 rounded-xl font-bold text-white shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                isFree
                  ? "bg-[#39842B] hover:bg-[#39842B]/95 hover:shadow-md"
                  : "bg-[#0F52BA] hover:bg-[#0F52BA]/95 hover:shadow-md"
              }`}
            >
              <span>Edit Plan</span>
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
