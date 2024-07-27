"use client";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserProfile = ({ params }) => {
  const [promptData, setPromptData] = useState([]);

  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const { data: session } = useSession();
  const router = useRouter();

 

 

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      console.log(data);

      setPromptData(data);
    };

     if(params.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={`${userName}` }
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={promptData}
      
      
    />
  );
};

export default UserProfile;
