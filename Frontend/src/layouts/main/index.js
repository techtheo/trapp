import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

import Logo from "../../assets/Images/trapp.png";

const MainLayout = () => {
  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm">
        <Stack spacing={5}>
          <Stack
            sx={{ width: "100%" }}
            direction="column"
            alignItems={"center"}
          >
            <img style={{ height: 150, width: 150 }} src={Logo} alt="logo" />
          </Stack>
        </Stack>
        
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
