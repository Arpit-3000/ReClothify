import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      enqueueSnackbar("Login successful!", { variant: "success" });
      navigate("/dashboard");
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "Login failed", {
        variant: "error",
      });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: { xs: 4, md: 8 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, md: 4 },
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          boxShadow: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          fontWeight={900}
          sx={{ letterSpacing: 1 }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
            autoFocus
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
              mt: 2,
              fontWeight: 700,
              borderRadius: 2,
              letterSpacing: 1,
            }}
          >
            Login
          </Button>
        </form>
        <Button
          color="secondary"
          fullWidth
          sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }}
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;