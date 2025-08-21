import React from "react";
import {
  Divider,
  Stack,
  Typography,
  Box,
  Link,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { SelectMessage } from "../../redux/slices/app";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import { Message_options } from "../../data";

const DocMsg = ({ el, menu }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { messageSelection } = useSelector((store) => store.app);

  const isSelected = messageSelection.selectedMessages.includes(el.id);
  const isSelectionMode = messageSelection.isSelectionMode;

  const handleMessageClick = () => {
    if (isSelectionMode) {
      dispatch(SelectMessage(el.id));
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent={el.incoming ? "start" : "end"}
      alignItems="center"
    >
      {isSelectionMode && (
        <Checkbox
          checked={isSelected}
          onChange={handleMessageClick}
          sx={{
            mr: 1,
            color: theme.palette.primary.main,
            "&.Mui-checked": {
              color: theme.palette.primary.main,
            },
          }}
        />
      )}
      <Box
        p={1.5}
        onClick={handleMessageClick}
        sx={{
          background: el.incoming
            ? theme.palette.background.default
            : `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.9
              )} 0%, ${alpha(theme.palette.primary.main, 0.95)} 100%)`,
          borderRadius: 1.5,
          width: "max-content",
          maxWidth: "65%",
          border: isSelected
            ? `2px solid ${theme.palette.primary.main}`
            : el.incoming
            ? "none"
            : `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          boxShadow: isSelected
            ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
            : el.incoming
            ? "none"
            : `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
          position: "relative",
          transition: "all 0.3s ease",
          cursor: isSelectionMode ? "pointer" : "default",
          "&:hover": el.incoming
            ? isSelectionMode
              ? {
                  backgroundColor: alpha(theme.palette.action.hover, 0.1),
                }
              : {}
            : {
                transform: "translateY(-1px)",
                boxShadow: `0 6px 20px ${alpha(
                  theme.palette.primary.main,
                  0.25
                )}`,
              },
          "&::before": el.incoming
            ? {}
            : {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, ${alpha(
                  theme.palette.primary.light,
                  0.1
                )} 0%, transparent 100%)`,
                borderRadius: 1.5,
                pointerEvents: "none",
              },
        }}
      >
        <Stack spacing={2} sx={{ position: "relative", zIndex: 1 }}>
          <Stack
            spacing={2}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
              overflow: "hidden",
              border: `1px solid ${theme.palette.divider}`,
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: theme.shadows[2],
                transform: "translateY(-1px)",
              },
            }}
          >
            {/* Document Header */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              p={2}
              sx={{
                backgroundColor:
                  theme.palette.mode === "light"
                    ? theme.palette.grey[50]
                    : theme.palette.grey[900],
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 1,
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image size={24} />
              </Box>
              <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {el.fileName || "Abstract.png"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {el.fileSize || "2.3 MB"} • {el.fileType || "PNG Image"}
                </Typography>
              </Stack>
              <IconButton
                size="small"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              >
                <DownloadSimple size={18} />
              </IconButton>
            </Stack>

            {/* Document Preview/Description */}
            <Stack spacing={1} p={2} pt={0}>
              <Typography variant="body2" color="text.secondary">
                Click to download or preview this document
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "success.main",
                  }}
                />
                <Typography variant="caption" color="success.main">
                  Safe to download
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {el.message && (
            <Typography
              variant="body2"
              color={el.incoming ? theme.palette.text : "#fff"}
              sx={{ fontWeight: el.incoming ? 400 : 500 }}
            >
              {el.message}
            </Typography>
          )}
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
};

const LinkMsg = ({ el, menu }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { messageSelection } = useSelector((store) => store.app);

  const isSelected = messageSelection.selectedMessages.includes(el.id);
  const isSelectionMode = messageSelection.isSelectionMode;

  const handleMessageClick = () => {
    if (isSelectionMode) {
      dispatch(SelectMessage(el.id));
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent={el.incoming ? "start" : "end"}
      alignItems="center"
    >
      {isSelectionMode && (
        <Checkbox
          checked={isSelected}
          onChange={handleMessageClick}
          sx={{
            mr: 1,
            color: theme.palette.primary.main,
            "&.Mui-checked": {
              color: theme.palette.primary.main,
            },
          }}
        />
      )}
      <Box
        p={1.5}
        onClick={handleMessageClick}
        sx={{
          background: el.incoming
            ? theme.palette.background.default
            : `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.9
              )} 0%, ${alpha(theme.palette.primary.main, 0.95)} 100%)`,
          borderRadius: 1.5,
          width: "max-content",
          maxWidth: "65%",
          border: isSelected
            ? `2px solid ${theme.palette.primary.main}`
            : el.incoming
            ? "none"
            : `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          boxShadow: isSelected
            ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
            : el.incoming
            ? "none"
            : `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
          position: "relative",
          transition: "all 0.3s ease",
          cursor: isSelectionMode ? "pointer" : "default",
          "&:hover": el.incoming
            ? isSelectionMode
              ? {
                  backgroundColor: alpha(theme.palette.action.hover, 0.1),
                }
              : {}
            : {
                transform: "translateY(-1px)",
                boxShadow: `0 6px 20px ${alpha(
                  theme.palette.primary.main,
                  0.25
                )}`,
              },
          "&::before": el.incoming
            ? {}
            : {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, ${alpha(
                  theme.palette.primary.light,
                  0.1
                )} 0%, transparent 100%)`,
                borderRadius: 1.5,
                pointerEvents: "none",
              },
        }}
      >
        <Stack spacing={2} sx={{ position: "relative", zIndex: 1 }}>
          <Stack
            spacing={2}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <img
              src={el.preview}
              alt="Link preview"
              style={{
                width: "100%",
                maxHeight: 200,
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <Stack spacing={1} p={2}>
              <Typography variant="subtitle2" fontWeight={600}>
                Link Preview
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.main }}
                component={Link}
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.youtube.com
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Click to open link
              </Typography>
            </Stack>
          </Stack>
          {el.message && (
            <Typography
              variant="body2"
              color={el.incoming ? theme.palette.text : "#fff"}
              sx={{ fontWeight: el.incoming ? 400 : 500 }}
            >
              {el.message}
            </Typography>
          )}
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
};

