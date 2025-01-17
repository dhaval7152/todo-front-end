import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
const Verify = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");
      localStorage.setItem("token", token);
      if (!token) {
        setMessage("No verification token provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_Host}/api/verify-email?token=${token}`
        );
        setMessage(response.data);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } catch (error) {
        const errorMessage =
          error.response?.data || "Verification failed. Please try again.";
        setMessage(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Email Verification</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="alert alert-info">{message}</div>
      )}
    </div>
  );
};

export default Verify;
