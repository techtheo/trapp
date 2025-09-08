import { Container, Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Logo from "../../assets/Images/trapp.png";

const MainLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');

  // If user is logged in and trying to access auth pages, redirect to app
  if (isLoggedIn && isAuthPage) {
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
