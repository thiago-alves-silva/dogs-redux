import { PHOTO_GET } from "../api";
import createAsyncSlice from "./helper/createAsyncSlice";

const slice = createAsyncSlice({
  name: "photo",
  reducers: {
    addComment(state, action) {
      state.data.comments.push(action.payload);
    },
  },
  fetchConfig: (id) => PHOTO_GET(id),
});

export const { reset: resetPhoto, addComment } = slice.actions;
export const fetchPhoto = slice.asyncAction;
export default slice.reducer;
