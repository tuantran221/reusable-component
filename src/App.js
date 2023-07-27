import "./App.css";
import React from "react";
import DropDown from "./ResuableComponents/DropDown";
function App() {
  // data user input
  const list = [
    { id: 1, label: "VietNam"},
    { id: 2, label: "Japan"},
    { id: 3, label: "USA"},
    { id: 4, label: "China" },
   
   
  ];

  return (
    <div className="App">
      <h2>Dropdown reusable</h2>

      {/* implemented API: value, multiple selection, placeholder, */}
      
      <DropDown values={list} isSearchable placeholder={"click to search here"}  />
    </div>
  );
}

export default App;
