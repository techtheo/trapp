import React from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Checkbox,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  CaretDown,
  MagnifyingGlass,
  Phone,
  VideoCamera,
  X,
  ArrowLeft,
  Trash,
  Share,
  Star,
  Copy,
  PaperPlaneTilt,
} from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import StyledBadge from "../StyledBadge";
import { faker } from "@faker-js/faker";
import {
  ToggleSidebar,
  updateSidebarType,
  ToggleSelectionMode,
  ClearMessageSelection,
  DeleteSelectedMessages,
} from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteMessagesDialog = ({
  open,
  handleClose,
  selectedCount,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {"░D░e░l░e░t░e░ ░S░e░l░e░c░t░e░d░ ░M░e░s░s░a░g░e░s░"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          𝒜𝓇𝑒 𝓎𝑜𝓊 𝓈𝓊𝓇𝑒 𝓎𝑜𝓊 𝓌𝒶𝓃𝓉 𝓉𝑜 𝒹𝑒𝓁𝑒𝓉𝑒 {selectedCount}
          {selectedCount === 1 ? " 𝓂𝑒𝓈𝓈𝒶𝑔𝑒" : " 𝓂𝑒𝓈𝓈𝒶𝑔𝑒𝓈"}? 𝒯𝒽𝒾𝓈 𝒶𝒸𝓉𝒾𝑜𝓃 𝒸𝒶𝓃𝓃𝑜𝓉
          𝒷𝑒 𝓊𝓃𝒹𝑜𝓃𝑒.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          ℂ𝕒𝕟𝕔𝕖𝕝
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          ℙ𝕣𝕠𝕔𝕖𝕖𝕕
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Generate dummy contacts for forwarding
const generateForwardContacts = () => {
  return Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    lastSeen: faker.date.recent().toLocaleDateString(),
    isOnline: Math.random() > 0.5,
    phone: faker.phone.number(),
  }));
};

