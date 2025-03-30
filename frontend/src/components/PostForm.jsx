import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ userId, post, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(post ? post.title : '');
    const [description, setDescription] = useState(post ? post.description : '');
    const [ingredients, setIngredients] = useState(post ? post.ingredients : '');
    const [instructions, setInstructions] = useState(post ? post.instructions : '');
    const [mediaUrls, setMediaUrls] = useState(post ? post.mediaUrls : []);
    const [tags, setTags] = useState(post ? post.tags.join(', ') : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { title, description, ingredients, instructions };
        const tagsArray = tags.split(',').map(tag => tag.trim());

        try {
            if (post) {
                await axios.put(`http://localhost:8080/api/posts/update/${post.id}`, postData, {
                    params: { mediaUrls, tags: tagsArray },
                    paramsSerializer: params => {
                        return Object.entries(params)
                            .flatMap(([key, values]) =>
                                Array.isArray(values)
                                    ? values.map(value => `${key}=${encodeURIComponent(value)}`)
                                    : `${key}=${encodeURIComponent(values)}`
                            )
                            .join('&');
                    }
                });
            } else {
                await axios.post(`http://localhost:8080/api/posts/create/${userId}`, postData, {
                    params: { mediaUrls, tags: tagsArray },
                    paramsSerializer: params => {
                        return Object.entries(params)
                            .flatMap(([key, values]) =>
                                Array.isArray(values)
                                    ? values.map(value => `${key}=${encodeURIComponent(value)}`)
                                    : `${key}=${encodeURIComponent(values)}`
                            )
                            .join('&');
                    }
                });
            }
            onSubmit();
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 3) {
            alert('You can upload up to 3 photos or 1 video.');
            return;
        }
        const urls = files.map(file => URL.createObjectURL(file));
        setMediaUrls(urls);
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-4">{post ? 'Edit Post' : 'Create New Post'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Tags (e.g., #Vegan, #Dessert)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="file"
                    multiple
                    accept="image/*,video/mp4"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded"
                />
                <div className="flex space-x-4">
                    <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
                        {post ? 'Update Post' : 'Create Post'}
                    </button>
                    <button type="button" onClick={onCancel} className="bg-gray-300 text-black px-4 py-2 rounded">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;