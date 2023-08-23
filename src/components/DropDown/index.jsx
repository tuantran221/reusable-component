import React from "react";
import searchIcon from "../../assets/icons/icons8-search-50.png";
import tickIcon from "../../assets/icons/icons8-tick-50.png"
import "../DropDown/DropDown.css";


const DropdownWrapper = ({
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
  isValid,
}) => {

  return (
    <div ref={dropdownRef} className="dropdown">
      <div className="dropdown__input">
        <div className="dropdown__input-item" onClick={handleOpenDropdown}>
          {inputDisplay()}
        </div>

        {isDropdownOpen && (
          <div className="dropdown__list-wrapper">
            {isSearchable && (
              <div className="dropdown__list-search">
                <input
                  onChange={onSearch}
                  value={searchValue}
                  ref={searchRef}
                />
              </div>
            )}
            {!isValid && isSearchable && (
              <div className="dropdown__list-wrapper__validation">
                <span>required</span>
              </div>
            )}
            {getValueSearch().map((value) => (
              <div
                className={`dropdown__list-item ${
                  selectedValues &&
                  selectedValues.find((val) => val.id === value.id)
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleSelected(value)}
                key={value.id}
              >
                {value.label}
                {selectedValues && selectedValues.find((val) => val.id === value.id) && (
                  <div className="dropdown__check-icon"><img src={tickIcon} alt="tick"/></div>
                )}
              
              </div>
            ))}
          </div>
        )}
        <div className="dropdown__search-icon">
          <img onClick={handleOpenDropdown} src={searchIcon} alt="searchIcon" />
        </div>
      </div>
    </div>
  );
};

export default DropdownWrapper;
