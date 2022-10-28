import React from "react";
import fetcher from './../../helpers/fetcher.js';
import  Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { motion } from 'framer-motion/dist/framer-motion';
import { Link } from 'react-router-dom';
import './AnnouncementsDisplay.css';

export default function AnnouncementsDisplay() {

  // For fetching the announcements
  const [announcements, setAnnouncements] = useState([]);
  const [ cookies ] = useCookies(["authCookies"]);

  // For the animation
  const [view, setView] = useState({isOpen: false, key: false});
  const isRecruiter = cookies.authCookies ? cookies.authCookies.is_recruter : false;
  // handling the click for the animation
  const handleClick = (key) => {
    setView({isOpen: !view.isOpen, key});
  }

  useEffect(() => {
    fetchAnnouncements();
  }, [])

  const fetchAnnouncements = async () => {
    const { data } = await fetcher.get('/api/announcements');

    setAnnouncements(data);
  }
  return (
    <div className="announcements-div">
      {announcements.map(ann => (
        <motion.div
        key={ ann.announcement_id.toString() }
        transition={{layout: { duration: 1, type: 'spring' } }}
        layout
        onClick={() => handleClick(ann.announcement_id)}
        className="card">
          <motion.h5 layout>{ann.job_title} - {ann.contract_type}</motion.h5>

          {view.isOpen && ann.announcement_id === view.key && (
            <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
            key={ ann.announcement_id }
            className="details"
            >
              <span><span role="img" aria-label="clock">🕑</span> {ann.working_time}h / week</span>
              <span><span role="img" aria-label="money">💸</span> {ann.wage} $</span>
              <span><span role="img" aria-label="pin">📍</span> {ann.address}, {ann.city}, {ann.postal_code}</span>
              <p>{ann.description}</p>
              <div className="apply-div">
              {!isRecruiter &&
                  <Link to={"/announcements/" + ann.announcement_id}><Button variant="primary">Apply</Button></Link>
              }
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
};
