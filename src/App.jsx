import React from "react";
import Home from "./pages/Home";

export default function App() {
  console.log("App component rendered");
  return (
    <div className="text-slate-100 antialiased">
      <Home />
    </div>
  );
}
