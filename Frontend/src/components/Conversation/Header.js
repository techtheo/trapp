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
  useMediaQuery,
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
import { SimpleBarStyle } from "../Scrollbar";
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
  try {
    const contacts = Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      name:
        faker.person?.fullName() ||
        faker.name?.fullName() ||
        `Contact ${index + 1}`,
      avatar: `https://i.pravatar.cc/150?img=${index + 1}`, // Use pravatar as backup
      lastSeen:
        faker.date?.recent()?.toLocaleDateString() ||
        new Date().toLocaleDateString(),
      isOnline: Math.random() > 0.5,
      phone:
        faker.phone?.number() ||
        `+1 234 567 89${String(index).padStart(2, "0")}`,
    }));
    console.log("Generated contacts:", contacts); // Debug log
    return contacts;
  } catch (error) {
    console.error("Error generating contacts with faker:", error);
    // Fallback static contacts
    return [
      {
        id: 1,
        name: "Alice Johnson",
        avatar: "https://i.pravatar.cc/150?img=1",
        lastSeen: "2024-01-15",
        isOnline: true,
        phone: "+1 234 567 8901",
      },
      {
        id: 2,
        name: "Bob Smith",
        avatar: "https://i.pravatar.cc/150?img=2",
        lastSeen: "2024-01-14",
        isOnline: false,
        phone: "+1 234 567 8902",
      },
      {
        id: 3,
        name: "Carol Davis",
        avatar: "https://i.pravatar.cc/150?img=3",
        lastSeen: "2024-01-16",
        isOnline: true,
        phone: "+1 234 567 8903",
      },
      {
        id: 4,
        name: "David Wilson",
        avatar: "https://i.pravatar.cc/150?img=4",
        lastSeen: "2024-01-13",
        isOnline: false,
        phone: "+1 234 567 8904",
      },
      {
        id: 5,
        name: "Emma Brown",
        avatar: "https://i.pravatar.cc/150?img=5",
        lastSeen: "2024-01-17",
        isOnline: true,
        phone: "+1 234 567 8905",
      },
      {
        id: 6,
        name: "Frank Miller",
        avatar: "https://i.pravatar.cc/150?img=6",
        lastSeen: "2024-01-12",
        isOnline: false,
        phone: "+1 234 567 8906",
      },
      {
        id: 7,
        name: "Grace Lee",
        avatar: "https://i.pravatar.cc/150?img=7",
        lastSeen: "2024-01-18",
        isOnline: true,
        phone: "+1 234 567 8907",
      },
      {
        id: 8,
        name: "Henry Taylor",
        avatar: "https://i.pravatar.cc/150?img=8",
        lastSeen: "2024-01-11",
        isOnline: false,
        phone: "+1 234 567 8908",
      },
      {
        id: 9,
        name: "Ivy Chen",
        avatar: "https://i.pravatar.cc/150?img=9",
        lastSeen: "2024-01-19",
        isOnline: true,
        phone: "+1 234 567 8909",
      },
      {
        id: 10,
        name: "Jack Anderson",
        avatar: "https://i.pravatar.cc/150?img=10",
        lastSeen: "2024-01-10",
        isOnline: false,
        phone: "+1 234 567 8910",
      },
      {
        id: 11,
        name: "Kate Martinez",
        avatar: "https://i.pravatar.cc/150?img=11",
        lastSeen: "2024-01-20",
        isOnline: true,
        phone: "+1 234 567 8911",
      },
      {
        id: 12,
        name: "Liam Garcia",
        avatar: "https://i.pravatar.cc/150?img=12",
        lastSeen: "2024-01-09",
        isOnline: false,
        phone: "+1 234 567 8912",
      },
      {
        id: 13,
        name: "Mia Rodriguez",
        avatar: "https://i.pravatar.cc/150?img=13",
        lastSeen: "2024-01-21",
        isOnline: true,
        phone: "+1 234 567 8913",
      },
      {
        id: 14,
        name: "Noah Thompson",
        avatar: "https://i.pravatar.cc/150?img=14",
        lastSeen: "2024-01-08",
        isOnline: false,
        phone: "+1 234 567 8914",
      },
      {
        id: 15,
        name: "Olivia White",
        avatar: "https://i.pravatar.cc/150?img=15",
        lastSeen: "2024-01-22",
        isOnline: true,
        phone: "+1 234 567 8915",
      },
    ];
  }
};

const ForwardMessagesDialog = ({
  open,
  handleClose,
  selectedCount,
  onForward,
}) => {
  const theme = useTheme();
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [contacts] = React.useState(() => {
    const generatedContacts = generateForwardContacts();
    console.log("Contacts in dialog:", generatedContacts);
    return generatedContacts;
  });

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
  );

  console.log("Filtered contacts:", filteredContacts);

  const handleContactToggle = (contact) => {
    const isSelected = selectedContacts.find((c) => c.id === contact.id);
    if (isSelected) {
      setSelectedContacts(selectedContacts.filter((c) => c.id !== contact.id));
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

      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Search Bar */}
        <Box
          p={2}
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            flexShrink: 0,
          }}
        >
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
          <Box
            p={2}
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              flexShrink: 0,
            }}
          >
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Selected ({selectedContacts.length})
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {selectedContacts.map((contact) => (
                <Chip
                  key={contact.id}
                  avatar={
                    <Avatar
                      src={contact.avatar}
                      sx={{ width: 24, height: 24 }}
                    />
                  }
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
        <Box
          sx={{
            flexGrow: 1,
            minHeight: 0, // Important for flex child to shrink
            overflow: "auto", // Use native scrolling for now
            maxHeight: "400px", // Add explicit max height
          }}
        >
          <List sx={{ padding: 0 }}>
            {filteredContacts.map((contact) => {
              const isSelected = selectedContacts.find(
                (c) => c.id === contact.id
              );
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
                      backgroundColor: isSelected
                        ? theme.palette.action.selected
                        : "transparent",
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
                          border: isSelected
                            ? `2px solid ${theme.palette.primary.main}`
                            : "none",
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          fontWeight={isSelected ? "bold" : "normal"}
                        >
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
        </Box>
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
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
            onClick={handleOpenForwardDialog}
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
        <ForwardMessagesDialog
          open={openForwardDialog}
          handleClose={handleCloseForwardDialog}
          selectedCount={messageSelection.selectedMessages.length}
          onForward={handleForwardMessages}
        />
      </>
    );
  }

  // Normal header
  return (
    <Box
      p={isMobile ? 1.5 : 2}
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
            <Typography 
              variant={isMobile ? "body2" : "subtitle2"}
              sx={{ fontWeight: 600 }}
            >
              {faker.person.fullName()}
            </Typography>
            <Typography variant="caption">Online</Typography>
          </Stack>
        </Stack>
        <Stack 
          direction="row" 
          alignItems={"center"} 
          spacing={isMobile ? 1 : 3}
        >
          {!isMobile && (
            <>
              <IconButton>
                <VideoCamera />
              </IconButton>
              <IconButton>
                <Phone />
              </IconButton>
            </>
          )}
          <IconButton>
            <MagnifyingGlass size={isMobile ? 18 : 20} />
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
            <CaretDown size={isMobile ? 16 : 20} />
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
