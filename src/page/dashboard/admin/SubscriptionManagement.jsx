import { useState } from "react";
import { toast } from "sonner";
import PlanCards from "../../../components/admin/subscription/PlanCards";
import EditPlanForm from "../../../components/admin/subscription/EditPlanForm";

export default function SubscriptionManagement() {
  const [plans, setPlans] = useState([
    {
      id: "free",
      name: "Start Free Trial",
      description: "Try Exceljm With Limited Access.",
      price: 0,
      freeCount: 2,
      features: [
        "Access 2 handpicked topics/quizzes",
        "Selected By Admin",
        "No Payment Required",
      ],
    },
    {
      id: "premium",
      name: "Go Premium",
      description: "Unlock all features and accelerate your success",
      price: 9.99,
      features: [
        "Access All Topics & Quizzes",
        "Unlimited Practice",
        "Detailed Solutions & Explanations",
        "Track Progress & Performance",
      ],
    },
  ]);

  const [editingPlan, setEditingPlan] = useState(null);

  const handleSavePlan = (updatedPlan) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === updatedPlan.id ? updatedPlan : p))
    );
    setEditingPlan(null);
    toast.success(`Plan "${updatedPlan.name}" updated successfully!`);
  };

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
          <PlanCards plans={plans} onEditPlan={setEditingPlan} />
        )}
      </div>
    </div>
  );
}
