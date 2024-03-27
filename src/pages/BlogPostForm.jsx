import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';

function BlogPostForm({ postId }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [imageLink, setImageLink] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        if (postId) {
            axiosInstance.get(`/posts/${postId}`)
                .then(response => {
                    let { title, content, author, date, imageLink } = response.data;
                    const formattedDate = new Date(date).toISOString().split('T')[0];
                    setTitle(title);
                    setContent(content);
                    setAuthor(author);
                    setDate(formattedDate);
                    setImageLink(imageLink);
                })
                .catch(error => {
                    console.error('Error fetching post:', error);
                });
        }
    }, [postId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const postData = { title, content, author, date, imageLink };

            if (postId) {
                await axiosInstance.put(`/posts/${postId}`, postData);
            } else {
                await axiosInstance.post('/posts', postData);
            }
            toast.success('Success');
            navigate('/');
        } catch (error) {
            setErrorMessage('Failed to submit post. Please try again.');
            console.error('Error submitting post:', error);
            toast.error('Failed');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formContent">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Enter content" value={content} onChange={(e) => setContent(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" placeholder="Enter author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formImageLink">
                <Form.Label>Image Link</Form.Label>
                <Form.Control type="text" placeholder="Enter image link" value={imageLink} onChange={(e) => setImageLink(e.target.value)} required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default BlogPostForm;
