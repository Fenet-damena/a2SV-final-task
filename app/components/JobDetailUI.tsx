'use client';

import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import { Job } from '@/hooks/useJobs';
import { Badge } from './ui/badge';

interface JobDetailUIProps {
  job: Job;
}

export default function JobDetailUI({ job }: JobDetailUIProps) {
  const responsibilitiesList = job.responsibilities?.split('\n').filter(Boolean) || [];
  const idealCandidateList = job.idealCandidate?.split('\n').filter(Boolean) || [];

  const categoryColors = [
    'bg-yellow-100 text-yellow-800',
    'bg-green-100 text-green-800',
    'bg-blue-100 text-blue-800',
    'bg-pink-100 text-pink-800'
  ];

  return (
    <div className="min-h-screen bg-white py-10 px-6 md:px-10 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main Content */}
        <div className="flex-1 space-y-10">
          {/* Description Section */}
          <section>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-800 leading-relaxed text-[16px]">
              {job.description}
            </p>
          </section>

          {/* Responsibilities Section */}
          <section>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Responsibilities</h2>
            <ul className="space-y-3">
              {responsibilitiesList.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-800 text-[16px]">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Ideal Candidate Section */}
          <section>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Ideal Candidate we want</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-800 text-[16px]">
              {idealCandidateList.map((trait, index) => (
                <li key={index}>{trait}</li>
              ))}
            </ul>
          </section>

          {/* When & Where Section */}
          <section>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">When & Where</h2>
            <div className="flex items-start gap-2 text-gray-800 text-[16px]">
              <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              <p>{job.whenAndWhere}</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3 space-y-8 pl-10">
          {/* About Section */}
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-gray-900">About</h3>
            <ul className="space-y-4 text-sm text-gray-800">
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-gray-500">Posted On</p>
                  <p className="font-medium">{new Date(job.datePosted).toLocaleDateString()}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-gray-500">Deadline</p>
                  <p className="font-medium">{new Date(job.deadline).toLocaleDateString()}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium">{job.location.join(', ')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-gray-500">Start Date</p>
                  <p className="font-medium">{new Date(job.startDate).toLocaleDateString()}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-gray-500">End Date</p>
                  <p className="font-medium">{new Date(job.endDate).toLocaleDateString()}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="h-1" />

          {/* Categories Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {job.categories.map((category, index) => (
                <Badge
                  key={index}
                  className={`text-sm px-3 py-1 rounded-md font-medium ${categoryColors[index % categoryColors.length]}`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="h-1" />

          {/* Required Skills Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-md"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
