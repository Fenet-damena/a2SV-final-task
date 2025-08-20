'use client';

import { useJobs } from '@/hooks/useJobs';
import JobDetailUI from '../../components/JobDetailUI';

type PageProps = {
  params: {
    slug: string;
  };
};

export default function JobPage({ params }: PageProps) {
  const { jobs, loading, error } = useJobs();

  if (loading) {
    return <p className="text-center mt-10">Loading job...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  }

  // Find job by matching slug (title lowercased & dash-separated)
  const job = jobs.find(
    (job) => job.title.toLowerCase().replace(/\s+/g, '-') === params.slug
  );

  if (!job) {
    return <p className="text-center mt-10 text-red-500">Job not found</p>;
  }

  return <JobDetailUI job={job} />;
}
