"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const EditePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [loading, setLoading] = useState(true); // Optional: For better UX

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return;
      
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        console.log({ editdata: data });
        setPost(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Ensure loading state is cleared after fetch
      }
    };
    
    getPromptDetails();
  }, [promptId]);

  const editePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.log('Failed to update prompt'); // Optional: Handle non-200 responses
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>; // Optional: Add a loading state for better UX

  return (
    <Form
      type="Edit" // Ensure this matches the Form component's expected prop
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editePrompt}
    />
  );
};

export default EditePrompt;
