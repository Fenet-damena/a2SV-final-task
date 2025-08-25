"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useState, useEffect } from "react";
import { Bookmark } from "lucide-react";

export interface Job {
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

const JobCard: FC<{ job: Job }> = ({ job }) => {
  const slug = job.title.toLowerCase().replace(/\s+/g, "-");
  const [bookmarked, setBookmarked] = useState(false);

  // ✅ Safely get bookmarks
  const getBookmarks = (): Job[] => {
    try {
      const stored = localStorage.getItem("bookmarks");
      const parsed = stored ? JSON.parse(stored) : [];
      // Only accept array of objects with id
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((b) => b?.id);
    } catch {
      return [];
    }
  };

  // Check if this job is bookmarked
  const checkBookmark = () => {
    const saved = getBookmarks();
    setBookmarked(saved.some((b) => b.id === job.id));
  };

  useEffect(() => {
    checkBookmark();

    // Listen to storage events (other tabs) and focus
    window.addEventListener("storage", checkBookmark);
    window.addEventListener("focus", checkBookmark);

    return () => {
      window.removeEventListener("storage", checkBookmark);
      window.removeEventListener("focus", checkBookmark);
    };
  }, [job.id]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    let bookmarks = getBookmarks();

    if (bookmarked) {
      bookmarks = bookmarks.filter((b) => b.id !== job.id);
    } else {
      bookmarks.push(job);
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setBookmarked(!bookmarked);
  };

  return (
    <Link href={`/job/${slug}`} className="block">
      <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white cursor-pointer relative">
        <button
          onClick={toggleBookmark}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
        >
          <Bookmark
            className={`w-5 h-5 ${
              bookmarked ? "fill-blue-500 text-blue-500" : "text-gray-400"
            }`}
          />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={job.image || "/default-logo.png"}
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
              {job.company} • {job.about.location}
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
