import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>ElectroShop</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link style={{ fontSize: '0.8rem', fontWeight: '700' }} href='/cart'><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
              <Nav.Link style={{ fontSize: '0.8rem', fontWeight: '700' }} href='/login'><i className='fas fa-user'></i> Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header