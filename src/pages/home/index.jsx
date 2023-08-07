import React from 'react'
import DropDown from "../../components/DropDown/DropDown"
const Home = () => {
    const list = [
        { id: 1, label: "VietNam" },
        { id: 2, label: "Japan" },
        { id: 3, label: "USA" },
        { id: 4, label: "China" },
        { id: 5, label: "Korea" },
        { id: 6, label: "Laos" },
    
      ];
    
  return (
    <div>
     <DropDown
        values={list}
        // multiple
        placeholder={"click to search item"}
        isSearchable
        // singleDefault="Japan"
        isValidation
        multipleDefault={[
          { id: 2, label: "Japan" },
          { id: 3, label: "USA" },
        ]}
      />
    </div>
  )
}

export default Home
