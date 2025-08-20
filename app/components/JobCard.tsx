'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface Job {
  title: string;
  company: string;
  about: {
    location: string;
    categories: string[];
  };
  description: string;
  image: string;
}

const JobCard: FC<{ job: Job }> = ({ job }) => {
  const slug = job.title.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link href={`/job/${slug}`} className="block">
      <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white cursor-pointer">
        <div className="flex items-start gap-4">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={job.image || '/default-logo.png'}
              alt={`${job.company} logo`}
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-grow">
            <h2 className="text-[17px] font-bold font-sans text-gray-800 leading-tight">
              {job.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {job.company} &#8226; {job.about.location}
            </p>
            <p className="mt-2 text-sm text-gray-700 line-clamp-3 leading-snug">
              {job.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {job.about.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-[6px] rounded-full font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
