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

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      console.log({editdata: data});
      setPost(data);
    };
    if (promptId) getPromptDetails();
  }, [promptId]);



   const editePrompt= async(e) =>{
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
        } 
        
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }

 

  return (
    <Form
      type="Edite"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editePrompt}
    />
  );
};

export default EditePrompt;
