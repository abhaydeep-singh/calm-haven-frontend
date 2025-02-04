import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  async function handlePublish() {
    try {
      const post = await axios.post(
        "http://localhost:9000/api/v1/blog/add",
        {
          title,
          content,
          desc
        },
        {
          withCredentials: true, // Important for sending cookies to the backend
        }
      );
      console.log("Article Published Succesfully, navigating to dashboard");
      navigate("/helper-dashboard");
    } catch (error) {
      console.log(`An error occured while publishing article: ${error}`);
    }
  }
  return (
    <div>
      <div className="body w-[80%] mx-auto ">
        <div className="logo my-6">
          <img className="mx-auto" src="src/assets/logo.png" alt="" />
        </div>
        <div className="titleEditor my-8 lg:mx-8 ">
          <h2 className="font-serif font-bold text-xl my-4">Add Title</h2>
          <RichTextEditor
            onContentChange={(text) => setTitle(text)}
            height={100}
          />
        </div>

        <div className="contentEditor my-8 lg:mx-8">
          <h2 className="font-serif font-bold text-xl my-4">Add Content</h2>
          <RichTextEditor
            onContentChange={(text) => setContent(text)}
            height={300}
          />
        </div>
        <div className="description my-6 w-[50%] mx-auto">
            <h3 className="font-serif font-bold text-xl my-4 text-center">Add Description</h3>
          <Input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholher="Add post description here..."
          />
        </div>
       <div className="btn flex justify-center mb-7">
       <Button className="" onClick={handlePublish}>
          Publish
        </Button>
       </div>
      </div>
    </div>
  );
}

export default CreateArticle;
