import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BlogPostForm from './BlogPostForm';
import axiosInstance from '../axiosInstance';

function CreatePost() {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="mt-5">
                        <h2>Create Post</h2>
                        <BlogPostForm />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePost;
