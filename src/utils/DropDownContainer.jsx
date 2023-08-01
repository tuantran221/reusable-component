import React, { useState, useRef, useEffect } from "react";
import Dropdown from "../components/DropDown";
import Chip from "../components/Chip";

const DropDownContainer = ({
  values,
  multiple,
  placeholder,
  isSearchable,
  singleDefault,
  multipleDefault,
  isRequired,
}) => {
  // manage state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(multiple ? [] : null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredSearch, setFilteredSearch] = useState(values);
  const [isValid, setIsValid] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef();

  console.log("valid", isValid);
  // console.log("filteredSearch", filteredSearch)
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

  useEffect(() => {
    if (multipleDefault) {
      setSelectedValues(multipleDefault);
    }
  }, [multipleDefault]);

  // handle selected action
  const handleSelected = (value) => {
    if (multiple) {
      setSelectedValues((prevValues) =>
        prevValues.some((val) => val.id === value.id)
          ? prevValues.filter((val) => val.id !== value.id)
          : [...prevValues, value]
      );
    } else {
      setSelectedValues([value]);
      if (selectedValues !== null && value.label === selectedValues[0].label) {
        setSelectedValues(null);
      }
    }
  };
  // handle close tag item
  const removeValue = (value) => {
    setSelectedValues(selectedValues.filter((val) => val !== value));
  };

  // handle search function
  const onSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    console.log("current", searchValue);
    setSearchValue(searchValue);

    // Filter the values based on the search input
    const filtered = values.filter((val) =>
      val.label.toLowerCase().includes(searchValue)
    );
    setFilteredSearch(filtered);
    
    // function handle validate search function
    if (isRequired) {
      setIsValid(filtered.map((val) => val.label.toLowerCase().includes(searchValue))[0]);
      
    }
  };



  const getValueSearch = () => {
    if (!searchValue) {
      return values;
    }
    return filteredSearch;
  };

  // handle close tag item
  const onTagRemove = (e, value) => {
    removeValue(value);
  };

  // function display item in input
  const inputDisplay = () => {
    if (!selectedValues) {
      return singleDefault || placeholder;
    } else if (multiple) {
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
      isValid={isValid}
    />
  );
};

export default DropDownContainer;
