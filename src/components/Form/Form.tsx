import React from 'react';
import Radio from '../Radio';
import {colors} from '../../data';
import './form.scss';


const Form:React.FC = () => {

  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <form
      onSubmit={submitHandler}
      className='form'>
      <input className='form__field' type='text' placeholder='Название задачи'/>

      <div className='form__group'>
        {colors.map((item: {id: string, color: string, isChecked: boolean}) => {
          const {id, color, isChecked} = item;

          return (
            <Radio
              key={id}
              bgColor={color}
              isChecked={isChecked}
            />
          )
        })}
      </div>

      <button className='form__btn' type='submit'>Добавить задачу</button>
    </form>
  );
};

export default Form;
