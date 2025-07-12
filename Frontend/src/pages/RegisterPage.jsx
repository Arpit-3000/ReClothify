import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        form
      );
      enqueueSnackbar("Registration successful! Please login.", {
        variant: "success",
      });
      navigate("/login");
    } catch (err) {
      // Log error for debugging
      console.log("Register error:", err, err?.response);
      enqueueSnackbar(
        err?.response?.data?.message ||
          err?.message ||
          "Registration failed",
        { variant: "error" }
      );
    }
    setLoading(false);
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
          Register
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="on">
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            type="email"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
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
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
        <Button
          color="secondary"
          fullWidth
          sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }}
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </Button>
      </Paper>
    </Container>
  );
};

export default RegisterPage;