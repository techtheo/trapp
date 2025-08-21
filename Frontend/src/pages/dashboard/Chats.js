import {
  Box,
  IconButton,
  Stack,
  Typography,
  Button,
  Divider,
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
  return (
    <Box
      sx={{
        position: "relative",
        width: 320,
        minWidth: 320,
        maxWidth: 320,
        overflow: "hidden", // Prevent any content from expanding the container
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Typography variant="h5">Chats</Typography>
          <IconButton>
            <CircleDashed />
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
