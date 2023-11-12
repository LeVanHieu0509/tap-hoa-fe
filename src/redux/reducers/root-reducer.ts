import { LoadingKey } from "@custom-types/loading";
import { createSlice } from "@reduxjs/toolkit";
import { isBoolean, pickBy } from "lodash";

interface RootState {
  loading: LoadingKey;
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
    setLoading: (state, actions: { type: string; payload: LoadingKey }) => {
      const payload = actions.payload;
      if (isBoolean(actions.payload)) {
        state.loading = {
          ...state.loading,
          ...payload,
        };
      } else {
        state.loading = pickBy({ ...state.loading, ...actions.payload }, (value) => value) as LoadingKey;
      }
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
