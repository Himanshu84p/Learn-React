import { Client, Account, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    //setting db and storage to where to store the data
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("create post error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      console.log(content)
      return await this.databases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("updating doc error");
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("deleting post error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("get post error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("get posts error", error);
    }
  }

  //file upload services

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("file upload error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appWriteBucketId, fileId);
    } catch (error) {
      console.log("delete file error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    
    try {
      console.log("file id",fileId)
      return this.storage.getFilePreview(conf.appWriteBucketId, fileId);
    } catch (error) {
    console.log("preview errror")
      throw error
    }
  }
}

const service = new Service();

export default service;
