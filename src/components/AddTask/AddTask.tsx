import React from 'react';
import Icon from '../Icon';

interface IAddTask {
  clickHandler: () => void
}

const AddTask:React.FC<IAddTask> = ({clickHandler}) => {
  return (
    <div
      className='title'
      onClick={clickHandler}
    >
      <div className='title__icon'>
        <Icon
          viewBox='0 0 70 70'
          color='#222'
          path='M35 0C32.4565 0 30.3947 2.06187 30.3947 4.60526V30.3948H4.60526C2.06187 30.3948 0 32.4566 0 35.0001C0 37.5436 2.06187 39.6054 4.60526 39.6054H30.3947V65.3947C30.3947 67.9381 32.4565 70 35 70C37.5435 70 39.6053 67.9381 39.6053 65.3947V39.6054H65.3947C67.9381 39.6054 70 37.5436 70 35.0001C70 32.4566 67.9381 30.3948 65.3947 30.3948H39.6053V4.60526C39.6053 2.06187 37.5435 0 35 0V0Z'
        />
      </div>
      <h4 className='title__text'>Добавить задачу</h4>
    </div>
  );
};

export default AddTask;
