import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { client } from '../api/client';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  resumeLink: z.string().url('Invalid URL'),
  coverLetter: z.string().min(10, 'Cover letter too short'),
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
      await client.post('/applications', {
        ...data,
        jobId: parseInt(id || '0'),
      });
      setSuccess(true);
    } catch (err) {
      console.error('Failed to apply:', err);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto p-4 text-center bg-green-50 border border-green-300 rounded">
        <h2 className="text-xl font-semibold text-green-700">✅ Application Submitted!</h2>
        <p>We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-6 border rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold mb-2">Apply for Job #{id}</h2>

      <div>
        <label className="block font-medium">Name</label>
        <input {...register('name')} className="input" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input type="email" {...register('email')} className="input" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Resume Link</label>
        <input {...register('resumeLink')} className="input" />
        {errors.resumeLink && <p className="text-red-500 text-sm">{errors.resumeLink.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Cover Letter</label>
        <textarea {...register('coverLetter')} className="input h-24" />
        {errors.coverLetter && (
          <p className="text-red-500 text-sm">{errors.coverLetter.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}
