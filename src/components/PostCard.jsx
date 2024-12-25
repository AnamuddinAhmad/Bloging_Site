import React from "react";
import appwriteService from "../appwrite/consf";
import { Link } from "react-router-dom";

export const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl px-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={{ $id }}
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};
