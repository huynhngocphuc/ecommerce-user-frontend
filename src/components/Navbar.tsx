import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
interface NavbarProps {
  // toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "background.default",
          borderRadius: "10px",
          color: "text.primary",
          minHeight: "70px",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <IconButton>
            <MenuIcon />
          </IconButton>
          {/* Notification Icon */}
          <Stack
            direction="row"
            sx={{ flexGrow: 1, justifyContent: "flex-end", alignItems: "center" }}
            spacing={1}
          >
            <Box>
              <IconButton color="inherit" className="btn-rounded-circle-40">
                <Badge badgeContent={3} color="info">
                  <NotificationImportantOutlinedIcon sx={{ fontSize: "20px" }} />
                </Badge>
              </IconButton>
            </Box>
            <Box >
              <Button sx={{borderRadius:"25px",minWidth:'64px'}}>
                <Avatar alt="Sharp" src="images/logo_black.png" />
                <Box sx={{ marginLeft: "16px"}}>
                  <Typography variant="h6" component="h6" fontSize="1.2rem">
                    Peter
                  </Typography>
                  <Typography variant="h6" component="h6" sx={{ fontSize: "14px" }}>
                    admin
                  </Typography>
                </Box>
              </Button>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
