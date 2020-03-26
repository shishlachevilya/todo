import React from 'react';
import './redio.scss';

interface IRadio {
  bgColor: string
  isChecked: boolean
}

const Radio: React.FC<IRadio> = ({bgColor, isChecked}) => {

  return (
    <div className='radio'>
      <label>
        <input
          type='radio'
          name='color'
          value={bgColor}
          defaultChecked={isChecked}
        />
        <span style={{backgroundColor: bgColor}}/>
      </label>
    </div>
  );
};

export default Radio;
