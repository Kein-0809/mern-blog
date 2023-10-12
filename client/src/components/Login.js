// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/auth/login', formData);
//       localStorage.setItem('token', response.data.token);
//       setMessage('Login successful');
//       navigate('/home'); // Redirect to home page after successful login
//     } catch (err) {
//       setMessage('Error logging in. Please try again.');
//     }
//   }

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           placeholder="Username"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//       <p>Don't have an account? <a href="/register">Register</a></p>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useContext } from 'react';
import { Button, TextField, Paper, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import UserContext from '../context/UserContext';

function Login() {
  const navigate = useNavigate();
  // const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [, setMessage] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', formData.username);
      setMessage('Login successful');
      navigate('/home'); // Redirect to home page after successful login
    } catch (err) {
      setMessage('Error logging in. Please try again.');
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography component="h1" variant="h5" align="center">
          Login
        </Typography>
        {/* {error && <Typography color="error">{error}</Typography>} */}
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
