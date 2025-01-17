import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import axios from "axios";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_Host);
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Add your registration logic here
    // For now, it's just a simple validation
    if (firstname && lastname && email && password) {
      let fomData = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
      };

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_Host}/api/register/customer`,
          fomData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTimeout(() => {
          navigate("/");
        }, 5000);
        alert(response.data.message);
      } catch (error) {
        console.log(error.data.message);
        setErrorMessage(error);
      }
    } else {
      setErrorMessage("All fields are required.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "25rem" }} className="shadow">
        <Card.Body>
          <h3 className="text-center mb-4">Register</h3>
          <Form onSubmit={handleSubmit}>
            {/* Name Field */}
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>

            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Confirm Password Field */}
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-danger mb-3">{errorMessage}</div>
            )}

            {/* Register Button */}
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
