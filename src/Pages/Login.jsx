import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography, Grid } from "@mui/material";
import { useContext } from "react";
import productContext from '../context/products/productContext';

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const context = useContext(productContext);  
  const { host } = context; //destructuring

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      // alert("Logged in successfully");
    } else {
      // alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 3,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 1,
            backgroundColor: "#e6ede5",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={credentials.email}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Button
            component={Link}
            to="/reset"
            fullWidth
            variant="outlined"
            color="secondary"
          >
            Forgot password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
