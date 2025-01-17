import React, { use, useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_Host}/api/login`,
        formData
      );
      setTimeout(() => {
        navigate("/");
      }, 5000);
      setErrorMessage(response.data.message);
      alert(response.data.message);
    } catch (error) {
      setErrorMessage(
        error.response?.data.message ||
          "Error: Unable to login. Try again later."
      );
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "25rem" }} className="shadow">
        <Card.Body>
          <h3 className="text-center mb-4">Login</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-danger mb-3">{errorMessage}</div>
            )}

            {/* Login Button */}
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
