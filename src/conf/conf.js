const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteArticleCollectionId: String(import.meta.env.VITE_APPWRITE_ARTICLE_COLLECTION_ID),
    appwriteCommentCollectionId: String(import.meta.VITE_APPWRITE_COMMENT_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMceAPIkey: String(import.meta.env.VITE_TINY_MCE_API_KEY)
}



export default conf;