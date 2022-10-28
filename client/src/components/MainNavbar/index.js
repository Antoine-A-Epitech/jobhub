import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useCookies } from 'react-cookie';

function MainNavbar() {
  // Check if the user is auth
  const [ cookies ] = useCookies(["authCookies"]);
  const isAuth = cookies.authCookies ? true : false;
  const is_recruter = cookies.authCookies ? cookies.authCookies.is_recruter : false;
  const admin_id = cookies.authCookies ? cookies.authCookies.admin_id : false;
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark">
            <Container>
              {isAuth &&
                <Navbar.Brand>
                    <Link to="/profile">
                        Profile
                    </Link>
                </Navbar.Brand>
              }
                <Navbar.Brand>
                    <Link to="/">
                        <img
                            src="images/jobhub.png"
                            width="150"
                            height="50"
                            className="image-fluid shadow-4"
                            alt="JobHub Logo"
                        />
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="bg-primary"/>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me">
                        <Nav.Link href="#">
                            <Link className="link_text" to="/">Home</Link>
                        </Nav.Link>

                        <Nav.Link href="#">
                            <Link to="/announcements">Announcements</Link>
                        </Nav.Link>

                        {!isAuth &&
                          <>
                            <Nav.Link href="#">
                                <Link to="/signup">Sign Up</Link>
                            </Nav.Link>

                            <Nav.Link href="#">
                                <Link to="/login">Login</Link>
                            </Nav.Link>
                          </>
                        }

                        {(isAuth && !is_recruter) &&
                          <Nav.Link href="#">
                            <Link to="/applications">My Applications</Link>
                          </Nav.Link>
                        }

                        {(isAuth && is_recruter) &&
                          <Nav.Link href="#">
                            <Link to="/post-announcement">Post Announcement</Link>
                          </Nav.Link>
                        }

                        {admin_id &&
                          <Nav.Link href="#">
                            <Link to="/admin-pannel">Admin Pannel</Link>
                          </Nav.Link>
                        }
                        
                        {isAuth &&
                          <Nav.Link href="#">
                              <Link to="/logout">Logout</Link>
                          </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default MainNavbar;
