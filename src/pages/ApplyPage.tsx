import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { client } from "../api/client";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  resumeLink: z.string().url("Invalid URL"),
  coverLetter: z.string().min(10, "Cover letter too short"),
});

type FormData = z.infer<typeof formSchema>;

export default function ApplyPage() {
  const { id } = useParams<{ id: string }>();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await client.post("/applications", {
        ...data,
        jobId: parseInt(id || "0"),
      });
      setSuccess(true);
    } catch (err) {
      console.error("Failed to apply:", err);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto p-6 text-center bg-green-50 border border-green-300 rounded-md mt-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-2">
          ✅ Application Submitted!
        </h2>
        <p className="text-gray-700">We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Apply for Job #{id}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Name</label>
          <input
            {...register("name")}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Resume Link
          </label>
          <input
            {...register("resumeLink")}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://linkedin.com/in/your-profile"
          />
          {errors.resumeLink && (
            <p className="text-red-500 text-sm mt-1">
              {errors.resumeLink.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Cover Letter
          </label>
          <textarea
            {...register("coverLetter")}
            className="w-full border border-gray-300 rounded-md px-4 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Why are you a good fit for this job?"
          />
          {errors.coverLetter && (
            <p className="text-red-500 text-sm mt-1">
              {errors.coverLetter.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
