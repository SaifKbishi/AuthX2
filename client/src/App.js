import React from "react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar/Navbar';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br/>           
            Stay Focused
        </header> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
