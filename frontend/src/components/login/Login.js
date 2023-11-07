import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(null);
  const [verificationSent, setVerificationSent] = useState(false);

  const generateVerificationCode = () => {
    
    const validEmailRegex = /@gatech\.edu$/;
    
    if (!validEmailRegex.test(email)) {
      alert("Please enter your Georgia Tech email address only!");
      return;
    }

    // Generate a random 4-digit verification code
    const code = Math.floor(1000 + Math.random() * 9000);
    setVerificationCode(code);

    // Send the verification code via email using emailJS
    const emailParams = {
      to_email: email,
      verification_code: code,
    };

    emailjs
    .send(
      'service_kuya3oc',
      'template_abaymb9',
      emailParams,
      'KfXB4eRwr17xWB1Pd'
    )
      .then((response) => {
        console.log('Email sent successfully:', response);
        setVerificationSent(true);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send verification code via email.');
      });
  };

  const tryLogin = () => {
    if (verificationCode === null) {
      alert("Please generate a verification code first.");
    } else if (parseInt(enteredCode) === verificationCode) {
      // Correct verification code, navigate to the dashboard
      navigate('/dashboard');
    } else {
      alert("Incorrect verification code. Please try again.");
    }
  }

  const [enteredCode, setEnteredCode] = useState("");

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '64px' }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={generateVerificationCode}
          >
            Generate Verification Code 
          </Button>
          {verificationSent && (
            <div>
              <TextField
                label="Verification Code"
                fullWidth
                variant="outlined"
                margin="normal"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={tryLogin}
              >
                Log In
              </Button>
            </div>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
