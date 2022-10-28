import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import MainNavbar from './components/MainNavbar';
import Announcements from './pages/announcements';
import Application from './pages/application';
import Logout from './pages/logout';
import Applications from './pages/applications';
import PostAnnouncement from './pages/post-announcement';
import Admin from './pages/admin-pannel';
import PrivateRoutes from './helpers/PrivateRoutes';
import RecruiterRoutes from './helpers/RecruiterRoutes';
import AdminRoutes from './helpers/AdminRoutes';


function App() {
  return (
    <>
      <MainNavbar></MainNavbar>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Application />} path="/announcements/:id" />
          <Route element={<Logout />} path="/logout" />
          <Route element={<Applications />} path="/applications" />
        </Route>
        <Route element={<RecruiterRoutes />}>
          <Route element={<PostAnnouncement/>} path="/post-announcement" />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route element={<Admin/>} path="/admin-pannel"/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
