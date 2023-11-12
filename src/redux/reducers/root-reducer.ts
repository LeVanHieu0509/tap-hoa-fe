import { createSlice } from "@reduxjs/toolkit";

interface RootState {
  loading: any;
  initialized: boolean;
  accessToken?: string;
  headerHeight: number;
}
const initialState: RootState = {
  loading: {},
  initialized: false,
  accessToken: null,
  headerHeight: 91,
};

const rootSlice = createSlice({
  name: "root",
  initialState: initialState,
  reducers: {
    setLoading: (state, actions: { payload: { name: string; loading: boolean } }) => {
      const { name, loading } = actions.payload;
      const loadingState = state.loading;
      if (loading) {
        loadingState[name] = true;
      } else {
        delete loadingState[name];
      }
      state.loading = { ...loadingState };
    },
    setInitialized(state, actions) {
      state.initialized = actions.payload;
    },
    setAccessToken: (state, actions) => {
      state.accessToken = actions.payload;
    },
    setHeaderHeight: (state, actions) => {
      state.headerHeight = actions.payload;
    },
  },
});

export const rootAction = rootSlice.actions;

export default rootSlice.reducer;
