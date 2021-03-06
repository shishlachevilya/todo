import React from 'react';
import axios from 'axios';
import {ItemType, TaskType} from '../App/App';
import Icon from '../Icon';
import Checkbox from '../Checkbox';
import NewTask from "../NewTask";
import './task.scss';
import {Link} from "react-router-dom";
import Button from "../Button";

interface ITask {
  match: any
  items: Array<ItemType>
  onCompletedTask: (id: string, taskId: string, completed: boolean) => void
  onEditTask: (activeCategoryId: string, taskObj: {id: string, text: string}) => void
  onRemoveTask: (taskId: string, activeCategoryId: string) => void
  onChangeTitle: (title: string, id: string) => void
  onAddNewTask: (id: string, obj: TaskType) => void
}

const Task: React.FC<ITask> = ({match, items, onCompletedTask, onEditTask, onRemoveTask, onChangeTitle, onAddNewTask}) => {

  const data = match.params.id ? items.filter((item) => item.id === match.params.id) : items;

  const renderTasks = (tasks: Array<TaskType>) => {
    return tasks.map(({id, text, itemId, completed}, index) => {
      return (
        <li key={index} className="task-list__item">
          <Checkbox
            id={id}
            text={text}
            activeCategoryId={itemId}
            onCompletedTask={onCompletedTask}
            onRemoveTask={onRemoveTask}
            onEditTask={onEditTask}
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
    <div className='task-wrap'>
      {
        data.map((item) => {
          const {id, title, tasks, icon: {color}} = item;
          return (
            <div key={id} className='task'>
              <div className="task__title">
                <Link to={`/task/${id}`} className='task__link'>
                  <h2 style={{color: color}}>{title}</h2>
                </Link>

                <Button
                  type='button'
                  className='button-icon button-icon_big button-icon_edit'
                  onClick={() => setNewTitle(id, title)}
                >
                  <Icon
                    viewBox='0 0 15 15'
                    color='#dfdfdf'
                    path='M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z'
                  />
                </Button>
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
  );
};

export default Task;
