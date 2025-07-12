import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const NavBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const menuItems = [
    { label: "Home", action: () => navigate("/"), icon: <HomeIcon /> },
    ...(user
      ? [
          { label: "Dashboard", action: () => navigate("/dashboard") },
          {
            label: "Add Item",
            action: () => navigate("/add-item"),
            icon: <AddCircleIcon />,
          },
          ...(user.isAdmin
            ? [
                {
                  label: "Admin",
                  action: () => navigate("/admin"),
                  icon: <AdminPanelSettingsIcon />,
                },
              ]
            : []),
          {
            label: "Logout",
            action: handleLogout,
            icon: <LogoutIcon />,
          },
        ]
      : [
          { label: "Login", action: () => navigate("/login") },
          { label: "Register", action: () => navigate("/register") },
        ]),
  ];

  return (
    <AppBar position="sticky" color="primary" elevation={3}>
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 900,
            letterSpacing: 2,
            flexGrow: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          ReClothify
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Box
                sx={{ width: 220 }}
                role="presentation"
                onClick={() => setDrawerOpen(false)}
              >
                <List>
                  {menuItems.map((item, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemButton onClick={item.action}>
                        {item.icon && (
                          <Box sx={{ mr: 1, display: "flex" }}>{item.icon}</Box>
                        )}
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </Box>
            </Drawer>
          </>
        ) : (
          <Box>
            {menuItems.map((item, idx) => (
              <Button
                key={idx}
                color="inherit"
                startIcon={item.icon}
                onClick={item.action}
                sx={{
                  fontWeight: 600,
                  mx: 0.5,
                  "&:hover": {
                    bgcolor: "primary.light",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;