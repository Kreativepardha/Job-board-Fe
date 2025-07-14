'use client';

import { useEffect, useState } from 'react';
import type { Job } from '../types';
import { client } from '../api/client';
import { JobCard } from '../components/job/JobCard';
import { AuroraBackground } from '../components/ui/aurora-background';
import { motion } from 'motion/react';

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await client.get('/jobs', {
          params: filter ? { type: filter } : {},
        });
        setJobs(res.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [filter]);

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="relative z-10 max-w-4xl w-full mx-auto px-4 py-10 space-y-6"
      >
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {['', 'remote', 'full-time', 'part-time'].map((t) => (
            <button
              key={t}
              className={`px-3 py-1 rounded-full border transition ${
                filter === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setFilter(t)}
            >
              {t === '' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-red-500">No jobs found</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </motion.div>
    </AuroraBackground>
  );
}
