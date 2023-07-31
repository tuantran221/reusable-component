import React from 'react'
import closeIcon from "../assets/icons8-close-24.png"
import "../style/componentStyle/Chip.css"
const Chip = ({value, onClickClose}) => {
  return (
    <div className='tag-wrapper'>
      <div className='tag-wrapper-item'>
        {value}
        <span className='dropdown-tag-close'><img src={closeIcon} alt='closeIcon'  onClick={onClickClose}/></span>
      </div>
    </div>
  )
}

export default Chip
