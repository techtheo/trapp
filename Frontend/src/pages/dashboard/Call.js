import { Box, Divider, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass, Plus } from "phosphor-react";
import Scrollbar from "../../components/Scrollbar";
import CallElement from "../../components/CallElement";
import { ChatList } from "../../data";
import StartCall from "../../sections/main/StartCall";
import { useTheme } from "@mui/material/styles";

const Call = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Stack 
        direction={"row"} 
        sx={{ 
          width: "100%",
          height: "100vh",
          overflow: "hidden"
        }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            position: "relative",
            width: isMobile ? "100%" : isTablet ? 280 : 320,
            minWidth: isMobile ? "100%" : isTablet ? 280 : 320,
            maxWidth: isMobile ? "100%" : isTablet ? 280 : 320,
            overflow: "hidden",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack 
            p={isMobile ? 2 : 3} 
            spacing={2} 
            sx={{ height: "100vh" }}
          >
            <Stack>
              <Typography 
                variant={isMobile ? "h6" : "h5"}
                sx={{ fontWeight: 600 }}
              >
                Call Log
              </Typography>
            </Stack>

            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack>

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ 
                flexWrap: isMobile ? "wrap" : "nowrap",
                gap: isMobile ? 1 : 0
              }}
            >
              <Typography
                variant={isMobile ? "body2" : "subtitle2"}
                component="span"
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  flex: isMobile ? "1 1 auto" : "none"
                }}
              >
                Start New Call
              </Typography>
              <IconButton
                onClick={() => {
                  setOpenDialog(true);
                }}
                sx={{
                  flexShrink: 0,
                  p: isMobile ? 1 : 1.5
                }}
              >
                <Plus 
                  size={isMobile ? 18 : 20}
                  style={{ color: theme.palette.primary.main }} 
                />
              </IconButton>
            </Stack>
            <Divider />

            <Stack
              spacing={2}
              direction="column"
              sx={{
                flexGrow: 1,
                overflow: "hidden", // Changed from "scroll" to "hidden"
                height: "100%",
                position: "relative", // Add positioning context
              }}
            >
              <Scrollbar>
                <Stack spacing={3}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#676767", fontWeight: 600 }}
                  >
                    Recent Calls
                  </Typography>
                  <Stack spacing={1}>
                    {ChatList.filter((el) => el.pinned).map((el, index) => {
                      return (
                        <CallElement 
                          key={el.id} 
                          {...el} 
                          callType={index % 3 === 0 ? "missed" : index % 2 === 0 ? "incoming" : "outgoing"}
                          duration={index % 4 === 0 ? "Missed" : `${Math.floor(Math.random() * 10) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`}
                          isVideo={index % 3 === 0}
                        />
                      );
                    })}
                  </Stack>
                </Stack>
                <Stack spacing={3}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#676767", fontWeight: 600 }}
                  >
                    All Calls
                  </Typography>
                  <Stack spacing={1}>
                    {ChatList.filter((el) => !el.pinned).map((el, index) => {
                      return (
                        <CallElement 
                          key={el.id} 
                          {...el} 
                          callType={index % 3 === 0 ? "missed" : index % 2 === 0 ? "incoming" : "outgoing"}
                          duration={index % 4 === 0 ? "Missed" : `${Math.floor(Math.random() * 10) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`}
                          isVideo={index % 2 === 0}
                        />
                      );
                    })}
                  </Stack>
                </Stack>
              </Scrollbar>
            </Stack>
          </Stack>
        </Box>
        {/*  */}
        {/*  */}
        {/* Right */}
        {/* // TODO => Reuse conversation components */}
      </Stack>
      <StartCall open={openDialog} handleClose={handleCloseDialog} />
    </>
  );
};

export default Call;

