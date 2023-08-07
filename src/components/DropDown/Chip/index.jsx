import React from 'react';
import closeIcon from '../../../assets/icons/icons8-close-24.png';
import './Chip.css';

const Chip = ({ value, onClickClose }) => {
  return (
    <div className='chip'>
      <div className='chip__item'>
        {value}
        <span className='chip__close'>
          <img className='chip__close-size' src={closeIcon} alt='closeIcon' onClick={onClickClose} />
        </span>
      </div>
    </div>
  );
};

export default Chip;
