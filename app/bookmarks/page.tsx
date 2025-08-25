"use client";

import { useEffect, useState } from "react";
import JobCard from "../components/JobCard"; // adjust path if needed

interface Job {
  id: string;
  title: string;
  company: string;
  about: {
    location: string;
    categories: string[];
  };
  description: string;
  image: string;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Job[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(saved);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Bookmarked Jobs</h1>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500">No bookmarks yet.</p>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
