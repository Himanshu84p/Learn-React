import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Hero from "./components/Hero.jsx";

function App() {
  return (
    <>
      <Hero
        deviceName="Iphone"
        image="https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aXBob25lfGVufDB8fDB8fHww"
      />
      <Hero deviceName="Macbook" />
      <Hero deviceName="Ipad" />
    </>
  );
}

export default App;
