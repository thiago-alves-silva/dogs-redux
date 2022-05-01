import photo from "./photo";
import token from "./token";
import user from "./user";
import feed from "./feed";
import ui from "./ui";
const { configureStore, combineReducers } = require("@reduxjs/toolkit");

const reducer = combineReducers({ photo, token, user, feed, ui });
const store = configureStore({
  reducer,
  middleware: (middlewares) => [...middlewares()],
});

export default store;
