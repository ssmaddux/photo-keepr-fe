import React, { useState, useEffect } from "react";
import axios from 'axios';
import Nav from "./Nav";
import Footer from "./Footer";

export default function Home() {
    const [photos, setPhotos] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const getPhotos = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/photos/`);
                console.log(response.data);
                setPhotos(response.data);
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        getPhotos();
    }, []);

    const handleCommentSubmit = async (photoId) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/photos/${photoId}/comments/`, {
                comment: newComment,
            });

            setPhotos((prevPhotos) =>
                prevPhotos.map((photo) =>
                    photo.id === photoId
                        ? { ...photo, comments: [...photo.comments, response.data] }
                        : photo
                )
            );

            setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div className="Homediv">
            <div className="navhomediv">
                <Nav />
            </div>
            <div className="homecontentdiv bg-dark p-4">
                <h1 className="text-light">This is home</h1>
                {Array.isArray(photos) && photos.length > 0 ? (
                    photos.map((photo) => (
                        <div key={photo.id} className="card mb-3 bg-light text-dark">
                            <img src={photo.image} alt={photo.photo_name} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{photo.photo_name}</h5>
                                <p className="card-text">{photo.comment}</p>
                                <p className="card-text">Posted by: {photo.user?.name} on {photo.date}</p>

                                <ul>
                                    {Array.isArray(photo.comments) && photo.comments.map((comment) => (
                                        <li key={comment.id}>{comment.comment}</li>
                                    ))}
                                </ul>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleCommentSubmit(photo.id);
                                    }}
                                >
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Add a comment"
                                    />
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No photos available.</p>
                )}
            </div>
            <div className="footerhomediv">
                <Footer />
            </div>
        </div>
    );
}
