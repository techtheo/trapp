import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Stack,
  Typography,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const list = [
  {
    key: 0,
    title: "Mark as unread",
    combination: ["Ctrl", "alt", "Shift", "U"],
  },
  {
    key: 1,
    title: "Mute",
    combination: ["Ctrl", "alt", "Shift", "M"],
  },
  {
    key: 2,
    title: "Archive Chat",
    combination: ["Ctrl", "alt", "Shift", "E"],
  },
  {
    key: 3,
    title: "Delete Chat",
    combination: ["Ctrl", "alt", "Shift", "D"],
  },
  {
    key: 4,
    title: "Pin Chat",
    combination: ["Ctrl", "alt", "Shift", "P"],
  },
  {
    key: 5,
    title: "Search",
    combination: ["Ctrl", "alt", "F"],
  },
  {
    key: 6,
    title: "Search Chat",
    combination: ["Ctrl", "alt", "Shift", "F"],
  },
  {
    key: 7,
    title: "Next Chat",
    combination: ["Ctrl", "alt", "N"],
  },
  {
    key: 8,
    title: "Next Step",
    combination: ["Ctrl", "Tab"],
  },
  {
    key: 9,
    title: "Previous Step",
    combination: ["Ctrl", "Shift", "Tab"],
  },
  {
    key: 10,
    title: "New Group",
    combination: ["Ctrl", "alt", "Shift", "N"],
  },
  {
    key: 11,
    title: "Profile & About",
    combination: ["Ctrl", "alt", "P"],
  },
  {
    key: 12,
    title: "Increase speed of voice message",
    combination: ["Shift", "."],
  },
  {
    key: 13,
    title: "Decrease speed of voice message",
    combination: ["Shift", ","],
  },
  {
    key: 14,
    title: "Settings",
    combination: ["Shift", "S"],
  },
  {
    key: 15,
    title: "Emoji Panel",
    combination: ["Ctrl", "alt", "E"],
  },
  {
    key: 16,
    title: "Sticker Panel",
    combination: ["Ctrl", "alt", "S"],
  },
];

const Shortcuts = ({ open, handleClose }) => {
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        keepMounted
        TransitionComponent={Transition}
        sx={{ p: 4 }}
      >
        <DialogTitle> TRAPP Shortcuts</DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {list.map(({ key, title, combination }) => (
              <Grid key={key} container item xs={6}>
                <Stack
                  sx={{ width: "100%" }}
                  justifyContent="space-between"
                  spacing={3}
                  direction="row"
                  alignItems={"center"}
                >
                  <Typography variant="caption" sx={{ fontSize: 14 }}>
                    {title}
                  </Typography>
                  <Stack spacing={2} direction="row">
                    {combination.map((el) => {
                      return (
                        <Button
                          disabled
                          variant="contained"
                          sx={{ color: "#212121" }}
                        >
                          {el}
                        </Button>
                      );
                    })}
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Shortcuts;
