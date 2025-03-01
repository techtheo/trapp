import { Box, Divider, IconButton, Link, Stack, Typography} from "@mui/material";
import React from "react";

import { Search, SearchIconWrapper, StyledInputBase } from "../../components/Search";
import { MagnifyingGlass, Plus } from "phosphor-react";
import {useTheme } from "@mui/material/styles";


const Group = () => {
  const theme =useTheme();
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            height: "100vh",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
            width: 320,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25",
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
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
                inputProps={{"aria-label": "search"}}
                />
              </Search>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="subtitle2" component={Link}>
                    Create New Group
                </Typography>
                <IconButton>
                  <Plus style={{color: theme.palette.primary.main}} />
                </IconButton>
            </Stack>
            <Divider /> 
          </Stack>
        </Box>
        {/* Right */}
      </Stack>
    </>
  );
};

export default Group;
