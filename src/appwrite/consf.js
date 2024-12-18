import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  clint = new Client();
  databases;
  storage;

  constructor() {
    this.clint
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.clint);
    this.storage = new Storage(this.clint);
  }

  //Create Post
  async createPost({ title, sluge, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        sluge,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.error("Faild to create Post.", error);
    }
  }

  //Update Posts
  async updatePost(sluge, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        sluge,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.error("Faild to updatePost.", error);
    }
  }

  //Delete post
  async deletePost(sluge) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        sluge
      );
      return true;
    } catch (error) {
      console.error("Faild to delete ", error);
      return false;
    }
  }

  //Get singlePost
  async getPost(sluge) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        sluge
      );
    } catch (error) {
      console.error("Unable to fetch getPost", error);
      return false;
    }
  }

  //Get All posts
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Faild to fetch All post", error);
      return false;
    }
  }

  //File Upload
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Faild to upload File.");
      return false;
    }
  }

  //Delete File
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Faild to delete File.");
      return false;
    }
  }

  //File preview 
  async getFilePreview(fileId){
    try {
        return await this.storage.getFilePreview(config.appwriteBucketId,fileId);
    } catch (error) {
        console.log("Faild to preview");
    }
  }

  
}

const service = new Service();

export default service;
