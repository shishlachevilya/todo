import React, {useState} from 'react';
import './redio.scss';

interface IRadio {
  bgColor: string
  isChecked: boolean
}

const Radio: React.FC<IRadio> = ({bgColor, isChecked}) => {
  const [check, setCheck] = useState(isChecked);

  return (
    <div className='radio'>
      <label>
        <input
          type='radio'
          name='color'
          onChange={() => setCheck(!check)}
          value={bgColor}
          checked={check}
        />
        <span style={{backgroundColor: bgColor}}/>
      </label>
    </div>
  );
};

export default Radio;
