import React from "react";
import DropDownContainer from "./utils/DropDownContainer";
import "./App.css"
function App() {
  // data user input
  const list = [
    { id: 1, label: "VietNam" },
    { id: 2, label: "Japan" },
    { id: 3, label: "USA" },
    { id: 4, label: "China" },
  ];

  return (
    <div className="App">
      <h2>Dropdown reusable</h2>
      <DropDownContainer
        values={list}
        multiple
        placeholder={"click to search item"}
        isSearchable
        initialValue
      />
    </div>
  );
}

export default App;
