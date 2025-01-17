import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router";

const Navcustom = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            {token ? (
              <>
                <Nav.Link as={Link} to="/Login">
                  Log out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/Login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/Register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default Navcustom;
