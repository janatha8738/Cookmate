import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProfileSidebar from '../components/ProfileSidebar';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

const MyProfile = () => {
    const [posts, setPosts] = useState([]);
    const [showPostForm, setShowPostForm] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const userId = 1;

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/user/${userId}`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleNewPostClick = () => {
        setEditingPost(null);
        setShowPostForm(true);
    };

    const handleEditPost = (post) => {
        setEditingPost(post);
        setShowPostForm(true);
    };

    const handleDeletePost = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
    };

    const handleFormSubmit = () => {
        setShowPostForm(false);
        setEditingPost(null);
        fetchPosts();
    };

    const handleFormCancel = () => {
        setShowPostForm(false);
        setEditingPost(null);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar onNewPostClick={handleNewPostClick} />
            <div className="flex flex-1 p-4">
                <ProfileSidebar />
                <div className="flex-1 ml-4 p-4 bg-white shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">My Posts</h2>
                    {showPostForm ? (
                        <PostForm
                            userId={userId}
                            post={editingPost}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}
                        />
                    ) : posts.length === 0 ? (
                        <div className="text-center">
                            <p className="text-gray-600 mb-4">No posts yet.</p>
                            <button
                                className="bg-orange-500 text-white px-4 py-2 rounded"
                                onClick={handleNewPostClick}
                            >
                                Create Your First Post
                            </button>
                        </div>
                    ) : (
                        <PostList
                            posts={posts}
                            onEdit={handleEditPost}
                            onDelete={handleDeletePost}
                        />
                    )}
                </div>
            </div>
            <div className="footer p-4 bg-white shadow-inner text-center text-gray-600">
                <div className="text-orange-500 font-bold">CookSkill</div>
                <div>Share your culinary journey with the world</div>
                <div className="space-x-4 my-2">
                    <a href="/about" className="text-gray-600">About</a>
                    <a href="/help" className="text-gray-600">Help Center</a>
                    <a href="/privacy" className="text-gray-600">Privacy</a>
                    <a href="/terms" className="text-gray-600">Terms</a>
                </div>
                <div>© 2025 CookSkill. All rights reserved.</div>
            </div>
        </div>
    );
};

export default MyProfile;