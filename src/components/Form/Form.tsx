import React, {ChangeEvent, useState} from 'react';
import Radio from '../Radio';
import {colors} from '../../data';
import './form.scss';


interface IForm {
  onSubmitHandler: (obj: {value: string, color: string}) => void
}


const Form: React.FC<IForm> = ({onSubmitHandler}) => {
  const [fieldValue, setFieldValue] = useState('');
  const [colorValue, setColorValue] = useState('');

  const submitHandler = (e: any) => {
    e.preventDefault();

    if(!fieldValue) {
      alert('Введите название задачи!!!');
      return;
    }

    setFieldValue('');

    const newObj = {
      value: fieldValue,
      color: colorValue
    };

    onSubmitHandler(newObj);
  };

  return (
    <form
      onSubmit={submitHandler}
      className='form'>
      <input
        className='form__field'
        type='text'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue(e.target.value)}
        value={fieldValue}
        placeholder='Название задачи'/>

      <div className='form__group'>
        {colors.map((item: {id: string, color: string, isChecked: boolean}) => {
          const {id, color, isChecked} = item;

          return (
            <Radio
              key={id}
              id={id}
              bgColor={color}
              handler={setColorValue}
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