const ReplyMsg = ({ el, menu }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { messageSelection } = useSelector((store) => store.app);

  const isSelected = messageSelection.selectedMessages.includes(el.id);
  const isSelectionMode = messageSelection.isSelectionMode;

  const handleMessageClick = () => {
    if (isSelectionMode) {
      dispatch(SelectMessage(el.id));
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent={el.incoming ? "start" : "end"}
      alignItems="center"
    >
      {isSelectionMode && (
        <Checkbox
          checked={isSelected}
          onChange={handleMessageClick}
          sx={{
            mr: 1,
            color: theme.palette.primary.main,
            "&.Mui-checked": {
              color: theme.palette.primary.main,
            },
          }}
        />
      )}
      <Box
        p={1.5}
        onClick={handleMessageClick}
        sx={{
          background: el.incoming
            ? theme.palette.background.default
            : `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.9
              )} 0%, ${alpha(theme.palette.primary.main, 0.95)} 100%)`,
          borderRadius: 1.5,
          width: "max-content",
          border: isSelected
            ? `2px solid ${theme.palette.primary.main}`
            : el.incoming
            ? "none"
            : `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          boxShadow: isSelected
            ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
            : el.incoming
            ? "none"
            : `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
          position: "relative",
          transition: "all 0.3s ease",
          cursor: isSelectionMode ? "pointer" : "default",
          "&:hover": el.incoming
            ? isSelectionMode
              ? {
                  backgroundColor: alpha(theme.palette.action.hover, 0.1),
                }
              : {}
            : {
                transform: "translateY(-1px)",
                boxShadow: `0 6px 20px ${alpha(
                  theme.palette.primary.main,
                  0.25
                )}`,
              },
          "&::before": el.incoming
            ? {}
            : {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, ${alpha(
                  theme.palette.primary.light,
                  0.1
                )} 0%, transparent 100%)`,
                borderRadius: 1.5,
                pointerEvents: "none",
              },
        }}
      >
        <Stack spacing={2} sx={{ position: "relative", zIndex: 1 }}>
          <Stack
            p={2}
            direction="column"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color={theme.palette.text}>
              {el.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
            sx={{ fontWeight: el.incoming ? 400 : 500 }}
          >
            {el.reply}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
};

const MediaMsg = ({ el, menu }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { messageSelection } = useSelector((store) => store.app);

  const isSelected = messageSelection.selectedMessages.includes(el.id);
  const isSelectionMode = messageSelection.isSelectionMode;

  const handleMessageClick = () => {
    if (isSelectionMode) {
      dispatch(SelectMessage(el.id));
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent={el.incoming ? "start" : "end"}
      alignItems="center"
    >
      {isSelectionMode && (
        <Checkbox
          checked={isSelected}
          onChange={handleMessageClick}
          sx={{
            mr: 1,
            color: theme.palette.primary.main,
            "&.Mui-checked": {
              color: theme.palette.primary.main,
            },
          }}
        />
      )}
      <Box
        p={1.5}
        onClick={handleMessageClick}
        sx={{
          background: el.incoming
            ? theme.palette.background.default
            : `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.9
              )} 0%, ${alpha(theme.palette.primary.main, 0.95)} 100%)`,
          borderRadius: 1.5,
          width: "max-content",
          border: isSelected
            ? `2px solid ${theme.palette.primary.main}`
            : el.incoming
            ? "none"
            : `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          boxShadow: isSelected
            ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
            : el.incoming
            ? "none"
            : `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
          position: "relative",
          transition: "all 0.3s ease",
          cursor: isSelectionMode ? "pointer" : "default",
          "&:hover": el.incoming
            ? isSelectionMode
              ? {
                  backgroundColor: alpha(theme.palette.action.hover, 0.1),
                }
              : {}
            : {
                transform: "translateY(-1px)",
                boxShadow: `0 6px 20px ${alpha(
                  theme.palette.primary.main,
                  0.25
                )}`,
              },
          "&::before": el.incoming
            ? {}
            : {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, ${alpha(
                  theme.palette.primary.light,
                  0.1
                )} 0%, transparent 100%)`,
                borderRadius: 1.5,
                pointerEvents: "none",
              },
        }}
      >
        <Stack spacing={1} sx={{ position: "relative", zIndex: 1 }}>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
            sx={{ fontWeight: el.incoming ? 400 : 500 }}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
};

