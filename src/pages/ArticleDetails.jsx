import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ArticleDetails() {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch article details by ID
  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/v1/blog/get/${id}`, // Assuming this is your API endpoint
          { withCredentials: true }
        );
        setArticle(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
        setLoading(false);
      }
    }

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>No article found!</div>;
  }

  return (
    <div className="article-details md:w-[80%] mx-auto">
      <div className="px-6 mt-16 md:w-full lg:w-[90%]">
        <div className="img w-[90%]">
          <img src="/src/assets/sample.png" alt="Article Image" />
        </div>
        <div
          className="text-2xl md:text-4xl font-bold my-8"
          dangerouslySetInnerHTML={{ __html: article.title }}
        />
        {/* Render the rich content using dangerouslySetInnerHTML */}
        <div
          className="article-content my-2 text-sm md:text-lg lg:text-xl"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}

export default ArticleDetails;
