import React from 'react';
import axios from 'axios';

const PostList = ({ posts, onEdit, onDelete }) => {
    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:8080/api/posts/delete/${postId}`);
            onDelete(postId);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="space-y-4">
            {posts.map(post => (
                <div key={post.id} className="p-4 bg-white shadow-md rounded-lg">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p>{post.description}</p>
                    <p><strong>Ingredients:</strong> {post.ingredients}</p>
                    <p><strong>Instructions:</strong> {post.instructions}</p>
                    <div className="flex space-x-2">
                        {post.mediaUrls.map((url, index) => (
                            url.endsWith('.mp4') ? (
                                <video key={index} src={url} controls className="w-32 h-32 object-cover" />
                            ) : (
                                <img key={index} src={url} alt="Post media" className="w-32 h-32 object-cover" />
                            )
                        ))}
                    </div>
                    <div className="tags space-x-2">
                        {post.tags.map((tag, index) => (
                            <span key={index} className="text-orange-500">{tag}</span>
                        ))}
                    </div>
                    <div className="flex space-x-4 mt-2">
                        <button onClick={() => onEdit(post)} className="text-blue-500">Edit</button>
                        <button onClick={() => handleDelete(post.id)} className="text-red-500">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;