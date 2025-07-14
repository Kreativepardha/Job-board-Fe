import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../api/client';
// import { client } from '@/api/client';

interface Application {
  id: number;
  name: string;
  email: string;
  resumeLink: string;
  coverLetter: string;
}

export default function AdminPage() {
  const { id } = useParams<{ id: string }>();
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await client.get(`/applications/job/${id}`, {
          headers: {
            'x-admin-token': 'supersecret',
          },
        });
        setApplications(res.data);
      } catch (err) {
        console.error(err);
        setError('Unauthorized or failed to load applications.');
      }
    }

    fetchApplications();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4">
      <h2 className="text-2xl font-bold">📋 Applications for Job #{id}</h2>
      {error && <p className="text-red-500">{error}</p>}
      {applications.length === 0 && !error && (
        <p className="text-gray-500">No applications found.</p>
      )}
      {applications.map((app) => (
        <div key={app.id} className="border p-4 rounded shadow-sm bg-white space-y-1">
          <p><strong>Name:</strong> {app.name}</p>
          <p><strong>Email:</strong> {app.email}</p>
          <p><strong>Resume:</strong> <a className="text-blue-600 underline" href={app.resumeLink} target="_blank">{app.resumeLink}</a></p>
          <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
        </div>
      ))}
    </div>
  );
}
