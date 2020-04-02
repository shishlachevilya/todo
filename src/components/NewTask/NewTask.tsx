import React, {ChangeEvent, useState} from 'react';
import './new-task.scss';
import Icon from '../Icon';
import {ItemType, TaskType} from '../App/App';

interface INewTask {
  task: ItemType
  onToggleShowForm: () => void
  onAddNewTask: (id: string, newTask: TaskType) => void
  isShow: boolean
}

const NewTask: React.FC<INewTask> = ({
                                       task,
                                       onAddNewTask,
                                       onToggleShowForm,
                                       isShow
                                     }) => {
  const [inputValue, setInputValue] = useState('');

  const onSubmitHandler = (e: any) => {
    e.preventDefault();

    const newTask = {
      id: Date.now().toString(),
      itemId: task.id,
      text: inputValue,
      completed: false
    };

    onAddNewTask(task.id, newTask);
    setInputValue('');
  };

  return (
    <div className='new-task'>
      {isShow ?
        (
          <form className='form' onSubmit={onSubmitHandler}>
            <input
              className='form__field form__field_mb'
              type='text'
              value={inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              placeholder='Текст задачи'
              autoFocus={true}
            />

            <button className='form__btn form__btn_half' type='submit'>Добавить задачу</button>
            <button onClick={onToggleShowForm} className='form__btn form__btn_close'>Отмена</button>
          </form>
        ) :
        (
          <div className='new-task-btn' onClick={onToggleShowForm}>
            <div className='new-task__icon'>
              <Icon
                viewBox='0 0 70 70'
                color='black'
                path='M35 0C32.4565 0 30.3947 2.06187 30.3947 4.60526V30.3948H4.60526C2.06187 30.3948 0 32.4566 0 35.0001C0 37.5436 2.06187 39.6054 4.60526 39.6054H30.3947V65.3947C30.3947 67.9381 32.4565 70 35 70C37.5435 70 39.6053 67.9381 39.6053 65.3947V39.6054H65.3947C67.9381 39.6054 70 37.5436 70 35.0001C70 32.4566 67.9381 30.3948 65.3947 30.3948H39.6053V4.60526C39.6053 2.06187 37.5435 0 35 0V0Z'
              />
            </div>

            <h4 className='new-task__title'>Добавить задачу</h4>
          </div>
        )
      }
    </div>
  );
};

export default NewTask;
