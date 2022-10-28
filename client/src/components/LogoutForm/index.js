import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './LogoutForm.css';

export default function LogoutForm() {

  const [ cookies, setCookie, removeCookie ] = useCookies(['authCookies']);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from refreshing

    removeCookie('authCookies');
    navigate('/login');
  }

  return (
    <div className="card-div">
      <Form onSubmit={e => handleSubmit(e)}>
        <h5>Are you sure you want to logout ?</h5>
        <Button type="submit" variant="primary">
          Logout
        </Button>
      </Form>
    </div>
  )
}
