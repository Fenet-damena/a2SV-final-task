"use client";

import { useState } from "react";

const BASE_URL = "https://akil-backend.onrender.com";

export default function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const fetchBookmarks = async () => {
    try {
      const res = await fetch(`${BASE_URL}/bookmarks`, {
        credentials: "include",
      });
      const data = await res.json();
      setBookmarks(data.map((item: any) => item.id));
    } catch (err) {
      console.error("Error fetching bookmarks", err);
    }
  };

  const toggleBookmark = async (eventID: string) => {
    try {
      if (bookmarks.includes(eventID)) {
        await fetch(`${BASE_URL}/bookmarks/${eventID}`, {
          method: "DELETE",
          credentials: "include",
        });
        setBookmarks(bookmarks.filter((id) => id !== eventID));
      } else {
        await fetch(`${BASE_URL}/bookmarks/${eventID}`, {
          method: "POST",
          credentials: "include",
        });
        setBookmarks([...bookmarks, eventID]);
      }
    } catch (err) {
      console.error("Error toggling bookmark", err);
    }
  };

  return { bookmarks, toggleBookmark, fetchBookmarks };
}
