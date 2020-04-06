import React from 'react';
import Icon from '../Icon';
import Checkbox from '../Checkbox';
import {ItemType, TaskType} from '../App/App';
import NewTask from "../NewTask";
import './task.scss';

import axios from 'axios';

interface ITask {
  match: any
  items: Array<ItemType>
  onChangeTitle: (title: string, id: string) => void
  onAddNewTask: (id: string, obj: TaskType) => void
}

const Tasks: React.FC<ITask> = ({match, items, onChangeTitle, onAddNewTask}) => {

  const data = match.params.id ? items.filter((item) => item.id === match.params.id) : items;

  const renderTasks = (tasks: Array<TaskType>) => {
    return tasks.map(({text, completed}, index) => {
      return (
        <li key={index} className="task-list__item">
          <Checkbox
            text={text}
            completed={completed}
          />
        </li>
      )
    })
  };

  const setNewTitle = (id: string, title: string) => {
    const newTitle = prompt('Новый заголовок', title);

    if (newTitle) {
      onChangeTitle(newTitle, id);
      axios.patch(`http://localhost:3001/items/${id}`, {
        title: newTitle
      }).catch(() => alert('Произошла ошибка!'));
    }
  };

  return (
    <div>
      {
        data.map((item) => {
          const {id, title, tasks, icon: {color}} = item;
          return (
            <div key={id} className='task'>
              <div className="task__title">
                <h1 style={{color: color}}>{title}</h1>
                <button
                  onClick={() => setNewTitle(id, title)}
                  className='task__edit'
                >
                  <Icon
                    viewBox='0 0 15 15'
                    color='#dfdfdf'
                    path='M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z'
                  />
                </button>
              </div>

              <ul className='task-list'>
                {tasks.length > 0 ? renderTasks(tasks) : 'нет задач'}
              </ul>

              <NewTask
                onAddNewTask={onAddNewTask}
                task={item}
              />
            </div>
          )
        })
      }
    </div>

    // <div className='task'>
    //   <div className="task__title">
    //     <h1 style={{color: color}}>{title}</h1>
    //     <button
    //       onClick={clickHandler}
    //       className='task__edit'
    //     >
    //       <Icon
    //         viewBox='0 0 15 15'
    //         color='#dfdfdf'
    //         path='M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z'
    //       />
    //     </button>
    //   </div>
    //
    //   <ul className='task-list'>
    //     {tasks.length > 0 ? renderTasks() : 'нет задач'}
    //   </ul>
    //

    // </div>
  );
};

export default Tasks;
