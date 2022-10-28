import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function AdminRoutes() {

  const [ cookies ] = useCookies(["authCookies"]);

  return (
    !cookies.authCookies ? <Navigate to="/announcements" /> : cookies.authCookies.admin_id ?  <Outlet /> : <Navigate to="/announcements" />
  )
}
