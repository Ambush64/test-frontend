import React, { useState, useEffect } from 'react';
import BlogPostForm from './BlogPostForm';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

function EditPost() {
    const navigate = useNavigate()
    const param = useParams()
    const [blog, setBlog] = useState({ title: 99, imageLink: "abc" });


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        fetchBlog();
    }, []);

    const fetchBlog = async () => {
        try {
            const response = await axiosInstance.get(`/posts/${param.id}`);
            setBlog(response.data);
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    };

    return (
        <div>
            <h2>Edit Post</h2>
            {blog && <BlogPostForm postId={param.id} initialValues={blog} />}
        </div>
    );
}

export default EditPost;
