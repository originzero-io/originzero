/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-undef */

import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "persist-key",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ? if you want to persistance, change rootReducer to persistedReducer in reducer property
export default function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: import.meta.env.VITE_HOST_ENV === "development",
  });

  // if (import.meta.env.VITE_HOST_ENV !== "production" && module.hot) {
  //   module.hot.accept("./rootReducer", () => store.replaceReducer(rootReducer));
  // }

  return store;
}
