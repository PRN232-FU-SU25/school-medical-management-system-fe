import { UserInfo } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLogin: boolean;
  userInfo: any;
  role: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  userInfo: null,
  role: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
      // state.role = null;
      state.userInfo = null;
    },
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload;
    },
    setRole(state, action: PayloadAction<string>) {
      state.role = action.payload;
    }
  }
});

export const { login, logout, setUserInfo, setRole } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
