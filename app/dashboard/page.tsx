'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { useJobs } from '@/hooks/useJobs';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { jobs, loading, error } = useJobs();
  const [sortBy, setSortBy] = useState('Most relevant');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') return <p className="text-center mt-10">Checking session...</p>;
  if (!session) return null;

  if (loading) return <p className="text-center mt-10">Loading jobs...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Showing {jobs.length} results</p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-gray-600 font-medium">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-700 focus:outline-none"
          >
            <option value="Most relevant">Most relevant</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={{
              title: job.title,
              company: job.orgName,
              about: {
                location: job.location[0] || 'N/A',
                categories: job.categories || [],
              },
              description: job.description,
              image: job.logoUrl,
            }}
          />
        ))}
      </div>
    </main>
  );
}
