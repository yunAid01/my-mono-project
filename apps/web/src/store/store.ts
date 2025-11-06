// apps/web/src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
// (곧 만들) authSlice를 가져옵니다.
// import authReducer from './features/authSlice';

export const rootStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
