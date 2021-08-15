import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { NavbarBrand, Nav, NavItem, Navbar, Container } from 'react-bootstrap';
import UserContext from './UserContext';

const NavBar = () => {
  const { user, logOut } = useContext(UserContext);

  return (
    <div>
      <Navbar bg='light' variant='light'>
        <Container>
          <NavbarBrand as={NavLink} to='/' className='navbar-brand'>
            Jobly
          </NavbarBrand>

          {/* This is where you will login/signup */}

          <Nav className='justify-content-end' activeKey='/login'>
            {!user.username && (
              <>
                <NavItem>
                  <Nav.Link as={NavLink} to='/login'>
                    Login
                  </Nav.Link>
                </NavItem>
                <NavItem>
                  <Nav.Link as={NavLink} to='/signup'>
                    Sign Up
                  </Nav.Link>
                </NavItem>
              </>
            )}

            {/* End of login/signup */}
            {/* This is will show links when you are logged in */}
            {user.username && (
              <>
                <NavItem>
                  <Nav.Link as={NavLink} to='/companies'>
                    Companies
                  </Nav.Link>
                </NavItem>
                <NavItem>
                  <Nav.Link as={NavLink} to='/jobs'>
                    Jobs
                  </Nav.Link>
                </NavItem>
                <NavItem>
                  <Nav.Link as={NavLink} to='/profile'>
                    Profile
                  </Nav.Link>
                </NavItem>

                <NavItem>
                  <Nav.Link onClick={logOut} as={NavLink} to='/logout'>
                    Log Out {user.username}
                  </Nav.Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
