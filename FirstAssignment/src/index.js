import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const el = document.getElementById("root");
// Gjen elementin me id "root" ne DOM
const root = ReactDOM.createRoot(el);

root.render(<App />);
// Ben render komponentin kryesor te aplikacionit ne elementin me id "root"
