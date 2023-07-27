import React, { useState, useRef, useEffect } from "react";
import searchIcon from "../assets/icons8-search-50.png";
import "./DropDown.css";
import Chip from "../components/Chip";

const Dropdown = ({ values, multiple, placeholder, isSearchable }) => {
  // manage state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(multiple ? [] : null);
  const [searchValue, setSearchValue] = useState("");

  // handle opendropdown in and outside
  const dropdownRef = useRef(null);
  const searchRef = useRef();

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
  // ----------------------------- block action -----------------------

  // handle selected action
  const handleSelected = (value) => {
    if (multiple) {
      if (selectedValues.includes(value)) {
        removeOption(value);
      } else {
        setSelectedValues([...selectedValues, value]);
      }
    } else {
      setSelectedValues([value]);
      // block need to fix
      if (selectedValues !== null && value.label === selectedValues[0].label) {
        setSelectedValues(null);
      }
    }
  };

  // handle close tag item
  const removeOption = (value) => {
    return setSelectedValues(selectedValues.filter((val) => val !== value));
  };
  const onTagRemove = (e, value) => {
    setSelectedValues(selectedValues.filter((val) => val !== value));
  };
// handle seach action function
  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const getValueSearch = () => {
    if (!searchValue) {
      return values;
    }
    return values.filter(
      (val) =>
        val.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };
  //  ------------------------------- block view input --------------------

  const inputDisplay = () => {
    if (!selectedValues) {
      return placeholder;
    }
    if (multiple) {
      return selectedValues.map((val) => (
        <Chip value={val.label} onClickClose={(e) => onTagRemove(e, val)} />
      ));
    }
    return selectedValues[0].label;
  };

  // --------------------- view -------------------------
  return (
    <div ref={dropdownRef} className="dropdown-wrapper">
      <div className="dropdown-input-wrapper">
        <div className="dropdown-input" onClick={handleOpenDropdown}>
          {inputDisplay()}
        </div>

        {isDropdownOpen && (
          <div className="dropdown-list-wrapper">
            {isSearchable && (
              <div className="dropdown-search-wrapper">
                <input  onChange={onSearch} value={searchValue} ref={searchRef}  />
              </div>
            )}
            {getValueSearch().map((value) => (
              <div
                className={`dropdown-list-item ${
                  selectedValues && selectedValues.includes(value)
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleSelected(value)}
                key={value.id}
              >
                {value.label}
              </div>
            ))}
          </div>
        )}
        <div className="dropdown-search-icon">
          <img onClick={handleOpenDropdown} src={searchIcon} alt="searchIcon" />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
