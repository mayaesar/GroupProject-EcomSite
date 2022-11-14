import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { UserProvider } from "./components/UserContext";
import { UserActionProvider} from './components/UserActionContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <UserActionProvider>
        <App />
      </UserActionProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
