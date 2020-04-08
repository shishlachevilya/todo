import React from 'react';
import Icon from '../Icon';
import Form from '../Form';
import Button from '../Button';
import './popup.scss';

interface IPopup {
  isLoading: boolean
  closePopup: () => void
  onSubmitHandler: (obj: { value: string, color: string }) => void
}

const Popup: React.FC<IPopup> = ({isLoading, closePopup, onSubmitHandler}) => {
  return (
    <div className='popup'>
      <Button
        type='button'
        className='button-icon button-icon_delete popup__button'
        onClick={closePopup}
      >
        <Icon
          viewBox='0 0 15 15'
          color='#000'
          path='M8.75256 7.87207L13.7404 12.8599C14.2065 13.326 14.2065 14.0563 13.7404 14.5225C13.2742 14.9886 12.5439 14.9886 12.0778 14.5225L7.08997 9.53467L2.10217 14.5225C1.63603 14.9886 0.905726 14.9886 0.439577 14.5225C-0.0265714 14.0563 -0.0265714 13.326 0.439577 12.8599L5.42737 7.87207L0.439577 2.88428C-0.0265714 2.41813 -0.0265714 1.68783 0.439577 1.22168C0.905726 0.755533 1.63603 0.755533 2.10217 1.22168L7.08997 6.20947L12.0778 1.22168C12.5439 0.755533 13.2742 0.755533 13.7404 1.22168C14.2065 1.68783 14.2065 2.41813 13.7404 2.88428L8.75256 7.87207Z'/>
      </Button>

      <Form
        onSubmitHandler={onSubmitHandler}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Popup;
