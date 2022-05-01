import createAsyncSlice from "./helper/createAsyncSlice";

const slice = createAsyncSlice({
  name: "feed",
  initialState: {
    data: [],
    pages: 0,
    infinite: true,
  },
  reducers: {
    fetchSuccess(state, { payload }) {
      state.loading = false;
      if (payload.length) {
        // verifica se o payload é uma repetição do anterior
        // causado pelo React.StrictMode
        const repeat = payload.every((item) =>
          state.data.find(({ id }) => item.id === id)
        );
        if (!repeat) {
          state.data.push(...payload);
          state.pages++;
        }
      } else state.infinite = false;
    },
    reset(state) {
      state.data = [];
      state.pages = 0;
      state.infinite = true;
    },
  },
  fetchConfig: ({ page, user }) => ({
    url: `https://dogsapi.origamid.dev/json/api/photo/?_page=${page}&_total=3&_user=${user}`,
    options: {
      method: "GET",
      cache: "no-store",
    },
  }),
});

export const fetchPhotos = slice.asyncAction;
export const { reset: resetFeed } = slice.actions;

export default slice.reducer;
