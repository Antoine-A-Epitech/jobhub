import React from 'react';
import fetcher from './../../helpers/fetcher.js';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion/dist/framer-motion';
import { useCookies } from 'react-cookie';
import ReactMarkdown from 'react-markdown';
import './UserApplications.css';

export default function UserApplications() {

  const [applications, setApplications] = useState([]);
  const [ cookies ] = useCookies(['authCookies']) // For the user_id

  // For the animation
  const [view, setView] = useState({isOpen: false, key: null});

  // handling the click for the animation
  const handleClick = (key) => {
    setView({isOpen: !view.isOpen, key});
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const user_id = cookies.authCookies.user_id;
    const { data } = await fetcher.get(`/api/applications/user/${user_id}`);
    setApplications(data);
  }

  return (
    <div className="application-div">
      {applications && applications.map(app => (
        <motion.div
        key={ app.application_id.toString() }
        transition={{layout: { duration: 1, type: 'spring' } }}
        layout
        onClick={() => handleClick(app.application_id)}
        className="card">
          <motion.h5 layout>{app.job_title} - {app.contract_type}</motion.h5>

          {view.isOpen && app.application_id === view.key && (
            <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
            key={ app.announcement_id }
            className="details"
            >
              <span><span role="img" aria-label="clock">🕑</span> {app.working_time}h / week</span>
              <span><span role="img" aria-label="money">💸</span> {app.wage} $</span>
              <span><span role="img" aria-label="pin">📍</span> {app.address}, {app.city}, {app.postal_code}</span>
              <div className="message-div">
                <h5>Your Message</h5>
                <ReactMarkdown className="mt-3 message">
                {app.message}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
