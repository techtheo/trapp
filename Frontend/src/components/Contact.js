import { faker } from "@faker-js/faker";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";
import React from "react";
import { useDispatch } from "react-redux";
import { ToggleSidebar, updateSidebarType } from "../redux/slices/app";
import AntSwitch from "./AntSwitch";
import { useState } from "react";
import Scrollbar from "./Scrollbar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"░B░l░o░c░k░ ░t░h░i░s░ ░c░o░n░t░a░c░t░!!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          𝒜𝓇𝑒 𝓎𝑜𝓊 𝓈𝓊𝓇𝑒 𝓎𝑜𝓊 𝓌𝒶𝓃𝓉 𝓉𝑜 𝒷𝓁𝑜𝒸𝓀 𝓉𝒽𝒾𝓈 𝒸𝑜𝓃𝓉𝒶𝒸𝓉?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>ℂ𝕒𝕟𝕔𝕖𝕝</Button>
        <Button onClick={handleClose}>ℙ𝕣𝕠𝕔𝕖𝕖𝕕</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"░D░e░l░e░t░e░ ░t░h░i░s░ ░c░h░a░t░"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          𝒜𝓇𝑒 𝓎𝑜𝓊 𝓈𝓊𝓇𝑒 𝓎𝑜𝓊 𝓌𝒶𝓃𝓉 𝓉𝑜 𝒹𝑒𝓁𝑒𝓉𝑒 𝓉𝒽𝒾𝓈 𝒸𝒽𝒶𝓉?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>ℂ𝕒𝕟𝕔𝕖𝕝</Button>
        <Button onClick={handleClose}>ℙ𝕣𝕠𝕔𝕖𝕖𝕕</Button>
      </DialogActions>
    </Dialog>
  );
};

const Contact = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
            spacing={3}
          >
            <Typography variant="subtitle2">Contact Info </Typography>
            <IconButton
              onClick={() => {
                dispatch(ToggleSidebar());
              }}
            >
              <X />
            </IconButton>
          </Stack>
        </Box>
        {/* Body */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflow: "hidden", // Changed from "scroll" to "hidden"
          }}
        >
          <Scrollbar>
            <Stack p={3} spacing={3}>
              <Stack alignItems={"center"} direction="row" spacing={3}>
                <Avatar
                  src="https://picsum.photos/128/128?random=20"
                  alt="Contact Avatar"
                  sx={{ height: 64, width: 64 }}
                />
                <Stack spacing={0.5}>
                  <Typography variant="article" fontWeight={600}>
                    {faker.person.fullName()}
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {"+234 91 3 498 3467"}
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="space-evenly"
              >
                <Stack spacing={1} alignItems={"center"}>
                  <IconButton>
                    <Phone />
                  </IconButton>
                  <Typography variant="overline">Voice</Typography>
                </Stack>
                <Stack spacing={1} alignItems={"center"}>
                  <IconButton>
                    <VideoCamera />
                  </IconButton>
                  <Typography variant="overline">Video</Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack spacing={0.5}>
                <Typography variant="article">About</Typography>
                <Typography variant="body2">
                  Hello Theo is creating this!!!
                </Typography>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant="subtitle2">Media, Links & Docs</Typography>
                <Button
                  onClick={() => {
                    dispatch(updateSidebarType("SHARED"));
                  }}
                  endIcon={<CaretRight />}
                >
                  401
                </Button>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                {[1, 2, 3].map((el) => (
                  <Box key={el}>
                    <img
                      src={`https://picsum.photos/150/100?random=${el + 20}`}
                      alt={`Media ${el}`}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ))}
              </Stack>
              <Divider />
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction="row" alignItems={"center"} spacing={2}>
                  <Star size={21} />
                  <Typography variant="subtitle2">Starred Messages</Typography>
                </Stack>
                <IconButton
                  onClick={() => {
                    dispatch(updateSidebarType("STARRED"));
                  }}
                >
                  <CaretRight />
                </IconButton>
              </Stack>
              <Divider />
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction="row" alignItems={"center"} spacing={2}>
                  <Bell size={21} />
                  <Typography variant="subtitle2">
                    Mute Notifications
                  </Typography>
                </Stack>
                <AntSwitch />
              </Stack>
              <Divider />
              <Typography>1 group in common</Typography>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Avatar
                  src="https://picsum.photos/64/64?random=25"
                  alt="Group Avatar"
                />
                <Stack spacing={0.5}>
                  <Typography variant="subtitle2">Theo Tech World</Typography>
                  <Typography variant="caption">
                    Tao, Habeeb, Basit, You
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button
                  onClick={() => {
                    setOpenBlock(true);
                  }}
                  startIcon={<Prohibit />}
                  fullWidth
                  variant="outlined"
                >
                  Block
                </Button>
                <Button
                  onClick={() => {
                    setOpenDelete(true);
                  }}
                  startIcon={<Trash />}
                  fullWidth
                  variant="outlined"
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Scrollbar>
        </Stack>
      </Stack>
      {openBlock && (
        <BlockDialog open={openBlock} handleClose={handleCloseBlock} />
      )}
      {openDelete && (
        <DeleteDialog open={openDelete} handleClose={handleCloseDelete} />
      )}
    </Box>
  );
};

export default Contact;
