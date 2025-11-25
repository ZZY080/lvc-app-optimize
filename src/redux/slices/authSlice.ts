import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@type/common/User/User.types";
import { removeAccessToken, setAccessToken } from "@utils/auth/auth";

export interface AuthState {
  userInfo: any | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  userInfo: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<any>) {
      state.userInfo = action.payload;
      state.accessToken = action.payload.accessToken;
      setAccessToken(action.payload.accessToken);
    },
    logout(state) {
      state.userInfo = null;
      state.accessToken = null;
      removeAccessToken();
    },

    updateUserProfile(
      state,
      action: PayloadAction<Partial<UserProfile> | null>
    ) {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
    },
  },
});

export const { login, logout, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
