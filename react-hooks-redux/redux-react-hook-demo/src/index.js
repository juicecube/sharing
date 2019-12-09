import * as React from "react";
import { StoreContext } from "redux-react-hook";
import ReactDOM from "react-dom";
import { store } from "./store";
import Counter from "./Counter";

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Counter />
  </StoreContext.Provider>,
  document.getElementById("root")
);
