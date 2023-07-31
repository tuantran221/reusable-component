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
    { id: 5, label: "Korea" },
    { id: 6, label: "Laos" },
  ];

  return (
    <div className="App">
      <h2>Dropdown reusable</h2>
      <DropDownContainer
        values={list}
        multiple
        placeholder={"click to search item"}
        isSearchable
        // singleDefault="VietNam"
        multipleDefault={[
          { id: 2, label: "Japan" },
          { id: 3, label: "USA" },
        ]}
      />
    </div>
  );
}

export default App;
  