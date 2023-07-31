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
}) => {
  // manage state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(multiple ? [] : null);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef();
  console.log("multidefault", multipleDefault);
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

  // handle search function
  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const getValueSearch = () => {
    if (!searchValue && singleDefault === null && multipleDefault === null) {
      return values;
    } else if (singleDefault != null && !searchValue) {
      // var initial = initialValue;
      return values.filter((val) => val.label !== singleDefault);
    }
    else if (multipleDefault != null && !searchValue){
      console.log("multiple filter")
      return values.filter((val) => !multipleDefault.some(defaultItem => defaultItem.label === val.label))
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
    if (!selectedValues && singleDefault != null) {
      return singleDefault;
    } else if (!selectedValues && singleDefault === null) {
      return placeholder;

    } 
 
    else if (multiple) {
      return selectedValues.map((val) => (
        <Chip
          key={val.id}
          value={val.label}
          onClickClose={(e) => onTagRemove(e, val)}
        />
      ));
    }
    return selectedValues && selectedValues[0].label;
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
