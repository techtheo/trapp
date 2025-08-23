import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import Scrollbar from "../../components/Scrollbar";
import ChatElement from "../../components/ChatElement";
import { ChatList } from "../../data";
import CreateGroup from "../../sections/main/CreateGroup";

const Group = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left */}
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
            <Stack>
              <Typography variant="h5">Groups</Typography>
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
            >
              <Typography 
                variant="subtitle2" 
                component="span"
                sx={{ color: theme.palette.primary.main }}
              >
                Create New Group
              </Typography>
              <IconButton onClick={() => {
                setOpenDialog(true);
              }}>
                <Plus style={{ color: theme.palette.primary.main }} />
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
                    All Groups
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
        {/* Right */}
        {/* // TODO => Reuse conversation components */}
      </Stack>
      {openDialog && (
        <CreateGroup open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Group;