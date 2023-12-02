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





    

return (
    <div className="photosmaindiv">
        <Nav />
        <h3>This is photos</h3>
        <Container>
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




