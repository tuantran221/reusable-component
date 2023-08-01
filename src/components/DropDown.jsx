import React from "react";
import searchIcon from "../assets/icons8-search-50.png";
import "../style/componentStyle/DropDown.css";

const Dropdown = ({
  isDropdownOpen,
  handleOpenDropdown,
  inputDisplay,
  isSearchable,
  searchValue,
  onSearch,
  getValueSearch,
  dropdownRef,
  searchRef,
  selectedValues,
  handleSelected,
  isValid
}) => {
  

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
                <input
                  onChange={onSearch}
                  value={searchValue}
                  ref={searchRef}
                />
              </div>
            )}
            {
              !isValid && (
                <div className="dropdown-list-validation">
                  <span>required</span>
                </div>
              )
            }
            {getValueSearch().map((value) => (
              <div
                className={`dropdown-list-item ${
                  selectedValues && selectedValues.find((val) =>val.id === value.id)
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
