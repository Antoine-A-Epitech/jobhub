import React from 'react';
import fetcher from './../../helpers/fetcher.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownAlert from '../MarkdownAlert/';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './ApplicationForm.css';
import { useCookies } from 'react-cookie';

export default function ApplicationForm() {

  // For the announcement information
  const [announcement, setAnnouncement] = useState({});
  const [message, setMessage] = useState(``);
  const [applicationSent, setApplicationSent] = useState(false);
  const [ cookies ] = useCookies(['authCookies'])
  const { id } = useParams();


  // Handle the submit
  const handleSubmit = e => {
    e.preventDefault(); // Prevent the page from reloading

    // Send the application
    fetcher.post(`/application/${id}`, {token: cookies.authCookies.token, user_id: cookies.authCookies.user_id, message}).then(res => {
      setApplicationSent(true);
    }).catch(e => console.log(e));
  };


  function ApplicationSent() {
    return (
      <Alert variant="success">Your Application has been sent !</Alert>
    )
  }


  // Fetch and display the announcement data in the page
  useEffect(() => {
    fetchAnnouncementDetails();
  }, []);


  const fetchAnnouncementDetails = async () => {
    try {
      const { data } = await fetcher.get(`/api/announcements/${id}`);
      setAnnouncement(data[0]);
    } catch (e) {
      console.log(e);
    }
    return
  }

  return (

    <div className="application-card">
      <div className="announcement-information">
        <h4>{announcement.job_title}, {announcement.contract_type}</h4>
        <div className="announcement-details">
          <span><span role="img" aria-label="office-building">🏢</span> {announcement.company_name}</span>
          <span><span role="img" aria-label="pin">📍</span> {announcement.address}, {announcement.city}, {announcement.postal_code}</span>
          <span><span role="img" aria-label="clock">🕐</span> {announcement.working_time} h / week </span>
          <span><span role="img" aria-label="money">💸</span> {announcement.wage} $</span>
        </div>
        <p>{announcement.description}</p>
        {!applicationSent &&
          <>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label><b>Your Application Message</b></Form.Label>
              <Form.Control as="textarea" aria-label="With textarea" onChange={e => setMessage(e.target.value)} />
            </Form.Group>
            <Button className="mb-3" type="submit" variant="primary">
              Send
            </Button>
          </Form>
          <MarkdownAlert></MarkdownAlert>
          </>
        }
        {applicationSent && <ApplicationSent></ApplicationSent>}
      </div>
    </div>
  )
};
