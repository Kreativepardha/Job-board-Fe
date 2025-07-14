import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Job } from '../types';
import { client } from '../api/client';
import { GlareCard } from '../components/ui/glare-card';

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await client.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error('Failed to fetch job:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-500 dark:text-gray-300">Loading...</p>;
  if (!job)
    return <p className="text-center text-red-500 dark:text-red-400">Job not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 flex items-center">
      <GlareCard className="p-6 text-white">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{job.title}</h2>
          <p className="text-gray-300">
            {job.company} • {job.location}
          </p>
          <span className="inline-block text-sm text-white bg-blue-600 px-3 py-1 rounded-full">
            {job.type}
          </span>
          <p className="mt-4 text-gray-100 whitespace-pre-line">{job.description}</p>

          <Link
            to={`/apply/${job.id}`}
            className="inline-block mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Apply for this job
          </Link>
        </div>
      </GlareCard>
    </div>
  );
}
