import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";

// Define the schema for validation
const contactSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(1, "Please select a subject."),
  message: z.string()
    .min(10, "Message must be at least 10 characters.")
    .refine(
      (val) => val.trim().split(/\s+/).filter(Boolean).length <= 200,
      "Message cannot exceed 200 words."
    )
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  // Watch the message field to dynamically calculate the word count
  const messageVal = watch("message", "");
  const wordCount = messageVal ? messageVal.trim().split(/\s+/).filter(Boolean).length : 0;

  const onSubmit = async (data) => {
    try {
      // Simulate API submit delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Contact form submitted successfully:", data);
      
      toast.success("Thank you! Your message has been sent successfully.");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="w-full bg-[#EBF9E9] py-20 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center">
        
        {/* Header */}
        <div className="mb-14">
          <SectionHeader
            title="We'd Love To Hear From You"
            description="Have a question or need help ? feel free to reach out us"
          />
        </div>

        {/* Outer Split Container */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
          
          {/* Left Column: Info & Help Card */}
          <div className="w-full lg:w-[32%] flex flex-col items-start text-left">
            {/* Email Contact info */}
            <div className="flex items-center gap-4 w-full">
              <div className="w-11 h-11 rounded-full border border-slate-100 bg-white text-[#39842B] flex items-center justify-center shrink-0 shadow-sm">
                <Mail className="w-5 h-5 text-[#39842B]" />
              </div>
              <div className="flex flex-col roboto">
                <span className="text-[#39842B] text-xs font-bold uppercase tracking-wider mb-1">
                  EMAIL US
                </span>
                <span className="text-[#082042] text-sm md:text-base font-bold mb-0.5">
                  Hello@preped.com
                </span>
                <span className="text-slate-500 text-xs md:text-sm font-medium">
                  We reply within 24 hours
                </span>
              </div>
            </div>

            <div className="w-full border-b border-slate-200/60 my-6" />

            {/* Phone Contact info */}
            <div className="flex items-center gap-4 w-full">
              <div className="w-11 h-11 rounded-full border border-slate-100 bg-white text-[#39842B] flex items-center justify-center shrink-0 shadow-sm">
                <Phone className="w-5 h-5 text-[#39842B]" />
              </div>
              <div className="flex flex-col roboto">
                <span className="text-[#39842B] text-xs font-bold uppercase tracking-wider mb-1">
                  CALL US
                </span>
                <span className="text-[#082042] text-sm md:text-base font-bold mb-0.5">
                  (888) 123-7733
                </span>
                <span className="text-slate-500 text-xs md:text-sm font-medium uppercase">
                  ON - FRI, 9 AM - 5 PM EST
                </span>
              </div>
            </div>

            <div className="w-full border-b border-slate-200/60 my-6" />

            {/* Office Contact info */}
            <div className="flex items-center gap-4 w-full">
              <div className="w-11 h-11 rounded-full border border-slate-100 bg-white text-[#39842B] flex items-center justify-center shrink-0 shadow-sm">
                <MapPin className="w-5 h-5 text-[#39842B]" />
              </div>
              <div className="flex flex-col roboto">
                <span className="text-[#39842B] text-xs font-bold uppercase tracking-wider mb-1">
                  OUR OFFICE
                </span>
                <span className="text-[#082042] text-sm md:text-base font-bold mb-0.5 capitalize">
                  123 school lane, suite 100
                </span>
                <span className="text-slate-500 text-xs md:text-sm font-medium capitalize">
                  Orlando, fl 32801
                </span>
              </div>
            </div>

            {/* Need Help Card */}
            <div className="w-full bg-white rounded-2xl shadow-sm p-6 mt-8 border border-slate-100/50 text-left">
              <h4 className="text-[#39842B] text-lg font-bold mb-2 lora">
                Need Help?
              </h4>
              <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed mb-4 roboto">
                Find answers about ai quiz generation, exam uploads, student rankings, results, and platform features in our faq section.
              </p>
              <a
                onClick={() => {
                  document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-[#39842B] hover:text-[#39842B]/95 font-bold text-xs md:text-sm inline-flex items-center gap-1 transition-colors roboto cursor-pointer hover:underline"
              >
                Explore FAQs <span className="text-base leading-none">→</span>
              </a>
            </div>
          </div>

          {/* Vertical Divider (Desktop Only) */}
          <div className="hidden lg:block w-[1px] bg-slate-200/60 self-stretch my-2 mx-1" />

          {/* Right Column: Form Card */}
          <div className="w-full lg:w-[62%] bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 flex flex-col items-center">
            
            {/* Form Title & Description */}
            <h3 className="text-xl md:text-2xl lg:text-[28px] font-extrabold text-[#082042] mb-2 lora text-center">
              Send Us A Message
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-medium mb-8 text-center max-w-sm mx-auto roboto leading-relaxed">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
              
              {/* Full Name & Email Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("fullName")}
                    className={`border ${
                      errors.fullName ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-[#39842B]"
                    } focus:ring-1 focus:ring-[#39842B]/20 rounded-lg px-4 py-3 bg-white text-slate-800 text-sm outline-none transition-all placeholder:text-slate-400 roboto w-full`}
                  />
                  {errors.fullName && (
                    <span className="text-red-500 text-xs font-medium mt-1 pl-1 roboto block text-left">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <input
                    type="email"
                    placeholder="Email Address"
                    {...register("email")}
                    className={`border ${
                      errors.email ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-[#39842B]"
                    } focus:ring-1 focus:ring-[#39842B]/20 rounded-lg px-4 py-3 bg-white text-slate-800 text-sm outline-none transition-all placeholder:text-slate-400 roboto w-full`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs font-medium mt-1 pl-1 roboto block text-left">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject Dropdown */}
              <div className="flex flex-col">
                <div className="relative w-full">
                  <select
                    {...register("subject")}
                    className={`border ${
                      errors.subject ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-[#39842B]"
                    } focus:ring-1 focus:ring-[#39842B]/20 rounded-lg px-4 py-3 bg-white text-slate-800 text-sm outline-none transition-all placeholder:text-slate-400 roboto w-full appearance-none pr-10`}
                  >
                    <option value="">Subject</option>
                    <option value="AI Quiz Generation">AI Quiz Generation</option>
                    <option value="Student/Admin Account">Student/Admin Account</option>
                    <option value="Payment & Billing">Payment & Billing</option>
                    <option value="Other Technical Issues">Other Technical Issues</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                    <ChevronDown className="w-5 h-5 text-[#082042]" />
                  </div>
                </div>
                {errors.subject && (
                  <span className="text-red-500 text-xs font-medium mt-1 pl-1 roboto block text-left">
                    {errors.subject.message}
                  </span>
                )}
              </div>

              {/* Textarea Message */}
              <div className="flex flex-col">
                <div className="relative w-full">
                  <textarea
                    placeholder="Your Message"
                    rows={6}
                    {...register("message")}
                    className={`border ${
                      errors.message ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-[#39842B]"
                    } focus:ring-1 focus:ring-[#39842B]/20 rounded-lg px-4 py-3 pb-10 bg-white text-slate-800 text-sm outline-none transition-all placeholder:text-slate-400 roboto w-full resize-none`}
                  />
                  <span className={`absolute bottom-3 right-4 text-xs font-medium roboto transition-colors ${
                    wordCount > 200 ? "text-red-500 font-bold animate-pulse" : "text-slate-400"
                  }`}>
                    {wordCount} / 200 Words
                  </span>
                </div>
                {errors.message && (
                  <span className="text-red-500 text-xs font-medium mt-1 pl-1 roboto block text-left">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#357A28] hover:bg-[#357A28]/95 text-white font-medium px-12 py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 duration-200 disabled:opacity-75 disabled:pointer-events-none w-full sm:w-auto roboto leading-none"
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <span className="text-lg leading-none select-none">→</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
