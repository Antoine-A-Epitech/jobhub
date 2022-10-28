import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import "./SignUpForm.css";
import fetcher from '../../helpers/fetcher.js';

export default function SignUpForm() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postal_code, setPostalCode] = useState('');
    const [is_recruter, setIsRecruter] = useState(false);
    const [serverRes, setServerRes] = useState('');
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault(); // Prevent the page from refreshing

        // Do the post request to the server
        fetcher.post('/signup', { firstname, lastname, email, phone, password, address, city, postal_code, is_recruter }).then(res => {
            // Navigate to the login page so he can sign up
            navigate('/login', { state: { signedUp: true }});
        })
          .catch(err => {
              setServerRes(err.response.data);
          });
    }

    return (
        <div className="signup-card">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label><b>Firstname :</b></Form.Label>
                    <Form.Control value={firstname} onChange={e => setFirstname(e.target.value)} type="text" placeholder="Enter Firstname..." required />
                    <Form.Label><b>Lastname :</b></Form.Label>
                    <Form.Control value={lastname} onChange={e => setLastname(e.target.value)} type="text" placeholder="Enter Lastname..." required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><b>Email Address:</b></Form.Label>
                    <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter Email..." required />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label><b>Phone :</b></Form.Label>
                    <Form.Control value={phone} onChange={e => setPhone(e.target.value)} type="tel" pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}" placeholder="Ex : 06 12 34 56 78" required />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label><b>Address :</b></Form.Label>
                    <Form.Control value={address} onChange={e => setAddress(e.target.value)} type="text" placeholder="Enter Address..." required />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label><b>City :</b></Form.Label>
                    <Form.Control value={city} onChange={e => setCity(e.target.value)} type="text" placeholder="Enter City..." required />

                    <Form.Label><b>Postal Code :</b></Form.Label>
                    <Form.Control value={postal_code} onChange={e => setPostalCode(e.target.value)} type="number" placeholder="Enter Postal Code" required />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label><b>Are you a Recruter ? </b></Form.Label>
                    <input type="checkbox" value={is_recruter} onChange={e => setIsRecruter(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label><b>Password :</b></Form.Label>
                    <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Enter Password..." required/>
                </Form.Group>
                {serverRes &&
                    <Alert variant="danger">{serverRes}</Alert>
                }

                <Button type="submit" variant="primary" className="signup-btn">
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}
