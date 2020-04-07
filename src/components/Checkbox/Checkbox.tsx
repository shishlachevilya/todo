import React, {useState} from 'react';
import './checkbox.scss';
import Icon from "../Icon";

interface ICheckbox {
  id: string
  activeCategoryId: string
  text: string
  onCompletedTask: (id: string, taskId: string, completed: boolean) => void
  onEditTask: (activeCategoryId: string, taskObj: { id: string, text: string }) => void
  onRemoveTask: (id: string, activeCategoryId: string) => void
  completed: boolean
}

const Checkbox: React.FC<ICheckbox> = ({id, onCompletedTask, activeCategoryId, text, onEditTask, onRemoveTask, completed}) => {
  const [checked, setChecked] = useState(completed);

  const onChecked = (e: any) => {
    setChecked(!checked);
    onCompletedTask(activeCategoryId, id, e.target.checked);
  };

  return (
    <div id={id} className='checkbox'>
      <label>
        <input
          type='checkbox' onChange={(e) => onChecked(e)} checked={checked}/>
        <span></span>
        {text}
      </label>

      <button
        className='task__edit'
        onClick={() => onEditTask(activeCategoryId, {id, text})}
        style={{width: '20px', height: '20px'}}
      >
        <Icon
          viewBox='0 0 15 15'
          color='#ccc'
          path='M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z'/>
      </button>

      <button
        className='item__close'
        onClick={() => onRemoveTask(id, activeCategoryId)}
        style={{opacity: 1, width: '20px', height: '20px', marginLeft: '5px'}}
      >
        <Icon
          viewBox='0 0 15 15'
          color='#ccc'
          path='M8.75256 7.87207L13.7404 12.8599C14.2065 13.326 14.2065 14.0563 13.7404 14.5225C13.2742 14.9886 12.5439 14.9886 12.0778 14.5225L7.08997 9.53467L2.10217 14.5225C1.63603 14.9886 0.905726 14.9886 0.439577 14.5225C-0.0265714 14.0563 -0.0265714 13.326 0.439577 12.8599L5.42737 7.87207L0.439577 2.88428C-0.0265714 2.41813 -0.0265714 1.68783 0.439577 1.22168C0.905726 0.755533 1.63603 0.755533 2.10217 1.22168L7.08997 6.20947L12.0778 1.22168C12.5439 0.755533 13.2742 0.755533 13.7404 1.22168C14.2065 1.68783 14.2065 2.41813 13.7404 2.88428L8.75256 7.87207Z'/>
      </button>
    </div>
  );
};

export default Checkbox;
