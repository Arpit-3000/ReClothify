import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";

const categories = [
  "Men",
  "Women",
  "Kids",
  "Accessories",
  "Footwear",
  "Other",
];
const conditions = ["New", "Like New", "Good", "Fair"];

const AddItem = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
    tags: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      // Only append keys with values, and use 'image' as the field name
      Object.keys(form).forEach((key) => {
        if (form[key]) {
          if (key === "image") {
            data.append("image", form.image);
          } else {
            data.append(key, form[key]);
          }
        }
      });
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/items`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      enqueueSnackbar("Item submitted! Awaiting admin approval.", {
        variant: "success",
      });
      setForm({
        title: "",
        description: "",
        category: "",
        type: "",
        size: "",
        condition: "",
        tags: "",
        image: null,
      });
      setPreview(null);
    } catch (err) {
      enqueueSnackbar(
        err.response?.data?.message || "Failed to add item.",
        { variant: "error" }
      );
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: { xs: 3, md: 6 }, mb: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, md: 4 },
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
          Add New Item
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container columns={12} spacing={2}>
            <Grid span={12}>
              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid span={12}>
              <TextField
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                required
                multiline
                minRows={2}
              />
            </Grid>
            <Grid span={6}>
              <TextField
                select
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                fullWidth
                required
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid span={6}>
              <TextField
                label="Type"
                name="type"
                value={form.type}
                onChange={handleChange}
                fullWidth
                required
                placeholder="e.g. Shirt, Jeans"
              />
            </Grid>
            <Grid span={6}>
              <TextField
                label="Size"
                name="size"
                value={form.size}
                onChange={handleChange}
                fullWidth
                required
                placeholder="e.g. M, L, 32"
              />
            </Grid>
            <Grid span={6}>
              <TextField
                select
                label="Condition"
                name="condition"
                value={form.condition}
                onChange={handleChange}
                fullWidth
                required
              >
                {conditions.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid span={12}>
              <TextField
                label="Tags (comma separated)"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                fullWidth
                placeholder="e.g. summer, casual, blue"
              />
            </Grid>
            <Grid span={12}>
              <Button
                variant="contained"
                component="label"
                color="secondary"
                fullWidth
                sx={{ borderRadius: 2, fontWeight: 700, mt: 1 }}
              >
                {form.image ? "Change Image" : "Upload Image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  hidden
                  onChange={handleChange}
                  required={!form.image}
                />
              </Button>
              {preview && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: 220,
                      borderRadius: 8,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  />
                </Box>
              )}
            </Grid>
            <Grid span={12}>
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
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? "Submitting..." : "Add Item"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddItem;