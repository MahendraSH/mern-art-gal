import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/app/features/user/auth-api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (gDM) => gDM().concat(authApi.middleware),
});
