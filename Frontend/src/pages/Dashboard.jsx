import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [myItems, setMyItems] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    // Fetch user's items
    const fetchMyItems = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/items/my`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setMyItems(res.data);
      } catch (err) {
        setMyItems([]);
      }
    };

    // Fetch swaps
    const fetchSwaps = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/swaps/my`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setSwaps(res.data);
      } catch (err) {
        setSwaps([]);
      }
    };

    fetchMyItems();
    fetchSwaps();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700}>
          Welcome, {user?.name || "User"}!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Email: {user?.email}
        </Typography>
        <Chip
          label={`Points: ${user?.points ?? 0}`}
          color="success"
          sx={{ mt: 2, fontSize: 18, px: 2, py: 1 }}
        />
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mx: 1 }}
            onClick={() => navigate("/add-item")}
          >
            Add New Item
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mx: 1 }}
            onClick={() => navigate("/")}
          >
            Browse Exchange
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        My Uploaded Items
      </Typography>
      <Grid container spacing={2}>
        {myItems.length === 0 ? (
          <Grid item xs={12}>
            <Typography color="text.secondary">No items uploaded yet.</Typography>
          </Grid>
        ) : (
          myItems.map((item) => (
            <Grid item xs={12} md={6} key={item._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {item.status}
                  </Typography>
                  <Button
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => navigate(`/item/${item._id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        My Swaps
      </Typography>
      <Grid container spacing={2}>
        {swaps.length === 0 ? (
          <Grid item xs={12}>
            <Typography color="text.secondary">No swaps yet.</Typography>
          </Grid>
        ) : (
          swaps.map((swap) => (
            <Grid item xs={12} md={6} key={swap._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Item: {swap.item?.title || "N/A"}
                  </Typography>
                  <Typography>
                    Status: <b>{swap.status}</b>
                  </Typography>
                  <Typography>
                    Type: {swap.type === "points" ? "Redeemed via Points" : "Direct Swap"}
                  </Typography>
                  <Typography>
                    With: {swap.requester?.name === user?.name
                      ? swap.owner?.name
                      : swap.requester?.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;