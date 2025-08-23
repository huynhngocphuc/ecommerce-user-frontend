import React from "react";
import { Container, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { grey } from "@mui/material/colors";
import Footer from "../components/Footer"; // Import the Footer component

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main_background">
      {/* <Box className="sidebar"> */}
      <Sidebar />
      <Box sx={{ marginLeft: "280px" }}>
        <Container maxWidth="lg">
          <Navbar />
          <Box sx={{padding:"24px 0px"}}>
            <Outlet />
          </Box>
        </Container>
      </Box>
      {/* </Box> */}
      {/* <Box className="navbar">
        <Navbar />
      </Box> */}
      {/* <Container>
        <Outlet />
      </Container> */}

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
