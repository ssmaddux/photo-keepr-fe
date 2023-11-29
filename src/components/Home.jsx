import React, { useState, useEffect } from "react";
import axios from 'axios';
import Nav from "./Nav";
import Footer from "./Footer";

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
                    <div key={photo.id} className="photo-container">
                        <img src={photo.image} alt={photo.photo_name} />
                        <p>{photo.photo_name}</p>
                        <p>{photo.user.email}</p>
                        {/* Add more details or styling as needed */}
                    </div>
                ))}
            </div>
            <div className="footerhomediv">
                <Footer />
            </div>
        </div>
    );
}
