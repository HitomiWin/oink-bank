import React, { memo, VFC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'


export const Navigation: VFC = memo(() =>  {

  return (
   	<Navbar bg="primary" variant="light" expand="md">
       	<Container>
				<Link  to="/" className="navbar-brand  text-info">
					<span role="img" aria-label="A piggy bank"><FontAwesomeIcon icon={faPiggyBank} color="white" size="lg"/></span> Oink Bank
				</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">		
            <>
              <NavDropdown title={<FontAwesomeIcon icon={faUser}  size="lg"  className="text-info"  />} id="basic-nav-dropdown">
                <NavLink to="/update-profile" className="dropdown-item ">Update Profile</NavLink>
                <NavLink to="/register-child" className="dropdown-item ">Register Child</NavLink>
                <NavDropdown.Divider />
                <NavLink to="/logout" className="dropdown-item ">Log Out</NavLink>
              </NavDropdown>					
              <NavLink to="/login" className="nav-link text-info">Login</NavLink>
              <NavLink to="/signup" className="nav-link text-info">Signup</NavLink>
            </>
					</Nav>
				</Navbar.Collapse>
        </Container>
     </Navbar>
  )
});
