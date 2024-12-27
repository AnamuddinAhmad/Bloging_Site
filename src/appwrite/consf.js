import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
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
      console.log("Faild to create Post.", error);
    }
  }

  //Update Posts
  async updatePost(sluge, { title, content, featuredImage, status, userId}) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        sluge,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log("Faild to updatePost.", error);
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
      console.log("Faild to delete ", error);
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
      console.log("Unable to fetch getPost", error);
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
      console.log("Failed to fetch All post", error);
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
      console.log("Faild to upload File.");
      return false;
    }
  }

  //Delete File
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Faild to delete File.");
      return false;
    }
  }

  //File preview
  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Faild to preview");
    }
  }
}

const service = new Service();

export default service;
