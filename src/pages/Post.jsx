
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import service from "../appwrite/config";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);
    const isAuthor = post && userData ? post.userId === userData.$id : false;
    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 px-4 md:px-0">
            <Container>
                <div className="w-full flex flex-col items-center md:flex-row md:justify-center mb-6 relative border rounded-xl p-4 bg-white shadow-md">
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl w-full md:w-[60%] max-h-[400px] object-cover"
                />

                {isAuthor && (
                    <div className="absolute right-4 top-4 flex space-x-2">
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor="bg-green-500" className="px-4 py-2 text-sm">
                        Edit
                        </Button>
                    </Link>
                    <Button
                        bgColor="bg-red-500"
                        className="px-4 py-2 text-sm"
                        onClick={deletePost}
                    >
                        Delete
                    </Button>
                    </div>
                )}
                </div>

                <div className="w-full mb-6 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
                <p className="text-gray-600 mt-2">{post.subtitle}</p>
                </div>

                <div className="browser-css bg-gray-100 p-4 rounded-lg">
                {parse(post.content)}
                </div>
            </Container>
        </div>

    ) : null;
}
