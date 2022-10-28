import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function PrivateRoutes() {

  const [ cookies ] = useCookies(["authCookies"]);

  return (
    cookies.authCookies ? <Outlet /> : <Navigate to="/login"/>
  )
}
