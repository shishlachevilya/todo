import React from 'react';
import './redio.scss';

interface IRadio {
  id: string
  bgColor: string
  isChecked: boolean
  handler(color: string): void
}

const Radio: React.FC<IRadio> = ({id,bgColor, isChecked,handler}) => {

  return (
    <div id={id} className='radio'>
      <label>
        <input
          type='radio'
          name='color'
          value={bgColor}
          onClick={() => handler(bgColor)}
          defaultChecked={isChecked}
        />
        <span style={{backgroundColor: bgColor}}/>
      </label>
    </div>
  );
};

export default Radio;
