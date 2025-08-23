import React, { useState, Fragment } from "react";
import { Drawer, Box, List, ListItemButton, Typography, ButtonBase, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

// or
import { ListSubheader } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Label } from "@mui/icons-material";
import HomeMaxOutlinedIcon from "@mui/icons-material/HomeMaxOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";

const Sidebar = () => {
  const [submenuState, setSubmenuState] = useState<{ [key: string]: boolean }>({});
  const [activeItem, setActiveItem] = useState<string | null>(null); // State for active item

  const handleSubmenuToggle = (key: string) => {
    setSubmenuState((prevState) => ({
      ...prevState,
      [key]: !prevState[key], // Toggle the state for the specific submenu
    }));
  };

  const handleItemClick = (key: string | null) => {
    setActiveItem(key); // Set the active item
  };

  const menuItems = [
    {
      label: "dashboard",
      icon: <HomeMaxOutlinedIcon />,
      hasSubmenu: true,
      key: "dashboard",
      submenu: [
        {
          label: "quản lý quần áo",
          icon: <HomeIcon />,
        },
        {
          label: "Subitem 2",
          icon: <HomeIcon />,
        },
      ],
    },
    { label: "Orders", key: "orders", icon: <HomeIcon />, hasSubmenu: false },
    {
      label: "Products",
      icon: <HomeIcon />,
      hasSubmenu: true,
      key: "products",
      submenu: [
        { label: "Subitem A", icon: <HomeIcon /> },
        { label: "Subitem B", icon: <HomeIcon /> },
      ],
    },
  ];
  return (
    <Drawer variant="persistent" open={true}>
      <Box className="sidebarBox">
        <Box className="logo">
          <a className="logo_link" href="/">
            <img className="logo_img" src="images/logo_black.png" alt="logo" />
            <h1 className="logo_text" >GirlHaf</h1>
          </a>
        </Box>
        <Box className="sidebarMenu" sx={{ padding: "0 20px" }}>
          <List>
            <ListSubheader>Menu</ListSubheader>

            {menuItems.map((item, index) => (
              <Fragment key={index}>
                <ListItemButton
                  onClick={() => {
                    if (item.hasSubmenu) {
                      handleSubmenuToggle(item.key || "");
                    }
                    handleItemClick(item.key || null); // Set active item on click
                  }}
                  selected={activeItem === item.key}
                  sx={{
                    borderRadius: "8px",
                    marginBottom: "2px",
                    "&.Mui-selected": {
                      backgroundColor: "rgba(0, 133, 219, 0.1)",
                      color: "rgba(0, 133, 219, 0.9)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: activeItem === item.key ? "rgba(0, 133, 219, 0.9)" : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText>{item.label}</ListItemText>
                  {item.hasSubmenu &&
                    (submenuState[item.key || ""] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                {item.hasSubmenu && (
                  <Collapse in={submenuState[item.key || ""]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.submenu?.map((subitem, subIndex) => (
                        <ListItemButton
                          key={subIndex}
                          onClick={() => handleItemClick(`${item.key}-${subIndex}`)}
                          selected={activeItem === `${item.key}-${subIndex}`}
                          sx={{
                            borderRadius: "8px",
                            marginBottom: "2px",
                            pl: 4,
                            "&.Mui-selected": {
                              backgroundColor: "rgba(0, 133, 219, 0.1)",
                              color: "rgba(0, 133, 219, 0.9)", 
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color:
                                activeItem === `${item.key}-${subIndex}`
                                  ? "rgba(0, 133, 219, 0.9)"
                                  : "inherit",
                            }}
                          >
                            {subitem.icon}
                          </ListItemIcon>
                          <ListItemText>{subitem.label}</ListItemText>
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Fragment>
            ))}
          </List>
        </Box>
        <Box
          className="sidebarFooter"
          sx={{
            padding: "16px 24px",
            backgroundColor: "rgba(0, 133, 219, 0.1)",
            margin: "24px",
            borderRadius: "18px",
          }}
        >
          <Stack direction={"row"} spacing={2} alignItems="center">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ height: "45px" }} />
              <Box sx={{ marginLeft: "16px" }}>
                <Typography variant="h5" component="h5" sx={{ fontWeight: "600", fontSize: "18px" }}>
                  Peter
                </Typography>
                <Typography variant="h6" component="h6" sx={{fontSize:"14px"}}>
                  admin
                </Typography>
              </Box>
            </Box>
            <IconButton sx={{ borderRadius: "50%", minWidth: "40px", height: "40px" }}>
              <LogoutIcon sx={{ color: "rgba(0, 133, 219, 0.9)" }} />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
