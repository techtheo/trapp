import {
  Box,
  IconButton,
  Stack,
  Typography,
  Button,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { ChatList } from "../../data";
import Scrollbar from "../../components/Scrollbar";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";

const Chats = () => {
  const theme = useTheme();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  return (
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
      <Stack p={isMobile ? 2 : 3} spacing={2} sx={{ height: "100vh" }}>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Typography 
            variant={isMobile ? "h6" : "h5"}
            sx={{ fontWeight: 600 }}
          >
            Chats
          </Typography>
          <IconButton sx={{ p: isMobile ? 1 : 1.5 }}>
            <CircleDashed size={isMobile ? 20 : 24} />
          </IconButton>
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search.."
              inputProps={{ "arial-label": "search" }}
            />
          </Search>
        </Stack>
        <Stack spacing={1}>
          <Stack direction="row" alignItems={"center"} spacing={1.5}>
            <ArchiveBox size={24} />
            <Button>Archive</Button>
          </Stack>
          <Divider />
        </Stack>
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
                Pinned
              </Typography>
              <Stack spacing={1}>
                {ChatList.filter((el) => el.pinned).map((el) => {
                  return <ChatElement key={el.id} {...el} />;
                })}
              </Stack>
            </Stack>
            <Stack spacing={3}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#676767", fontWeight: 600 }}
              >
                All Chats
              </Typography>
              <Stack spacing={1}>
                {ChatList.filter((el) => !el.pinned).map((el) => {
                  return <ChatElement key={el.id} {...el} />;
                })}
              </Stack>
            </Stack>
          </Scrollbar>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
