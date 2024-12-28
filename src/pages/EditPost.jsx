import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteSevice from "../appwrite/consf";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  console.log("Edit post ",slug);

  useEffect(() => {
    if (slug) {
      appwriteSevice.getPosts(slug).then((post) => {
        if (post) setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm posts={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
