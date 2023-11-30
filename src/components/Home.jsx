import React, { useState, useEffect } from "react";
import axios from 'axios';
import Nav from "./Nav";
import Footer from "./Footer";
import { Card } from 'react-bootstrap';

export default function Home() {
    const [photos, setPhotos] = useState([]);

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

    return (
        <div className="Homediv">
            <div className="navhomediv">
                <Nav />
            </div>
            <div className="homecontentdiv">
                <h1>This is home</h1>
                {photos.map((photo) => (
                    <Card key={photo.id} className="mb-3">
                        <Card.Img variant="top" src={photo.image} alt={photo.photo_name} />
                        <Card.Body>
                            <Card.Title>{photo.photo_name}</Card.Title>
                            <Card.Text>{photo.comment}</Card.Text>
                            <Card.Text>
                                Posted by: {photo.user.name} on {photo.date}
                            </Card.Text>
                            {/* Add more details or styling as needed */}
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <div className="footerhomediv">
                <Footer />
            </div>
        </div>
    );
}
