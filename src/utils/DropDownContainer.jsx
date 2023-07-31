import React, { useState, useRef, useEffect } from "react";
import Dropdown from "../components/DropDown";
import Chip from "../components/Chip";
const DropDownContainer = ({
  values,
  multiple,
  placeholder,
  isSearchable,
  initialValue,
}) => {
  // manage state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(multiple ? [] : null);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef();
  console.log("select", !selectedValues)

  // ----------------- handle function logic ----------------
  const handleOpenDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSearchValue("");
    if (isDropdownOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isDropdownOpen]);

  // handle selected action
  const handleSelected = (value) => {
    if (multiple) {
      if (selectedValues && selectedValues.includes(value)) {
        removeValue(value);
      } else {
        setSelectedValues([...selectedValues, value]);
      }
    } else {
      setSelectedValues([value]);

      if (selectedValues !== null && value.label === selectedValues[0].label) {
        setSelectedValues(null);
      }
    }
  };

  // handle close tag item
  const removeValue = (value) => {
    return setSelectedValues(selectedValues.filter((val) => val !== value));
  };

  // handle search action function
  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const getValueSearch = () => {
    if (!searchValue) {
      return values;
    }
    return values.filter(
      (val) => val.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };
  // handle close tag item
  const onTagRemove = (e, value) => {
    return setSelectedValues(selectedValues.filter((val) => val !== value));
  };

  // function display item in input
  const inputDisplay = () => {
   
    if (!selectedValues) {
      console.log("init")
      return placeholder;
    }
    if (multiple) {
      console.log("mul")
      return selectedValues.map((val) => (
        <Chip
          key={val.id}
          value={val.label}
          onClickClose={(e) => onTagRemove(e, val)}
        />
      ));
    }

    return selectedValues[0].label;
  };

  return (
    <Dropdown
      isDropdownOpen={isDropdownOpen}
      handleOpenDropdown={handleOpenDropdown}
      inputDisplay={inputDisplay}
      isSearchable={isSearchable}
      searchValue={searchValue}
      onSearch={onSearch}
      getValueSearch={getValueSearch}
      onTagRemove={onTagRemove}
      dropdownRef={dropdownRef}
      searchRef={searchRef}
      selectedValues={selectedValues}
      handleSelected={handleSelected}
    />
  );
};


export default DropDownContainer;
