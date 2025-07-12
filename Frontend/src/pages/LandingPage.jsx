import React from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const featuredItems = [
  {
    title: "Vintage Denim Jacket",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    desc: "Classic style, great condition.",
  },
  {
    title: "Summer Floral Dress",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    desc: "Perfect for any occasion.",
  },
  {
    title: "Comfy Knit Sweater",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    desc: "Stay warm and stylish.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f6fa" }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          bgcolor: "primary.main",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            fontWeight={900}
            gutterBottom
            sx={{ letterSpacing: 2 }}
          >
            ReClothify
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 400 }}>
            Community Clothing Exchange – Swap, Redeem, and Reduce Waste!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mx: 1, borderRadius: 3, fontWeight: 700 }}
            onClick={() => navigate("/register")}
          >
            Start Swapping
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            sx={{ mx: 1, borderRadius: 3, fontWeight: 700 }}
            onClick={() => navigate("/dashboard")}
          >
            Browse Items
          </Button>
          <Button
            variant="contained"
            color="success"
            size="large"
            sx={{ mx: 1, borderRadius: 3, fontWeight: 700 }}
            onClick={() => navigate("/add-item")}
          >
            List an Item
          </Button>
        </Container>
      </Box>

      {/* Featured Items Carousel */}
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          fontWeight={700}
          sx={{ letterSpacing: 1 }}
        >
          Featured Items
        </Typography>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000 }}
          loop
          style={{ marginTop: 32, marginBottom: 32 }}
        >
          {featuredItems.map((item, idx) => (
            <SwiperSlide key={idx}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  flexDirection: { xs: "column", md: "row" },
                  boxShadow: 3,
                  borderRadius: 4,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", md: 220 },
                    height: 220,
                    borderRadius: 4,
                    objectFit: "cover",
                    mr: { md: 3 },
                    mb: { xs: 2, md: 0 },
                  }}
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="h5" fontWeight={700}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {/* How It Works */}
      <Container maxWidth="md" sx={{ my: 8 }}>
        <Grid container columns={12} spacing={4}>
          <Grid span={12} md={4}>
            <Card sx={{ p: 3, minHeight: 180, borderRadius: 4, boxShadow: 2 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                1. List Your Clothes
              </Typography>
              <Typography>
                Upload photos and details of your unused garments. Help them find a new home!
              </Typography>
            </Card>
          </Grid>
          <Grid span={12} md={4}>
            <Card sx={{ p: 3, minHeight: 180, borderRadius: 4, boxShadow: 2 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                2. Swap or Redeem
              </Typography>
              <Typography>
                Exchange directly with others or use points to redeem items you love.
              </Typography>
            </Card>
          </Grid>
          <Grid span={12} md={4}>
            <Card sx={{ p: 3, minHeight: 180, borderRadius: 4, boxShadow: 2 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                3. Support Sustainability
              </Typography>
              <Typography>
                Join a community that cares about reducing textile waste and promoting reuse.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;