const TextMsg = ({ el, menu }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { messageSelection } = useSelector((store) => store.app);

  const isSelected = messageSelection.selectedMessages.includes(el.id);
  const isSelectionMode = messageSelection.isSelectionMode;

  const handleMessageClick = () => {
    if (isSelectionMode) {
      dispatch(SelectMessage(el.id));
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent={el.incoming ? "start" : "end"}
      alignItems="center"
    >
      {isSelectionMode && (
        <Checkbox
          checked={isSelected}
          onChange={handleMessageClick}
          sx={{
            mr: 1,
            color: theme.palette.primary.main,
            "&.Mui-checked": {
              color: theme.palette.primary.main,
            },
          }}
        />
      )}
      <Box
        p={1.5}
        onClick={handleMessageClick}
        sx={{
          background: el.incoming
            ? theme.palette.background.default
            : `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.9
              )} 0%, ${alpha(theme.palette.primary.main, 0.95)} 100%)`,
          borderRadius: 1.5,
          width: "max-content",
          border: isSelected
            ? `2px solid ${theme.palette.primary.main}`
            : el.incoming
            ? "none"
            : `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          boxShadow: isSelected
            ? `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`
            : el.incoming
            ? "none"
            : `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
          position: "relative",
          transition: "all 0.3s ease",
          cursor: isSelectionMode ? "pointer" : "default",
          "&:hover": el.incoming
            ? isSelectionMode
              ? {
                  backgroundColor: alpha(theme.palette.action.hover, 0.1),
                }
              : {}
            : {
                transform: "translateY(-1px)",
                boxShadow: `0 6px 20px ${alpha(
                  theme.palette.primary.main,
                  0.25
                )}`,
              },
          "&::before": el.incoming
            ? {}
            : {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, ${alpha(
                  theme.palette.primary.light,
                  0.1
                )} 0%, transparent 100%)`,
                borderRadius: 1.5,
                pointerEvents: "none",
              },
        }}
      >
        <Typography
          variant="body2"
          color={el.incoming ? theme.palette.text : "#fff"}
          sx={{
            position: "relative",
            zIndex: 1,
            fontWeight: el.incoming ? 400 : 500,
          }}
        >
          {el.message}
        </Typography>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  );
};

const Timeline = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Divider width="46%" />
      <Typography variant="caption" sx={{ color: theme.palette.text }}>
        {el.text}
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};

const MessageOptions = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <DotsThreeVertical
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        nppm
        size={20}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((el) => (
            <MenuItem onClick={handleClick}>{el.title}</MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

export {
  Timeline,
  TextMsg,
  MediaMsg,
  ReplyMsg,
  LinkMsg,
  DocMsg,
  MessageOptions,
};
