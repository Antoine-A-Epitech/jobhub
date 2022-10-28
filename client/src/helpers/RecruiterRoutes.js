import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function RecruiterRoute() {

  const [ cookies ] = useCookies(["authCookies"]);

  return (
    !cookies.authCookies ? <Navigate to="/announcements" /> : cookies.authCookies.is_recruter ?  <Outlet /> : <Navigate to="/announcements" />
  )
}
