import React from 'react';
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const tryLogin = () => {
    document.cookie = 'user_id=' + email;
    navigate('/dashboard');
  }

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            onChange={(e) => {setEmail(e.target.value)}}
          />
          {/* <TextField
            label="Password"
            fullWidth
            variant="outlined"
            type="password"
            margin="normal"
          /> */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={tryLogin}
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
