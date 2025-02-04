import React from "react";

function Article({ post }) {
  return (
    <div className="md:flex px-6 mx-4 border rounded-md justify-between">
      <div className="flex flex-col gap-2 pb-8">
        {/* Thumbnail config for Mobile */}
        <div className="thumbnail md:hidden w-[90%] p-3 mx-auto">
          <img src="src/assets/sample.png" alt="" />
        </div>
        <h2 className="font-bold text-3xl text-center md:text-left">
          {post.title}
        </h2>
        <p className="text-center  md:text-left">{post.content}</p>
      </div>
      {/* // FIXME: add post.description       */}
      {/* thumbanail config for PC */}
      <div className="thumbnail hidden md:block md:w-[50%] lg:w-[40%] xl:w-[30%] p-3">
        <img src="src/assets/sample.png" alt="" />
      </div>
    </div>
  );
}

export default Article;
