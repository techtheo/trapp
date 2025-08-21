import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";

// slices

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  version: 1,
  migrate: (state) => {
    // Handle migration for new chat state
    if (state && state.app && !state.app.chat) {
      return {
        ...state,
        app: {
          ...state.app,
          chat: {
            selectedChatId: 0,
            isTyping: false,
          },
        },
      };
    }
    return state;
  },
  // whitelist: [],
  // blacklist: [],
};

const rootReducer = combineReducers({
  app: appReducer,
});

export { rootPersistConfig, rootReducer };
