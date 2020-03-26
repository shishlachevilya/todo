import React from 'react';
import Icon from '../Icon';
import './list.scss';
import classNames from 'classnames';

type ItemType = {
  icon: {
    path: string
    color: string
  }
  title: string
  active: boolean
}

interface IList {
  items: Array<ItemType>
  clickHandler: () => void
}

const List:React.FC<IList> = ({items, clickHandler}) => {

  return (
    <ul className='list'>
      {items.map((item, index) => {
        const {title, active, icon: {path, color}} = item;

        return (
          <li
            key={index}
            className={classNames('list__item item', {active: active})}
            onClick={clickHandler}
          >
            <div className="item__icon">
              <Icon
                viewBox='0 0 70 70'
                color={color}
                path={path}
              />
            </div>
            <span className='item__title'>{title}</span>
          </li>
        )
      })}
    </ul>
  );
};

export default List;
