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


export default function AnnouncementForm() {

  const [ announcementPosted, setAnnouncementPosted ] = useState(false);
  const [ job_title, setJobTitle ] = useState("");
  const [ contract_type, setContractType ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ city, setCity ] = useState("");
  const [ postal_code, setPostalCode ] = useState("");
  const [ wage, setWage ] = useState("");
  const [ working_time, setWorkingTime ]  = useState("");
  const [ description, setDescription ] =  useState("");

  const handleSubmit = e => {
    e.preventDefault() // prevent the page from reloading

    const params = {
      job_title,
      contract_type,
      address,
      city,
      postal_code,
      wage,
      working_time,
      description
    }

    // Do the post request to the server
    fetcher.post('/api/announcements', params).then(res => {
      setAnnouncementPosted(true);
    }).catch(e => console.log(e));
  };

  function AnnouncementPosted() {
    return (
      <Alert variant="success">Announcement Posted</Alert>
    )
  }

  return (
    <div className="announcement-card">
      {!announcementPosted &&
        <>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label><b>Job Title :</b></Form.Label>
              <Form.Control type="text" value={job_title} onChange={e => setJobTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><b>Contract Type :</b></Form.Label>
              <Form.Select value="CDI" onChange={e => setContractType(e.target.value)}>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
                <option value="Alternance">Alternance</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address :</Form.Label>
              <Form.Control type="text" onChange={e => setAddress(e.target.value)} value={address} placeholder="12 rue de valence" required />

              <Form.Label><b>City :</b></Form.Label>
              <Form.Control value={city} onChange={e => setCity(e.target.value)} type="text" placeholder="Enter City..." required />

              <Form.Label><b>Postal Code :</b></Form.Label>
              <Form.Control value={postal_code} onChange={e => setPostalCode(e.target.value)} type="number" placeholder="Enter Postal Code" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Wage :</Form.Label>
              <Form.Control value={wage} onChange={e => setWage(e.target.value)} type="number" placeholder="2500" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Working Time :</Form.Label><span> h / Week</span>
              <Form.Control value={working_time} onChange={e => setWorkingTime(e.target.value)} type="number" placeholder="35" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><b>The job's description :</b></Form.Label>
              <Form.Control as="textarea" aria-label="With textarea" onChange={e => setDescription(e.target.value)} />
            </Form.Group>
            <MarkdownAlert></MarkdownAlert>
            <Button className="mb-3" type="submit" variant="primary">
              Post
            </Button>
          </Form>
        </>
      }
      {announcementPosted && <AnnouncementPosted></AnnouncementPosted>}
    </div>
  )
}
