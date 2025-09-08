import { createSlice } from "@reduxjs/toolkit";

//
// import { dispatch } from "../store";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED, SHARED
  },
  chat: {
    selectedChatId: 0, // Default to first chat
    isTyping: false,
  },
  messageSelection: {
    isSelectionMode: false,
    selectedMessages: [], // Array of selected message IDs
  },
  snackbar: {
    open: false,
    severity: null,
    message: null,
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Toggle sidebar
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    // Chat selection
    selectChat(state, action) {
      state.chat.selectedChatId = action.payload.chatId;
    },
    clearChatSelection(state) {
      state.chat.selectedChatId = null;
    },
    setTypingStatus(state, action) {
      state.chat.isTyping = action.payload.isTyping;
    },
    // Message selection
    toggleSelectionMode(state) {
      state.messageSelection.isSelectionMode =
        !state.messageSelection.isSelectionMode;
      if (!state.messageSelection.isSelectionMode) {
        state.messageSelection.selectedMessages = [];
      }
    },
    selectMessage(state, action) {
      const messageId = action.payload.messageId;
      const index = state.messageSelection.selectedMessages.indexOf(messageId);
      if (index > -1) {
        state.messageSelection.selectedMessages.splice(index, 1);
      } else {
        state.messageSelection.selectedMessages.push(messageId);
      }
    },
    clearMessageSelection(state) {
      state.messageSelection.selectedMessages = [];
      state.messageSelection.isSelectionMode = false;
    },
    selectAllMessages(state, action) {
      state.messageSelection.selectedMessages = action.payload.messageIds;
    },
    deleteSelectedMessages(state, action) {
      // Remove deleted message IDs from selection
      const deletedIds = action.payload.messageIds;
      state.messageSelection.selectedMessages =
        state.messageSelection.selectedMessages.filter(
          (id) => !deletedIds.includes(id)
        );
      // Exit selection mode if no messages left selected
      if (state.messageSelection.selectedMessages.length === 0) {
        state.messageSelection.isSelectionMode = false;
      }
    },
    // Snackbar
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackbar(state) {
      state.snackbar.open = false;
      state.snackbar.severity = null;
      state.snackbar.message = null;
    },
  },
});

// Reducer
export default slice.reducer;

//
export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function updateSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateSidebarType({
        type,
      })
    );
  };
}

export function SelectChat(chatId) {
  return async () => {
    dispatch(
      slice.actions.selectChat({
        chatId,
      })
    );
  };
}

export function ClearChatSelection() {
  return async () => {
    dispatch(slice.actions.clearChatSelection());
  };
}

export function SetTypingStatus(isTyping) {
  return async () => {
    dispatch(
      slice.actions.setTypingStatus({
        isTyping,
      })
    );
  };
}

export function ToggleSelectionMode() {
  return async () => {
    dispatch(slice.actions.toggleSelectionMode());
  };
}

export function SelectMessage(messageId) {
  return async () => {
    dispatch(
      slice.actions.selectMessage({
        messageId,
      })
    );
  };
}

export function ClearMessageSelection() {
  return async () => {
    dispatch(slice.actions.clearMessageSelection());
  };
}

export function SelectAllMessages(messageIds) {
  return async () => {
    dispatch(
      slice.actions.selectAllMessages({
        messageIds,
      })
    );
  };
}

export function DeleteSelectedMessages(messageIds) {
  return async () => {
    dispatch(
      slice.actions.deleteSelectedMessages({
        messageIds,
      })
    );
  };
}

export function showSnackbar({ severity, message }) {
  return async (dispatch) => {
    // Validate parameters to prevent MUI capitalize error
    const validSeverities = ['error', 'warning', 'info', 'success'];
    const validSeverity = validSeverities.includes(severity) ? severity : 'error';
    const validMessage = typeof message === 'string' && message.trim() ? message : 'An error occurred';
    
    dispatch(
      slice.actions.openSnackbar({
        severity: validSeverity,
        message: validMessage,
      })
    );
  };
}

export function closeSnackbar() {
  return async (dispatch) => {
    dispatch(slice.actions.closeSnackbar());
  };
}
