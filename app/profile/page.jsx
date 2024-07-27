"use client";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [promptData, setPromptData] = useState([]);

  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt");
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${prompt._id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const filteredPrompt = promptData.filter((p) => p._id !== prompt._id);
          setPromptData(filteredPrompt);
        } else {
          alert("Failed to delete prompt");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to delete prompt");
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      console.log(data);

      setPromptData(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={promptData}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default page;
