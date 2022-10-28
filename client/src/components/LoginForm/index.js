import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './LoginForm.css';
import fetcher from '../../helpers/fetcher.js';
import { useCookies } from 'react-cookie';

export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverRes, setServerRes] = useState('');
  const [ cookies, setAuthCookies ] = useCookies(['authCookies']);
  const navigate = useNavigate();
  const { state } = useLocation();
  const signedUp = state ? true : false;

  const handleSubmit = e => {
    e.preventDefault(); // Prevent the page from refreshing

    // Do the post request to the server
    fetcher.post('/login', {email, password}).then(res => {
      // When the user is logged in
      // Set the cookies
      setAuthCookies('authCookies',res.data, { maxAge: 3600 });

      // Navigate back to the announcments
      navigate('/announcements');
    })
    .catch(err => {
      let serverMessage = err.response ? err.response.data : err.message;
      // If the user wasn't logged in
      setServerRes(serverMessage);
    });
  }

  return (
    <div className="login-card">
      <Form onSubmit={handleSubmit}>
        {signedUp &&
          <Alert variant="success">Your account has been created !</Alert>
        }
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label><b>Email Address:</b></Form.Label>
          <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter Email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label><b>Password :</b></Form.Label>
          <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter Password"/>
        </Form.Group>
        {serverRes &&
          <Alert variant="danger">{serverRes}</ Alert>
        }
        <Button type="submit" variant="primary" disabled={!email.length || !password.length ? true : false}>
          Submit
        </Button>
        <Alert variant="warning" className="alert-box">
          You don't have an account ? <Alert.Link href="/signup">Sign up</Alert.Link>
        </ Alert>
      </Form>
    </div>
  )
}
