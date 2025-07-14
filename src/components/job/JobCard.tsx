import { Job } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all">
      <CardContent className="p-4 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
        <p className="text-gray-600">{job.company} • {job.location}</p>
        <span className="text-sm text-white bg-blue-500 px-2 py-1 rounded-full">{job.type}</span>
        <Link
          to={`/job/${job.id}`}
          className="inline-block text-blue-600 hover:underline text-sm mt-2"
        >
          View Details →
        </Link>
      </CardContent>
    </Card>
  );
}
