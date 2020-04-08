import React from 'react';
import classNames from 'classnames';
import './button.scss';

interface IButton {
  children: any
  type: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
  className?: string
}

const Button: React.FC<IButton> = ({children, type, onClick, className}) => {

  const onClickAction = () => {
    return onClick ? onClick() : null;
  };

  const classes = classNames(
    'button',
    className
  );

  return (
    <button
      type={type}
      className={classes}
      onClick={onClickAction}
    >
      {children}
    </button>
  );
};

export default Button;
