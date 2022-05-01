import { TOKEN_VALIDATE_POST, USER_GET } from "../api";
import createAsyncSlice from "./helper/createAsyncSlice";
import { fetchToken, resetToken } from "./token";

const slice = createAsyncSlice({
  name: "user",
  fetchConfig: (token) => USER_GET(token),
});

const { reset: resetUser } = slice.actions;

export const userLogin = (user) => async (dispatch) => {
  const { payload } = await dispatch(fetchToken(user));
  if (payload.token) {
    window.localStorage.setItem("token", JSON.stringify(payload.token));
    await dispatch(fetchUser(payload.token));
  }
};

export const userLogout = () => (dispatch) => {
  window.localStorage.removeItem("token");
  dispatch(resetToken());
  dispatch(resetUser());
};

export const userAutoLogin = () => async (dispatch, getState) => {
  const token = getState().token.data;
  if (token) {
    try {
      const { url, options } = TOKEN_VALIDATE_POST(token);
      const response = await fetch(url, options);

      if (response.ok) {
        const { data } = getState().user;
        if (!data) {
          dispatch(fetchUser(token));
        }
      } else {
        const { message } = await response.json();
        throw new Error(message);
      }
    } catch (error) {
      console.error(error.message);
      dispatch(userLogout());
    }
  }
};

export const fetchUser = slice.asyncAction;

export default slice.reducer;
