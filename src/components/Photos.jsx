import React, { useState, useEffect } from "react";
import axios from 'axios';
import Nav from "./Nav";
import Footer from "./Footer";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Photos() {
    const [photos, setPhotos] = useState([]);
    const [comments, setComments] = useState({});
    const [newPhoto, setNewPhoto] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [photoName, setPhotoName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePhotos = await axios.get(`http://127.0.0.1:8000/photos/`);
                const responseUsers = await axios.get(`http://127.0.0.1:8000/users/`);

                setPhotos(responsePhotos.data);
                setUsers(responseUsers.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setNewPhoto(file);
    };

    const handleUserChange = (event) => {
        const userId = event.target.value;
        setSelectedUser(userId);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', newPhoto);
            formData.append('user', selectedUser);
            formData.append('photo_name', photoName); // Add this line
    
            // Post request
            await axios.post(`http://127.0.0.1:8000/photos/upload/`, formData);
    
            // Refresh the photos after upload
            const photoResponse = await axios.get(`http://127.0.0.1:8000/photos/`);
            setPhotos(photoResponse.data);
        } catch (error) {
            console.error("Error uploading photo:", error);
        }
    };
    
    

    return (
        <div className="photosmaindiv">
            <Nav />
            <h3>View your photos here</h3>
            <Container>
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
                <input type="text" placeholder="Enter photo name" value={photoName} onChange={(e)=> setPhotoName(e.target.value)}/>
                
                {/* Dropdown to select a user */}
                <select onChange={handleUserChange}>
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>

                <button onClick={handleUpload}>Upload Photo</button>

                {photos.map((photo, index) => (
                    index % 2 === 0 && (
                        <Row key={photo.id}>
                            <Col>
                                <Card>
                                    <Card.Img src={photo.image} alt={photo.photo_name} className="img-fluid" />
                                    <Card.Body>
                                        <h5>{photo.photo_name}</h5>
                                        {/* Add other details you want to display */}
                                    </Card.Body>
                                </Card>
                            </Col>
                            {index + 1 < photos.length && (
                                <Col>
                                    <Card>
                                        <Card.Img src={photos[index + 1].image} alt={photos[index + 1].photo_name} className="img-fluid" />
                                        <Card.Body>
                                            <h5>{photos[index + 1].photo_name}</h5>
                                            {/* Add other details you want to display */}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    )
                ))}
            </Container>
            <Footer />
        </div>
    );
}
