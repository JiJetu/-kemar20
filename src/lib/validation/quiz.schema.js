import z from "zod";

export const uploadQuizSchema = z.object({
  pdfFile: z
    .any()
    .refine((file) => file !== null && file !== undefined, {
      message: "PDF file is required",
    })
    .refine(
      (file) => !file || file instanceof File || (file.name && typeof file.name === "string"),
      { message: "Please upload a valid file" }
    )
    .refine(
      (file) => !file || file.type === "application/pdf" || file.name?.toLowerCase().endsWith(".pdf"),
      { message: "Only PDF files are allowed" }
    )
    .refine(
      (file) => !file || file.size <= 10 * 1024 * 1024,
      { message: "File size must be up to 10 MB" }
    ),
  subject: z.string().min(1, "Subject is required"),
  date: z.string().min(1, "Date is required"),
  duration: z.string().min(1, "Duration time is required"),
  numQuestions: z
    .string()
    .min(1, "Number of questions is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Questions must be a number greater than 0",
    }),
});
