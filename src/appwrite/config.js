import conf from "../conf/conf";
import {Client, ID, Databases, Storage, Query} from 'appwrite';


export class Service{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug, content, featuredImage, status, userId}){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                slug,
                {
                    title, 
                    content,
                    featuredImage,
                    status,
                    userId
                }
            ) 
        } catch (error) {
            console.log("Error in Appwrite :: Services", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Error in Services :: updatePost", error)
        }
    }
    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Error in Appwrite :: DeletePost ", error)
            return false;
        }
        
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                slug
            )
        } catch (error) {
            console.log("Error in Appwrite :: Get Post ", error)
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            const posts = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                queries,
            )
            
            return posts;
        } catch (error) {
            console.log("Error in Appwrite Services :: getPosts")
            return false;
        }
    }

    // file uploading service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Services :: Uploading File ", error);
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite Services :: Deleting File ", error);
            return false
        }
    }
    getFilePreview(fileId){
        try {
            return this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Services :: Preview File ", error);
            return false
        }
    }
}

const service = new Service();

export default service;