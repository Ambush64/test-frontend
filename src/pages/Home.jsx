import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';

function Home() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchBlogs();
        }
    }, []);


    const fetchBlogs = async () => {
        try {
            const response = await axiosInstance.get('/getBlogs');
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/delete/${id}`);
            toast.success('Deleted');
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
            toast.error('Failed');
        }
    };

    return (
        <div className='container'>
            <h2>Blogs</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map(blog => (
                        <tr key={blog._id}>
                            <td>{blog.title}</td>
                            <td><img src={blog.imageLink} alt={blog.title} style={{ maxWidth: '100px' }} /></td>
                            <td>
                                <Link to={`/edit/${blog._id}`} className="btn btn-primary mr-2">Edit</Link>
                                <Button variant="danger" onClick={() => handleDelete(blog._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Home;
