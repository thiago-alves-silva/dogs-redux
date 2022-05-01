import { TOKEN_POST } from "../api";
import createAsyncSlice from "./helper/createAsyncSlice";
import getLocalStorage from "./helper/getLocalStorage";

const slice = createAsyncSlice({
  name: "token",
  initialState: {
    data: getLocalStorage("token", null),
  },
  reducers: {
    fetchSuccess(state, action) {
      state.loading = false;
      state.data = action.payload.token;
    },
  },
  fetchConfig: (user) => TOKEN_POST(user),
});

export const { reset: resetToken } = slice.actions;

export const fetchToken = slice.asyncAction;

export default slice.reducer;
