import React, { useEffect, useState } from 'react';
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  useEffect(() => {
    async function f(){
      console.log("running")
      await fetch("http://localhost:3001/api")
        .then((res) => res.json())
        .then((data) => setData(data.content));
      }
    f()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{data}</p>
      </header>
    </div>
  );
}

export default App;