import React from 'react';
import './checkbox.scss';

interface ICheckbox {
  text: string
  completed: boolean
}

const Checkbox: React.FC<ICheckbox> = ({text, completed}) => {
  return (
    <div className='checkbox'>
      <label>
        <input
          type='checkbox' defaultChecked={completed}/>
        <span></span>
        {text}
      </label>
    </div>
  );
};

export default Checkbox;
