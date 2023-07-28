import "./App.css";
import React from "react";
import DropDown from "./screen/DropDown";
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

      {/* implemented API: value, multiple selection, placeholder, close-tag-item, search function*/}
      
      <DropDown values={list} defaultValue isSearchable multiple />
    </div>
  );
}

export default App;
