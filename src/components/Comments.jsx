import React, { useState, useEffect } from "react";
import axios from 'axios';
import Nav from "./Nav";
import Footer from "./Footer";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Comments() {
    const [comments, setComments] = useState([]);
    const [updatedComments, setUpdatedComments] = useState({});

    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/comments/`);
                console.log(response.data);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        getComments();
    }, []);

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/comment/${commentId}`);
            // Remove the deleted comment from the state
            setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleUpdateComment = async (commentId) => {
        try {
            await axios.put(`http://127.0.0.1:8000/comment/${commentId}`, {
                comment: updatedComments[commentId],
            });
            // Update the comment in the state
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === commentId ? { ...comment, comment: updatedComments[commentId] } : comment
                )
            );

            setUpdatedComments((prev) => ({
                ...prev,
                [commentId]: "",
            }));
            
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleInputChange = (commentId, value) => {
        setUpdatedComments((prev) => ({
            ...prev,
            [commentId]: value,
        }));
    };

    return (
        <div className="commentsmaindiv">
            <Nav />
            <h3>This is comments</h3>
            {comments.map((comment) => (
                <Card key={comment.id} className="mb-3">
                    <Card.Body>
                        <Card.Title>{comment.comment}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Photo ID: {comment.rel_photo}</Card.Subtitle>
                        <Form.Group controlId={`commentUpdate${comment.id}`}>
                            <Form.Control
                                type="text"
                                placeholder="Update Comment"
                                value={updatedComments[comment.id] || ""}
                                onChange={(e) => handleInputChange(comment.id, e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={() => handleUpdateComment(comment.id)}>
                            Update
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteComment(comment.id)}>
                            Delete
                        </Button>
                    </Card.Body>
                </Card>
            ))}
            <Footer />
        </div>
    );
}
