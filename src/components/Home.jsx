import React, { useState, useEffect } from "react";
import axios from 'axios';
import Nav from "./Nav";
import Footer from "./Footer";

export default function Home() {
    const [photos, setPhotos] = useState([]);
    const [newComments, setNewComments] = useState({});
    const [Comments, setComments] = useState({});

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


    useEffect(() => {
        const getComments = async () => {
            try {
                const response2 = await axios.get(`http://127.0.0.1:8000/comments/`);
                console.log(response2.data);
                setComments(response2.data);
            } catch (error) {
                console.error("Error fetching Comments:", error);
            }
        };

        getComments();
    }, []);

    const handleCommentSubmit = async (photoId) => {
        try {
            const response1 = await axios.post(`http://127.0.0.1:8000/comments/${photoId}`, {
                comment: newComments[photoId] || "",
                rel_photo: photoId,
            });
            console.log(response1);
    
            // Update the specific comment for the photo, keeping others unchanged
            setNewComments((prevComments) => ({
                ...prevComments,
                [photoId]: "", // Clear the comment for the specific photo
            }));
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };
    
    
    
    // useEffect to log newComments after it's updated
    // useEffect(() => {
    //     console.log("New Comments:", newComments);
    // }, [newComments]);

    
    
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
                                <> 
                                    Comments:
                                    <ul>
                                    {Array.isArray(photo.comments) && photo.comments.map((comment) => (<li key={comment.id}>{comment.comment}</li>))}

                                    </ul>
                                </>
                                <p className="card-text">Posted by: {photo.user?.name} on {photo.date}</p>

                                <ul>
                                {Array.isArray(Comments) && Comments.filter(comment => comment.rel_photo === photo.id).map((filteredComment) => (<li key={filteredComment.id}>{filteredComment.comment}</li>))}

                                </ul>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleCommentSubmit(photo.id);
                                    }}
                                >
                                    <input
                                        type="text"
                                        value={newComments[photo.id] || ""}
                                        onChange={(e) =>
                                            setNewComments((prevComments) => ({
                                                ...prevComments,
                                                [photo.id]: e.target.value,
                                            }))
                                        }
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
