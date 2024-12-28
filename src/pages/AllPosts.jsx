import React, { useState, useEffect } from "react";
import { PostCard, Container } from "../components";
import appwriteService from "../appwrite/consf";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {}, []);
  appwriteService.getPosts().then((post) => {
    if (post) setPosts(post.documents);
  });


  if(posts.length === 0) {
    return (
      <div className="py-8 w-full">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl text-center">No Posts Found</h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8 w-full">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => {
            return (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard post={post} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
