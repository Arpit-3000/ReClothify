import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Chip,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";

const AdminPanel = () => {
  const [pendingItems, setPendingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const fetchPending = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/pending-items`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPendingItems(res.data);
    } catch (err) {
      enqueueSnackbar("Failed to load pending items.", { variant: "error" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPending();
    // eslint-disable-next-line
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/approve-item/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      enqueueSnackbar("Item approved!", { variant: "success" });
      fetchPending();
    } catch (err) {
      enqueueSnackbar("Failed to approve item.", { variant: "error" });
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/reject-item/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      enqueueSnackbar("Item rejected and deleted.", { variant: "info" });
      fetchPending();
    } catch (err) {
      enqueueSnackbar("Failed to reject item.", { variant: "error" });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 3, md: 6 }, mb: 4 }}>
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
          fontWeight={900}
          gutterBottom
          align="center"
          sx={{ letterSpacing: 1 }}
        >
          Admin Panel – Pending Items
        </Typography>
        {loading ? (
          <Box sx={{ textAlign: "center", my: 6 }}>
            <CircularProgress />
          </Box>
        ) : pendingItems.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ my: 4 }}>
            No pending items for approval.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Uploader</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Condition</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={700}>{item.title}</Typography>
                    </TableCell>
                    <TableCell>{item.uploader?.name || "N/A"}</TableCell>
                    <TableCell>
                      <Chip label={item.category} color="primary" />
                    </TableCell>
                    <TableCell>
                      <Chip label={item.condition} color="success" />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{ mr: 1, borderRadius: 2, fontWeight: 700 }}
                        onClick={() => handleApprove(item._id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ borderRadius: 2, fontWeight: 700 }}
                        onClick={() => handleReject(item._id)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default AdminPanel;