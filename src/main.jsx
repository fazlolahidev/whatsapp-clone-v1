import { createRoot } from "react-dom/client";

//* Styles *//
import "./index.css";

//* Components *//
import App from "./App";

//* Router *//
import { BrowserRouter } from "react-router-dom";


const root = createRoot(document.getElementById("root"));
root.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
);
