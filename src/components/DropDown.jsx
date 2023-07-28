import React, { useState, useRef, useEffect } from "react";
import searchIcon from "../assets/icons8-search-50.png";
import "../style/component_style/DropDown.css";
import {
  handleSelected,
  inputDisplay,
  getValueSearch,
} from "../utils/HandleFunction";

const Dropdown = ({ values, multiple, isSearchable, defaultValue }) => {
  // manage state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(multiple ? [] : null);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef();

  // ------------------------ block handle state function ---------------------------

  const handleOpenDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // handle search action function
  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // handle opendropdown in and outside
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

  // --------------------- view -------------------------
  return (
    <div ref={dropdownRef} className="dropdown-wrapper">
      <div className="dropdown-input-wrapper">
        <div className="dropdown-input" onClick={handleOpenDropdown}>
          {inputDisplay(multiple, selectedValues, setSelectedValues)}
        </div>

        {isDropdownOpen && (
          <div className="dropdown-list-wrapper">
            {isSearchable && (
              <div className="dropdown-search-wrapper">
                <input
                  onChange={onSearch}
                  value={searchValue}
                  ref={searchRef}
                  placeholder="enter to search here"
                />
              </div>
            )}
            {getValueSearch(searchValue, values).map((value) => (
              <div
                className={`dropdown-list-item ${
                  selectedValues && selectedValues.includes(value)
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleSelected(
                    value,
                    multiple,
                    selectedValues,
                    setSelectedValues
                  )
                }
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
