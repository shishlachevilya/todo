import React, { ChangeEvent, useEffect, useState } from 'react';
import Radio from '../Radio';
import axios from 'axios';

import './form.scss';


interface IForm {
  onSubmitHandler: (obj: { value: string, color: string }) => void
  isLoading: boolean
}

const Form: React.FC<IForm> = ({ onSubmitHandler, isLoading }) => {
  const [ fieldValue, setFieldValue ] = useState('');
  const [ colorValue, setColorValue ] = useState('');
  const [ colors, setColors ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/colors')
      .then(res => {
        setColors(res.data);
      });
  }, []);

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (!fieldValue) {
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
      onSubmit={ submitHandler }
      className='form'>
      <input
        className='form__field'
        type='text'
        onChange={ (e: ChangeEvent<HTMLInputElement>) => setFieldValue(e.target.value) }
        value={ fieldValue }
        placeholder='Название задачи'/>

      <div className='form__group'>
        { colors.map((item: { id: string, color: string, isChecked: boolean }) => {
          const { id, color, isChecked } = item;

          return (
            <Radio
              key={ id }
              id={ id }
              bgColor={ color }
              handler={ setColorValue }
              isChecked={ isChecked }
            />
          )
        }) }
      </div>

      <button
        className='form__btn'
        type='submit'
      >
        { isLoading ? 'Добавить задачу' : 'Добавление...' }
      </button>
    </form>
  );
};

export default Form;
