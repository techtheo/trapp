import { Container, Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import Logo from "../../assets/Images/trapp.png";

const isAuthenticated = true;

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');

  if (!isAuthenticated) {
    return <Navigate to="/app" />
  }

  return (
    <>
      {isAuthPage ? (
        <Outlet />
      ) : (
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
      )}
    </>
  );
};

export default MainLayout;
