import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Job } from '../types';
import { client } from '../api/client';

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job| null>(null);
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

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!job) return <p className="text-center text-red-500">Job not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p className="text-gray-700">
        {job.company} • {job.location}
      </p>
      <span className="text-sm text-white bg-blue-500 px-2 py-1 rounded-full">
        {job.type}
      </span>
      <p className="mt-4 text-gray-800 whitespace-pre-line">{job.description}</p>

      <Link
        to={`/apply/${job.id}`}
        className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Apply for this job
      </Link>
    </div>
  );
}
