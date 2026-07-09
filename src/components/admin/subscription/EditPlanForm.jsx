import { useState, useEffect } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import FormInput from "../../ui/FormInput";

export default function EditPlanForm({ plan, onSave, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [freeCount, setFreeCount] = useState("");
  const [features, setFeatures] = useState([]);
  const [newFeatureText, setNewFeatureText] = useState("");

  useEffect(() => {
    if (plan) {
      setName(plan.name || "");
      setDescription(plan.description || "");
      setPrice(String(plan.price !== undefined ? plan.price : ""));
      setFreeCount(String(plan.freeCount !== undefined ? plan.freeCount : ""));
      setFeatures(plan.features ? [...plan.features] : []);
    }
  }, [plan]);

  const isFree = plan?.id === "free" || plan?.price === 0;

  const handleFeatureTextChange = (idx, text) => {
    setFeatures((prev) => {
      const updated = [...prev];
      updated[idx] = text;
      return updated;
    });
  };

  const handleRemoveFeature = (idx) => {
    setFeatures((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddFeature = () => {
    const trimmed = newFeatureText.trim();
    if (!trimmed) {
      toast.error("Feature text cannot be empty");
      return;
    }
    setFeatures((prev) => [...prev, trimmed]);
    setNewFeatureText("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Plan name is required");
      return;
    }

    if (features.some((f) => !f.trim())) {
      toast.error("All features must have content");
      return;
    }

    const updatedPlan = {
      ...plan,
      name: name.trim(),
      description: description.trim(),
      price: isFree ? 0 : Number(price) || 0,
      freeCount: isFree ? Number(freeCount) || 2 : undefined,
      features: features.map((f) => f.trim()),
    };

    onSave(updatedPlan);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm max-w-7xl mx-auto w-full text-left animate-in zoom-in-95 duration-250 select-none">
      <h2 className="text-2xl font-bold text-[#0A2648] mb-6 roboto">Edit plan</h2>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
        {/* Plan name */}
        <FormInput
          label="Plan name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter plan name"
          labelClassName="text-slate-500 font-bold text-xs uppercase"
          className="bg-white border-slate-300 rounded-lg text-slate-800 focus:border-[#0A2648]"
        />

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-slate-500 font-bold text-xs uppercase">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter plan description"
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none focus:border-[#0A2648] h-24 resize-none font-medium"
          />
        </div>

        {/* Conditional Pricing Input */}
        {isFree ? (
          <FormInput
            label="Free Topics / Quizzes count"
            type="number"
            value={freeCount}
            onChange={(e) => setFreeCount(e.target.value)}
            placeholder="Enter number of free topics"
            labelClassName="text-slate-500 font-bold text-xs uppercase"
            className="bg-white border-slate-300 rounded-lg text-slate-800 focus:border-[#0A2648]"
          />
        ) : (
          <FormInput
            label="Monthly price($)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter monthly price"
            labelClassName="text-slate-500 font-bold text-xs uppercase"
            className="bg-white border-slate-300 rounded-lg text-slate-800 focus:border-[#0A2648]"
          />
        )}

        {/* Features List Section */}
        <div className="flex flex-col gap-3">
          <label className="text-slate-500 font-bold text-xs uppercase">Features</label>
          <div className="flex flex-col gap-3">
            {features.map((feat, fIdx) => (
              <div key={fIdx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => handleFeatureTextChange(fIdx, e.target.value)}
                  placeholder="Enter feature text"
                  className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-850 text-sm font-medium focus:outline-none focus:border-[#0A2648]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(fIdx)}
                  className="p-2 border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add a feature widget */}
          <div className="flex items-center gap-3 mt-1">
            <input
              type="text"
              value={newFeatureText}
              onChange={(e) => setNewFeatureText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
              placeholder="Add a feature"
              className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-850 text-sm font-medium focus:outline-none focus:border-[#0A2648]"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="flex items-center justify-center gap-1.5 px-4 py-2 border border-[#0A2648]/20 hover:bg-slate-50 text-[#0A2648] rounded-lg transition-colors font-bold text-sm h-[38px] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-655 font-bold rounded-lg transition-colors text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0A2648] hover:bg-[#0A2648]/90 text-white font-bold rounded-lg transition-colors shadow-sm text-sm cursor-pointer"
          >
            Save plan
          </button>
        </div>
      </form>
    </div>
  );
}
