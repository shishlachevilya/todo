import React from 'react';

interface IIcon {
  viewBox: string
  color: string
  path: string
}

const Icon:React.FC<IIcon> = ({viewBox, color, path}) => {
  return (
    <svg
      width='14'
      height='14'
      viewBox={viewBox}
      fill={color}
      xmlns='http://www.w3.org/2000/svg'>
      <path d={path}/>
    </svg>
  );
};

export default Icon;