const ForwardMessagesDialog = ({ open, handleClose, selectedCount, onForward }) => {
  const theme = useTheme();
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [contacts] = React.useState(generateForwardContacts());

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const handleContactToggle = (contact) => {
    const isSelected = selectedContacts.find(c => c.id === contact.id);
    if (isSelected) {
      setSelectedContacts(selectedContacts.filter(c => c.id !== contact.id));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleForward = () => {
    onForward(selectedContacts);
    setSelectedContacts([]);
    setSearchQuery("");
  };

  const handleDialogClose = () => {
    setSelectedContacts([]);
    setSearchQuery("");
    handleClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDialogClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
          minHeight: "70vh",
          maxHeight: "80vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
          textAlign: "center",
          py: 3,
        }}
      >
        <Stack spacing={1} alignItems="center">
          <PaperPlaneTilt size={32} weight="duotone" />
          <Typography variant="h6" fontWeight="bold">
            ░F░o░r░w░a░r░d░ ░M░e░s░s░a░g░e░s░
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            𝒮𝑒𝓁𝑒𝒸𝓉 𝒸𝑜𝓃𝓉𝒶𝒸𝓉𝓈 𝓉𝑜 𝒻𝑜𝓇𝓌𝒶𝓇𝒹 {selectedCount}
            {selectedCount === 1 ? " 𝓂𝑒𝓈𝓈𝒶𝑔𝑒" : " 𝓂𝑒𝓈𝓈𝒶𝑔𝑒𝓈"}
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Search Bar */}
        <Box p={2} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
          <TextField
            fullWidth
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlass size={20} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: theme.palette.background.default,
              },
            }}
          />
        </Box>

        {/* Selected Contacts Chips */}
        {selectedContacts.length > 0 && (
          <Box p={2} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Selected ({selectedContacts.length})
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {selectedContacts.map((contact) => (
                <Chip
                  key={contact.id}
                  avatar={<Avatar src={contact.avatar} sx={{ width: 24, height: 24 }} />}
                  label={contact.name}
                  onDelete={() => handleContactToggle(contact)}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Contacts List */}
        <List sx={{ maxHeight: "40vh", overflow: "auto" }}>
          {filteredContacts.map((contact) => {
            const isSelected = selectedContacts.find(c => c.id === contact.id);
            return (
              <ListItem key={contact.id} disablePadding>
                <ListItemButton
                  onClick={() => handleContactToggle(contact)}
                  sx={{
                    py: 1.5,
                    px: 2,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                    backgroundColor: isSelected ? theme.palette.action.selected : "transparent",
                  }}
                >
                  <Checkbox
                    checked={!!isSelected}
                    sx={{ mr: 1 }}
                    color="primary"
                  />
                  <ListItemAvatar>
                    <Avatar
                      src={contact.avatar}
                      sx={{
                        border: isSelected ? `2px solid ${theme.palette.primary.main}` : "none",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight={isSelected ? "bold" : "normal"}>
                        {contact.name}
                      </Typography>
                    }
                    secondary={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="caption" color="text.secondary">
                          {contact.phone}
                        </Typography>
                        {contact.isOnline && (
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: "#44b700",
                            }}
                          />
                        )}
                      </Stack>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          background: theme.palette.background.default,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Button onClick={handleDialogClose} color="inherit">
          ℂ𝕒𝕟𝕔𝕖𝕝
        </Button>
        <Button
          onClick={handleForward}
          variant="contained"
          disabled={selectedContacts.length === 0}
          startIcon={<PaperPlaneTilt />}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            "&:hover": {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            },
          }}
        >
          ℱ𝑜𝓇𝓌𝒶𝓇𝒹 ({selectedContacts.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ConversationMenuOptions = [
  {
    title: "Contact info",
    action: "contact_info",
  },
  {
    title: "Select messages",
    action: "select_messages",
  },
  {
    title: "Mute notifications",
    action: "mute_notifications",
  },
  {
    title: "Disappearing messages",
    action: "disappearing_messages",
  },
  {
    title: "Clear chat",
    action: "clear_chat",
  },
  {
    title: "Export chat",
    action: "export_chat",
  },
  {
    title: "Block",
    action: "block",
  },
  {
    title: "Report",
    action: "report",
  },
  {
    title: "Delete chat",
    action: "delete_chat",
  },
];

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { sidebar, messageSelection } = useSelector((store) => store.app);

  const [conversationMenuAnchorEl, setConversationMenuAnchorEl] =
    React.useState(null);
  const openConversationMenu = Boolean(conversationMenuAnchorEl);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openForwardDialog, setOpenForwardDialog] = React.useState(false);

  const handleClickConversationMenu = (event) => {
    setConversationMenuAnchorEl(event.currentTarget);
  };

  const handleCloseConversationMenu = () => {
    setConversationMenuAnchorEl(null);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    // Delete the selected messages
    dispatch(DeleteSelectedMessages(messageSelection.selectedMessages));
    setOpenDeleteDialog(false);
    // Note: In a real app, you would also make an API call to delete messages from the server
    console.log("Deleted messages:", messageSelection.selectedMessages);
  };

  const handleOpenForwardDialog = () => {
    setOpenForwardDialog(true);
  };

  const handleCloseForwardDialog = () => {
    setOpenForwardDialog(false);
  };

  const handleForwardMessages = (selectedContacts) => {
    console.log("Forwarding messages to:", selectedContacts);
    console.log("Messages to forward:", messageSelection.selectedMessages);
    // Note: In a real app, you would make an API call to forward messages
    setOpenForwardDialog(false);
  };

  const handleMenuItemClick = (action) => {
    switch (action) {
      case "contact_info":
        // Open contact info sidebar
        if (!sidebar.open || sidebar.type !== "CONTACT") {
          dispatch(updateSidebarType("CONTACT"));
          if (!sidebar.open) {
            dispatch(ToggleSidebar());
          }
        }
        break;
      case "select_messages":
        dispatch(ToggleSelectionMode());
        break;
      case "mute_notifications":
        console.log("Mute notifications clicked");
        break;
      case "disappearing_messages":
        console.log("Disappearing messages clicked");
        break;
      case "clear_chat":
        console.log("Clear chat clicked");
        break;
      case "export_chat":
        console.log("Export chat clicked");
        break;
      case "block":
        console.log("Block clicked");
        break;
      case "report":
        console.log("Report clicked");
        break;
      case "delete_chat":
        console.log("Delete chat clicked");
        break;
      default:
        break;
    }
    handleCloseConversationMenu();
  };

  // Selection Header Component
  const SelectionHeader = () => (
    <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25",
      }}
    >
      <Stack
        alignItems={"center"}
        direction="row"
        justifyContent={"space-between"}
        sx={{ width: "100%", height: "100%" }}
      >
        <Stack direction={"row"} spacing={2} alignItems="center">
          <IconButton
            onClick={() => dispatch(ClearMessageSelection())}
            sx={{ color: theme.palette.text.primary }}
          >
            <ArrowLeft />
          </IconButton>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            {messageSelection.selectedMessages.length} selected
          </Typography>
        </Stack>
        <Stack direction="row" alignItems={"center"} spacing={2}>
          <IconButton
            disabled={messageSelection.selectedMessages.length === 0}
            sx={{
              color:
                messageSelection.selectedMessages.length === 0
                  ? theme.palette.action.disabled
                  : theme.palette.text.primary,
            }}
          >
            <Star />
          </IconButton>
          <IconButton
            disabled={messageSelection.selectedMessages.length === 0}
            sx={{
              color:
                messageSelection.selectedMessages.length === 0
                  ? theme.palette.action.disabled
                  : theme.palette.text.primary,
            }}
          >
            <Copy />
          </IconButton>
          <IconButton
            disabled={messageSelection.selectedMessages.length === 0}
            sx={{
              color:
                messageSelection.selectedMessages.length === 0
                  ? theme.palette.action.disabled
                  : theme.palette.text.primary,
            }}
          >
            <Share />
          </IconButton>
          <IconButton
            disabled={messageSelection.selectedMessages.length === 0}
            onClick={handleOpenDeleteDialog}
            sx={{
              color:
                messageSelection.selectedMessages.length === 0
                  ? theme.palette.action.disabled
                  : theme.palette.text.primary,
            }}
          >
            <Trash />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );

  // If in selection mode, show selection header
  if (messageSelection.isSelectionMode) {
    return (
      <>
        <SelectionHeader />
        <DeleteMessagesDialog
          open={openDeleteDialog}
          handleClose={handleCloseDeleteDialog}
          selectedCount={messageSelection.selectedMessages.length}
          onConfirm={handleConfirmDelete}
        />
      </>
    );
  }

  // Normal header
  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25",
      }}
    >
      <Stack
        alignItems={"center"}
        direction="row"
        justifyContent={"space-between"}
        sx={{ width: "100%", height: "100%" }}
      >
        <Stack
          onClick={() => {
            //
            dispatch(ToggleSidebar());
          }}
          direction={"row"}
          spacing={2}
        >
          <Box>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar
                alt={faker.person.fullName()}
                src={faker.image.avatar()}
              />
            </StyledBadge>
          </Box>
          <Stack spacing={0.2}>
            <Typography variant="subtitle2">
              {faker.person.fullName()}
            </Typography>
            <Typography variant="caption">Online</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems={"center"} spacing={3}>
          <IconButton>
            <VideoCamera />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
          <IconButton>
            <MagnifyingGlass />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton
            id="conversation-positioned-button"
            aria-controls={
              openConversationMenu ? "conversation-positioned-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={openConversationMenu ? "true" : undefined}
            onClick={handleClickConversationMenu}
          >
            <CaretDown />
          </IconButton>
          <Menu
            MenuListProps={{
              "aria-labelledby": "conversation-positioned-button",
            }}
            TransitionComponent={Fade}
            id="conversation-positioned-menu"
            aria-labelledby="conversation-positioned-button"
            anchorEl={conversationMenuAnchorEl}
            open={openConversationMenu}
            onClose={handleCloseConversationMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box p={1}>
              <Stack spacing={1}>
                {ConversationMenuOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleMenuItemClick(option.action)}
                    sx={{
                      minWidth: 200,
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <Typography variant="body2">{option.title}</Typography>
                  </MenuItem>
                ))}
              </Stack>
            </Box>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
