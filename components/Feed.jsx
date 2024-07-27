"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [promptData, setPromptData] = useState([]);
  const [filterdData, setFilterData] = useState([]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleTagClick = (tag) => {
    console.log(tag);
    setSearchText(tag);
  };

  const fetchPost = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    console.log(data);
    setPromptData(data);
    setFilterData(data);
  };



  useEffect(() => {
    // fetch data from API
   
    fetchPost();
  }, []);

  console.log(promptData)


  useEffect(() => {
    if(searchText === ''){
      setFilterData(promptData);
    }else{
      const results = promptData.filter(prompt =>
        prompt.prompt.toLowerCase().includes(searchText.toLowerCase()) || 
        prompt.creator?.username.toLowerCase().includes(searchText.toLowerCase()) ||
        prompt.creator?.email.toLowerCase().includes(searchText.toLowerCase()) ||
        prompt.tag.toLowerCase().includes(searchText.toLowerCase()) 
      );
      setFilterData(results);
    }
    
  }, [searchText , promptData]);
  return (
    <section className="feed">
      <form className="relative w-full flex-centre">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filterdData} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
