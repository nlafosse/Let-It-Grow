import React from "react";
import Main from "./components/Main";
import "./App.css";
import { Provider } from "./context/LoginContext";

function App() {
  return (
    <div>
      <Provider>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
