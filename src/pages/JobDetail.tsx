import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Job } from "../types";
import { client } from "../api/client";
import { PinContainer } from "../components/ui/3d-pin"; // <- your 3D pin component

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
        console.error("Failed to fetch job:", err);
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
    <div className="max-w-4xl mx-auto p-12 flex justify-center items-center min-h-[80vh] bg-yellow-300">
      <PinContainer
        title={job.title}
        href={`/apply/${job.id}`}
        containerClassName="w-full max-w-2xl"
      >
        <div className="flex flex-col p-4 tracking-tight text-white w-full h-full">
          <h2 className="text-2xl font-bold mb-1">{job.title}</h2>
          <p className="text-gray-300 text-sm mb-2">
            {job.company} • {job.location}
          </p>
          <span className="inline-block w-fit text-xs text-white bg-blue-600 px-3 py-1 rounded-full mb-4">
            {job.type}
          </span>
          <p className="text-sm text-gray-100 whitespace-pre-line flex-1">{job.description}</p>

          <Link
            to={`/apply/${job.id}`}
            className="inline-block mt-6 self-start bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Apply for this job
          </Link>
        </div>
      </PinContainer>
    </div>
  );
}
