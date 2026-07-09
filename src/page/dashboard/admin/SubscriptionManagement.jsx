import { useState, useMemo } from "react";
import { toast } from "sonner";
import PlanCards from "../../../components/admin/subscription/PlanCards";
import EditPlanForm from "../../../components/admin/subscription/EditPlanForm";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import {
  useGetBillingPlansQuery,
  useUpdateBillingPlanMutation,
} from "../../../redex/features/subscription/subscription.api";

export default function SubscriptionManagement() {
  const { data: plansData, isLoading, error } = useGetBillingPlansQuery();
  const [updateBillingPlan] = useUpdateBillingPlanMutation();

  const [editingPlan, setEditingPlan] = useState(null);

  // Map API plan models to premium client layout features
  const mappedPlans = useMemo(() => {
    return (plansData?.results || []).map((p) => {
      const isFree = p.code === "free_trial" || Number(p.price) === 0;
      
      // Separate description by comma to get individual features
      // Separate description by comma to get individual features
      const features = p.description && p.description.trim()
        ? p.description.split(",").map((f) => f.trim()).filter(Boolean)
        : [];

      return {
        id: p.id,
        code: p.code,
        name: p.name || (isFree ? "Free Trial" : "Premium"),
        description: p.description || "",
        price: Number(p.price) || 0,
        billingPeriodDays: p.billing_period_days || 0,
        features,
      };
    });
  }, [plansData]);

  const handleSavePlan = async (updatedPlan) => {
    try {
      // Join features by comma for backend description column
      const finalDescription = updatedPlan.features && updatedPlan.features.length > 0
        ? updatedPlan.features.join(", ")
        : updatedPlan.description;

      await updateBillingPlan({
        id: updatedPlan.id,
        name: updatedPlan.name,
        description: finalDescription,
        price: String(updatedPlan.price),
        billing_period_days: Number(updatedPlan.billingPeriodDays),
      }).unwrap();
      
      setEditingPlan(null);
      toast.success(`Plan "${updatedPlan.name}" updated successfully!`);
    } catch (err) {
      console.error("Save plan error:", err);
      toast.error("Failed to update plan.");
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading subscription plans..." minHeight="min-h-[40vh]" />;
  }

  if (error) {
    return (
      <div className="bg-white border border-slate-200 rounded-[20px] p-8 text-center text-red-500 font-semibold shadow-sm max-w-lg mx-auto mt-12 select-none">
        Failed to load subscription plans. Please verify your connection or login state.
      </div>
    );
  }

  return (
    <div className="w-full py-4 text-left">
      <div className="max-w-7xl mx-auto mb-8 px-4 flex flex-col gap-1.5">
        <h1 className="text-3xl font-extrabold text-[#0A2648] roboto">Subscriptions</h1>
        <p className="text-slate-400 text-sm font-medium lato">
          Manage and configure subscription plans, pricing, and features for users.
        </p>
      </div>

      <div className="px-4">
        {editingPlan ? (
          <EditPlanForm
            plan={editingPlan}
            onSave={handleSavePlan}
            onCancel={() => setEditingPlan(null)}
          />
        ) : (
          <PlanCards plans={mappedPlans} onEditPlan={setEditingPlan} />
        )}
      </div>
    </div>
  );
}
