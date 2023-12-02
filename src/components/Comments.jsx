import React, { useState, useEffect } from "react";
import axios from 'axios';
import Nav from "./Nav";
import Footer from "./Footer";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Comments() {
    const [comments, setComments] = useState([]);

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

    // Add functionality for updating comments as needed

    return (
        <div className="commentsmaindiv">
            <Nav />
            <h3>This is comments</h3>
            {comments.map((comment) => (
                <Card key={comment.id} className="mb-3">
                    <Card.Body>
                        <Card.Title>{comment.comment}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Photo ID: {comment.rel_photo}</Card.Subtitle>
                        {/* Add other details you want to display */}
                        <Button variant="danger" onClick={() => handleDeleteComment(comment.id)}>
                            Delete
                        </Button>
                        {/* Add update functionality */}
                    </Card.Body>
                </Card>
            ))}
            <Footer />
        </div>
    );
}
