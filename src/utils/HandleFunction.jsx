import Chip from "../components/Chip";


export const handleSelected = (
  value,
  multiple,
  selectedValues,
  setSelectedValues,
) => {
  if (multiple) {
    if (selectedValues && selectedValues.includes(value)) {
      removeValue(value, selectedValues, setSelectedValues);

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

//   function remove tag function
export const removeValue = (value, selectedValues, setSelectedValues) => {
  return setSelectedValues(selectedValues.filter((val) => val !== value));
};


// function to display item input
export const inputDisplay = (multiple, selectedValues,setSelectedValues ) =>{
    if (multiple) {
        return selectedValues.map((val) => (
          <Chip
            key={val.id}
            value={val.label}
            onClickClose={(e) => removeValue(val, selectedValues,setSelectedValues)}
          />
        ));
      }
      if (!selectedValues) {
        return null;
      }
      return selectedValues[0].label;
}

// function get value in search input
export const getValueSearch = (searchValue, values) =>{
    if (!searchValue) {
        return values;
      }
      return values.filter(
        (val) => val.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
      );
}
