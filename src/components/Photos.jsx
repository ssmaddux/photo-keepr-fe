import React, { useState, useEffect } from "react";
import axios from 'axios';
import Nav from "./Nav";
import Footer from "./Footer";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form  from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
            formData.append('photo_name', photoName); 

            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0];
            formData.append('date', formattedDate);
            

    
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
            <Form>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose a photo</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handlePhotoChange} />
                </Form.Group>
                
                <Form.Group controlId="photoName" className="mb-3">
                    <Form.Label>Enter photo name</Form.Label>
                    <Form.Control type="text" placeholder="Photo Name" value={photoName} onChange={(e) => setPhotoName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="userSelect" className="mb-3">
                    <Form.Label>Select a user</Form.Label>
                    <Form.Select onChange={handleUserChange}>
                        <option value="">Choose...</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" onClick={handleUpload}>
                    Upload Photo
                </Button>
            </Form>

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
