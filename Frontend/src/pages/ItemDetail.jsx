import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useSnackbar } from "notistack";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/items/${id}`
        );
        setItem(res.data);
      } catch (err) {
        enqueueSnackbar("Failed to load item.", { variant: "error" });
      }
      setLoading(false);
    };
    fetchItem();
    // eslint-disable-next-line
  }, [id]);

  const handleSwap = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/swaps`,
        { itemId: id, type: "swap" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      enqueueSnackbar("Swap request sent!", { variant: "success" });
    } catch (err) {
      enqueueSnackbar(
        err.response?.data?.message || "Failed to request swap.",
        { variant: "error" }
      );
    }
  };

  const handleRedeem = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/swaps/request`,
        { itemId: id, type: "swap" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      enqueueSnackbar("Redeem request sent!", { variant: "success" });
    } catch (err) {
      enqueueSnackbar(
        err.response?.data?.message || "Failed to redeem item.",
        { variant: "error" }
      );
    }
  };

  if (loading)
    return (
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  if (!item)
    return (
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Item not found.
        </Typography>
      </Box>
    );

  // --- Robust tag rendering ---
  const renderTags = () => {
    if (!item.tags) return null;
    if (Array.isArray(item.tags)) {
      return item.tags.map((tag, idx) =>
        tag ? (
          <Chip
            key={idx}
            label={tag.trim()}
            sx={{ mr: 1, mb: 1 }}
            color="secondary"
          />
        ) : null
      );
    }
    if (typeof item.tags === "string") {
      return item.tags.split(",").map((tag, idx) =>
        tag.trim() ? (
          <Chip
            key={idx}
            label={tag.trim()}
            sx={{ mr: 1, mb: 1 }}
            color="secondary"
          />
        ) : null
      );
    }
    return null;
  };

  return (
    <Container maxWidth="md" sx={{ my: 6 }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          boxShadow: 4,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Swiper
              modules={[Navigation]}
              navigation
              loop
              style={{ borderRadius: 12 }}
            >
              {(item.images || [item.imageUrl]).map((img, idx) => (
                <SwiperSlide key={idx}>
                  <Box
                    sx={{
                      width: "100%",
                      height: 320,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#f0f0f0",
                      borderRadius: 4,
                    }}
                  >
                    <img
                      src={img}
                      alt={item.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: 300,
                        borderRadius: 10,
                        objectFit: "cover",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              fontWeight={900}
              gutterBottom
              sx={{ letterSpacing: 1 }}
            >
              {item.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {item.category} &bull; {item.type} &bull; Size: {item.size}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {item.description}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Chip
                label={`Condition: ${item.condition}`}
                color="success"
                sx={{ mr: 1 }}
              />
              {renderTags()}
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 2, fontWeight: 700, borderRadius: 2 }}
                onClick={handleSwap}
              >
                Request Swap
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ fontWeight: 700, borderRadius: 2 }}
                onClick={handleRedeem}
              >
                Redeem with Points
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ItemDetail;