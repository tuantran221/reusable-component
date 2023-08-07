import React, { useState, useRef, useEffect } from "react";
import DropdownWrapper from "."
import Chip from "./Chip";

const Dropdown = ({
  values,
  multiple,
  placeholder,
  isSearchable,
  singleDefault,
  multipleDefault,
  isValidation,
}) => {
  //#region
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(multiple ? [] : null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredSearch, setFilteredSearch] = useState(values);
  const [isValid, setIsValid] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef();

  console.log(singleDefault);
  //#endregion

  //#region
  const handleOpenDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  //#endregion

  //#region
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
  //#endregion

  //#region
  useEffect(() => {
    if (multipleDefault) {
      setSelectedValues(multipleDefault);
    }
  }, [multipleDefault]);
//#endregion

  //#region 
  useEffect(() => {
    if (singleDefault) {
      // eslint-disable-next-line array-callback-return
      let id = values.filter((val) => {
        if (val.label === singleDefault) {
          return val.id;
        }
      });
      setSelectedValues([id[0]]);
    }
  }, [singleDefault, values]);
//#endregion

  //#region
  const handleSelected = (value) => {
    if (multiple || multipleDefault) {
      setSelectedValues((prevValues) =>
        prevValues.some((val) => val.id === value.id)
          ? prevValues.filter((val) => val.id !== value.id)
          : [...prevValues, value]
      );
      
    } 
    else {
      setSelectedValues([value]);
      if (selectedValues !== null && value.id === selectedValues[0].id) {
        setSelectedValues(null);
      }
    }
  };
  //#endregion

  //#region
  const removeValue = (value) => {
    setSelectedValues(selectedValues.filter((val) => val !== value));
  };
  const onTagRemove = (e, value) => {
    removeValue(value);
  };
  //#endregion

  //#region
  const onSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchValue(searchValue);
    const filtered = values.filter((val) =>
      val.label.toLowerCase().includes(searchValue)
    );
    setFilteredSearch(filtered);
    if (isValidation) {
      setIsValid(
        filtered.map((val) => val.label.toLowerCase().includes(searchValue))[0]
      );
    }
  };
  //#endregion
  //#region
  const getValueSearch = () => {
    if (!searchValue) {
      return values;
    }
    return filteredSearch;
  };
  //#endregion

  //#region
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
    return multipleDefault ? selectedValues.map((val) => val.label + " ") : selectedValues[0].label;
  };
  //#endregion

  return (
    <DropdownWrapper
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

export default Dropdown;
