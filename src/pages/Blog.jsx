import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Blog() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    getArticle();
  },[])
  async function getArticle() {
    try {
      const articleList = await axios.get(
        "http://localhost:9000/api/v1/blog/get-all",
        { withCredentials: true }
      );
      setArticles(articleList.data.data); // stores an array of blogs
    } catch (error) {
      console.log(`An Error occurred while fetching all articles: ${error}`);
    }
  }

  const handleArticleClick = (id) => {
    navigate(`/article/${id}`); // Navigates to the article details page
  };

  return (
    <div className="lg:w-[80%] mx-auto">
      <div className="logo flex flex-col items-center my-5">
        <img src="src/assets/logo.png" alt="Logo" />
      </div>

      {/* Using ScrollArea from ShadCN */}
      <ScrollArea className="h-[600px] w-[90%] my-4 rounded-md border mx-auto">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Articles</h4>
          {articles.map((item) => (
            <div
              className="article my-7 cursor-pointer"
              key={item._id}
              onClick={() => handleArticleClick(item._id)}
            >
              <div
                className="Title text-lg font-semibold"
                dangerouslySetInnerHTML={{ __html: item.title }} // Render rich HTML content
              />

              <p>{item.desc}</p>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* <button
        onClick={getArticle}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Load Articles
      </button> */}
    </div>
  );
}

export default Blog;
