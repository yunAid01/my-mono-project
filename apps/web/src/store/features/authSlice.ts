import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
// 💡 모노레포의 @repo/types에서 타입을 가져옵니다!
import type { AuthenticatedUser } from '@repo/types';

// 1. 이 Slice가 관리할 상태(State)의 타입을 정의합니다.
interface AuthState {
  user: AuthenticatedUser | null; // 로그인한 유저 정보 (없으면 null)
  token: string | null; // JWT 토큰 (없으면 null)
}

// 2. 상태의 초기값을 정의합니다. (앱이 처음 로드될 땐 로그아웃 상태)
const initialState: AuthState = {
  user: null,
  token: null,
};

// 3. createSlice로 'auth' 구역을 만듭니다.
export const authSlice = createSlice({
  name: 'auth', // 이 구역의 이름
  initialState, // 이 구역의 초기 상태
  // 4. 리듀서(작업자)들을 정의합니다. (상태를 변경하는 로직)
  reducers: {
    /**
     * 'setCredentials' (로그인) 액션입니다.
     * 이 액션이 호출되면, 'action.payload'에 담겨온 유저와 토큰 정보를
     * state에 저장합니다.
     */
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthenticatedUser; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // (선택적) 토큰을 localStorage에도 저장하면 새로고침해도 유지됩니다.
      localStorage.setItem('token', action.payload.token);
    },

    /**
     * 'clearCredentials' (로그아웃) 액션입니다.
     * 이 액션이 호출되면, state를 초기값(null)으로 되돌립니다.
     */
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

// 5. 다른 컴포넌트에서 사용할 수 있도록 액션(작업 지시서)들을 export 합니다.
export const { setCredentials, clearCredentials } = authSlice.actions;

// 6. 스토어(store.ts)에서 등록할 수 있도록 리듀서(작업자)를 export 합니다.
export default authSlice.reducer;

// 7. (선택적) 다른 컴포넌트에서 상태를 쉽게 읽을 수 있도록 Selector를 export 합니다.
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
