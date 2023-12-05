import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
  return (
    <>
      <Navbar bg="dark" expand="sm" variant="dark">
        <Container>
          <Navbar.Brand href="home">Photo keepr</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="home">Feed</Nav.Link>
              <Nav.Link href="photos">Photos</Nav.Link>
              <Nav.Link href="comments">comments</Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                {/* Add dropdown items here */}
                <NavDropdown.Item href="comments">Comments</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
