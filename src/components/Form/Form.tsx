import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios';
import Radio from '../Radio';
import Button from '../Button';
import './form.scss';

interface IForm {
  onSubmitHandler: (obj: { value: string, color: string }) => void
  isLoading: boolean
}

const Form: React.FC<IForm> = ({onSubmitHandler, isLoading}) => {
  const [fieldValue, setFieldValue] = useState('');
  const [colorValue, setColorValue] = useState('#c9d1d3');
  const [colors, setColors] = useState([]);

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
      onSubmit={submitHandler}
      className='form'>
      <input
        className='form__field'
        type='text'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue(e.target.value)}
        value={fieldValue}
        placeholder='Название категории'/>

      <div className='form__group'>
        {colors.map((item: { id: string, color: string, isChecked: boolean }) => {
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

      <Button
        className='button-add'
        type='submit'
      >
        {isLoading ? 'Добавить' : 'Добавление...'}
      </Button>
    </form>
  );
};

export default Form;
