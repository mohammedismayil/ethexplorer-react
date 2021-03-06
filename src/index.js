import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Block from "./Pages/Block";
import TX from "./Pages/TX";
import Address from "./Pages/Address";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/block/:blockNumber" element={<Block />}></Route>
        <Route exact path="/tx/:txID" element={<TX />}></Route>
        <Route exact path="/address/:address" element={<Address />}></Route>
        <Route path="/" element={<App />}></Route>
      </Routes>
    </Router>
    ,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
