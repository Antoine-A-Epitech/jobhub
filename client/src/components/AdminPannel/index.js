import React from 'react';
import fetcher from './../../helpers/fetcher.js';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { motion } from 'framer-motion/dist/framer-motion';
import './AdminPannel.css';

export default function AdminPannel() {

  // Getting the token for the requests
  const [ cookies ] = useCookies(["authCookies"]);
  const token = cookies.authCookies ? cookies.authCookies.token : null;

  // For Fetching the announcements
  const [announcements, setAnnouncements] = useState([]);

  // For Fetching the users
  const [ users, setUsers ] = useState([]);

  // For Fetching companies
  const [ companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
    fetchUsers();
    fetchCompanies();
  }, []);

  const handleDeleteButton = async (e, id) => {
    await fetcher.delete(`/api/${e.target.id}/${id}`, { headers: {'authorization': token}});

    switch (e.target.id) {
      case 'users':
        setUsers(users.filter(user => user.user_id !== parseInt(id)));
        break;
      case 'announcements':
        setAnnouncements(announcements.filter(ann => ann.announcement_id !== parseInt(id)))
        break;
      case 'companies':
        setCompanies(companies.filter(company => company.company_id !== parseInt(id)));
        break;
    }
  }

  const fetchAnnouncements = async () => {
    const { data } = await fetcher.get('/api/announcements',  { headers: {'authorization': token}});
    setAnnouncements(data);
  }

  const fetchUsers = async () => {
    const { data } = await fetcher.get('/api/users', { headers: {'authorization': token}});
    setUsers(data);
  }

  const fetchCompanies = async () => {
    const { data } = await fetcher.get('/api/companies',  { headers: {'authorization': token}});
    setCompanies(data);
  }

  return (
    <>
      <div className="body">
        <h1>Users</h1>
        {users.map(user => (
          <div className="user-div">
            <span>{user.firstname}</span>
            <span>{user.lastname}</span>
            <span>{user.email}</span>
            <Button variant="primary" id="users" onClick={e => handleDeleteButton(e, user.user_id)}>Delete</Button>
          </div>
        ))}
        <h1>Announcements</h1>
        {announcements.map(ann => (
          <div className="ann-div">
            <span>{ ann.job_title }</span>
            <span>{ ann.contract_type }</span>
            <p>{ ann.description }</p>
            <div>
              <Button variant="primary" id="announcements" onClick={e => handleDeleteButton(e, ann.announcement_id)}>Delete</Button>
            </div>
          </div>
        ))}
        <h1>Companies</h1>
        {companies.map(company => (
          <div className="user-div">
            <span>{ company.company_name }</span>
            <span>{ company.address }, { company.city }, { company.postal_code }</span>
            <Button variant="primary" id="companies" onClick={e => handleDeleteButton(e, company.company_id)}>Delete</Button>
          </div>
        ))}
      </div>
    </>
  )
}
