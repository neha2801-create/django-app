import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Menu,
  Avatar,
  Button,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Preferences = () => {
  const [showAs, setShowAs] = useState("Online");
  const [theme, setTheme] = useState(() => {
    // Retrieve the theme from localStorage or use a default theme
    return localStorage.getItem("theme") || "Blueprint";
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (selectedTheme) => {
    const root = document.documentElement;
    switch (selectedTheme) {
      case "Light":
        root.style.setProperty("--primary-color", "#ffffff");
        root.style.setProperty("--background-color", "#f0f0f0");
        root.style.setProperty("--text-color", "#000000");
        break;
      case "Dark":
        root.style.setProperty("--primary-color", "#333333");
        root.style.setProperty("--background-color", "#121212");
        root.style.setProperty("--text-color", "#ffffff");
        break;
      case "Blueprint":
        root.style.setProperty("--primary-color", "#2196f3");
        root.style.setProperty("--background-color", "#eeeeee");
        root.style.setProperty("--text-color", "#333333");
        break;
      default:
        // Default theme
        root.style.setProperty("--primary-color", "#333333");
        root.style.setProperty("--background-color", "#ffffff");
        root.style.setProperty("--text-color", "#000000");
        break;
    }
  };

  const handleThemeChange = (newTheme) => {
    // Save the selected theme in localStorage
    localStorage.setItem("theme", newTheme);

    // Update the theme state
    setTheme(newTheme);
  };

  const handleShowAsChange = (newShowAs) => {
    setShowAs(newShowAs);
  };

  const handleUpdatePassword = () => {
    if (currentPassword && newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        console.log("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        console.log("New password and confirm password do not match");
      }
    } else {
      console.log("Please fill in all password fields");
    }
  };

  const handleDeleteAccount = () => {
    // Assuming you have some authentication service or API endpoint to delete the account
    // You would typically make a request to your backend to delete the account
    // This is a simplified example
    fetch('/api/deleteAccount', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // Add any authentication headers if needed
        },
        body: JSON.stringify({
            // You might need to include some user identifier or token for authentication
            // For example, if you have a JWT token, you could include it here
            userId: 'user123', // Example user ID
            // Add any other data required for the deletion process
        }),
    })
    .then(response => {
        if (response.ok) {
            console.log('Account deleted successfully');
            // Optionally, you can redirect the user to a different page or show a success message
        } else {
            console.error('Failed to delete account');
            // Optionally, you can show an error message to the user
        }
    })
    .catch(error => {
        console.error('Error deleting account:', error);
        // Optionally, you can show an error message to the user
    });
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (

    <Box
      sx={{
        bgcolor: "#2C2C2C",
        borderRadius: "16px",
        p: 3,
        margin: "0 auto",
      }}
    >
      <Typography>
        Preferences
      </Typography>
      <Box
        sx={{
          bgcolor: "#2C2C2C",
          borderRadius: "16px",
          p: 3,
          margin: "0 auto",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                bgcolor: "#484848",
                color: "#ffffff",
              }}
            >
              SN
            </Avatar>
            <Typography variant="h5" color="white">
              Some Name
            </Typography>
            <Typography variant="body2" color="#ffffff70">
              someone@somewhere.com
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Select
              value={showAs}
              onChange={(e) => handleShowAsChange(e.target.value)}
              sx={{
                bgcolor: "#484848",
                color: "white",
                "& .MuiSelect-icon": {
                  color: "white",
                },
              }}
            >
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Offline">Offline</MenuItem>
            </Select>
            <IconButton
              onClick={handleOpenMenu}
              sx={{ color: "white", bgcolor: "#484848" }}
            >
              <LogoutOutlinedIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleDeleteAccount}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LogoutOutlinedIcon />
                  <Typography variant="body2">Delete account</Typography>
                </Stack>
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>

        <Box mb={4} sx={{ borderRadius: "8px", bgcolor: "#333333", p: 2 }}>
          <Typography variant="h6" color="white" mb={2}>
            Theme
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant={theme === "Light" ? "contained" : "outlined"}
              onClick={() => handleThemeChange("Light")}
              sx={{
                minWidth: 80,
                minHeight: 80,
                bgcolor: "#484848",
                color: "white",
                "&:hover": {
                  bgcolor: "#555555",
                },
              }}
            >
              Light
            </Button>
            <Button
              variant={theme === "Dark" ? "contained" : "outlined"}
              onClick={() => handleThemeChange("Dark")}
              sx={{
                minWidth: 80,
                minHeight: 80,
                bgcolor: "#484848",
                color: "white",
                "&:hover": {
                  bgcolor: "#555555",
                },
              }}
            >
              Dark
            </Button>
            <Button
              variant={theme === "Blueprint" ? "contained" : "outlined"}
              onClick={() => handleThemeChange("Blueprint")}
              sx={{
                minWidth: 80,
                minHeight: 80,
                bgcolor: "#484848",
                color: "white",
                "&:hover": {
                  bgcolor: "#555555",
                },
              }}
            >
              Blueprint
            </Button>
          </Stack>
          <Typography variant="body2" color="#ffffff70" mt={2}>
            {theme === "Light"
              ? "Dynamic description text based on the theme selected or hover on. Something funny, witty."
              : theme === "Dark"
              ? "Dynamic description text based on the theme selected or hover on. Something funny, witty."
              : "Dynamic description text based on the theme selected or hover on. Something funny, witty."}
          </Typography>
        </Box>

        <Box mb={4} sx={{ borderRadius: "8px", bgcolor: "#333333", p: 2 }}>
          <Typography variant="h6" color="white" mb={2}>
            Update password
          </Typography>
          <Stack spacing={2}>
            <input
              type="password"
              placeholder="Your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{
                width: "40%",
                padding: "10px",
                bgcolor: "#484848",
                border: "none",
                color: "white",
                alignItems:"center"
              }}
            />
            <input
              type="password"
              placeholder="Set new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: "40%",
                padding: "10px",
                bgcolor: "#484848",
                border: "none",
                color: "white",
                alignItems:"center"
              }}
            />
            <input
              type="password"
              placeholder="Confirm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "40%",
                padding: "10px",
                bgcolor: "#484848",
                border: "none",
                color: "white",
                alignItems:"center"
              }}
            />
            <Typography variant="body2" color="#ffffff70">
              A verification link will be sent your email.
            </Typography>
            <Button
              variant="contained"
              onClick={handleUpdatePassword}
              sx={{
                bgcolor: "#484848",
                color: "white",
                width:"43%",
                "&:hover": {
                  bgcolor: "#555555",
                  
                },
              }}
            >
              Update password
            </Button>
          </Stack>
        </Box>

        <Box mb={4} sx={{ borderRadius: "8px", bgcolor: "#333333", p: 2 }}>
          <Typography variant="h6" color="white" mb={2}>
            Delete account
          </Typography>
          <Button
            variant="contained"
            onClick={handleDeleteAccount}
            sx={{
              bgcolor: "#ff4444",
              color: "white",
              "&:hover": {
                bgcolor: "#e53935",
              },
            }}
          >
            Delete my account
          </Button>
        </Box>

        <Box sx={{ borderRadius: "8px", bgcolor: "#333333", p: 2 }}>
          <Typography variant="h6" color="white" mb={2}>
            Friends
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: "#484848",
                  color: "white",
                  width: 40,
                  height: 40,
                }}
              >
                FF
              </Avatar>
              <Typography variant="body1" color="white">
                First Friend
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: "#484848",
                  color: "white",
                  width: 40,
                  height: 40,
                }}
              >
                SF
              </Avatar>
              <Typography variant="body1" color="white">
                Second Friend
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: "#484848",
                  color: "white",
                  width: 40,
                  height: 40,
                }}
              >
                FF
              </Avatar>
              <Typography variant="body1" color="white">
                Fourth Friend
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: "#484848",
                  color: "white",
                  width: 40,
                  height: 40,
                }}
              >
                FF
              </Avatar>
              <Typography variant="body1" color="white">
                Fifth Friend
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Preferences;