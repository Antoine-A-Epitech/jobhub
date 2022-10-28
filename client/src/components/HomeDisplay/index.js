import React from 'react';
import "./home.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"
import Announcements from '../../pages/announcements';

export default function HomeDisplay() {
    return (
        <>
            <div className="logo-jobless">
                <img
                    src="images/jobless.png"
                    className="jobless"
                    alt="Jobless Logo"
                />
            </div>

            <div className="logo-jobhub">
                <img
                    src="images/jobhub.png"
                    className="jobhub"
                    alt="Jobhub Logo"
                />
            </div>

            <Link to="/announcements" element={<Announcements />}><Button className="view_more" variant="primary">View More...</Button></Link>
        </>
    )
}