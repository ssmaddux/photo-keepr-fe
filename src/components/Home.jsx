import React, { useState, useEffect } from "react";
import axios from 'axios';
import Nav from "./Nav";
import Footer from "./Footer";
import Photos from "./Photos";
import {Card} from "react-bootstrap";

export default function Home() {
    const [photos, setPhotos] = useState([]);
    const [newComments, setNewComments] = useState({});
    const [Comments, setComments] = useState({});
    const [users, setUsers] = useState({});



    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/users/`);
                console.log(response.data);
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        getUsers();
    }, []);

    // const handleUserSubmit = async (userId) => {
    //     users.id === userId
    //     return users.name
    // }


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

            // Refetch comments after successfully posting a new comment
            const response2 = await axios.get(`http://127.0.0.1:8000/comments/`);
            setComments(response2.data);
    
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
            <h1 className="text-light">Welcome to Photo Keepr</h1>
            {Array.isArray(photos) && photos.length > 0 ? (
              photos.map((photo) => (
                <div key={photo.id} className="card mb-3 bg-light text-dark">
                  <img src={photo.image} alt={photo.photo_name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{photo.photo_name}</h5>
      
                    {/* User Info */}
                    <div className="user-info bg-light p-2 mb-2">
                      <p className="card-text">
                        Photo posted by: {users.filter(user => user.id === photo.user)[0]?.name} on {photo.date}
                      </p>
                    </div>
      
                    {/* Comments */}
                    
                    <div className="comments-section bg-dark-grey text-dark p-2">
                      <ul className="list-unstyled">
                        {Array.isArray(Comments) && Comments.filter(comment => comment.rel_photo === photo.id).map((filteredComment) => (
                          <li key={filteredComment.id} className="mb-2">{filteredComment.comment}</li>
                        ))}
                      </ul>
                    </div>
                    
                    
      
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
