const items = [
  {
    icon: {
      path: 'M35 0C15.67 0 0 15.6703 0 35C0 54.3299 15.67 70 35 70C54.3299 70 70 54.3299 70 35C70 15.6703 54.33 0 35 0V0Z',
      color: '#42B883',
    },
    title: 'Покупки',
    active: false
  },
  {
    icon: {
      path: 'M35 0C15.67 0 0 15.6703 0 35C0 54.3299 15.67 70 35 70C54.3299 70 70 54.3299 70 35C70 15.6703 54.33 0 35 0V0Z',
      color: '#64C4ED',
    },
    title: 'Фронтенд',
    active: false
  },
  {
    icon: {
      path: 'M35 0C15.67 0 0 15.6703 0 35C0 54.3299 15.67 70 35 70C54.3299 70 70 54.3299 70 35C70 15.6703 54.33 0 35 0V0Z',
      color: '#FFBBCC',
    },
    title: 'Фильмы и сериалы',
    active: false
  },
  {
    icon: {
      path: 'M35 0C15.67 0 0 15.6703 0 35C0 54.3299 15.67 70 35 70C54.3299 70 70 54.3299 70 35C70 15.6703 54.33 0 35 0V0Z',
      color: '#B6E6BD',
    },
    title: 'Книги',
    active: false
  },
  {
    icon: {
      path: 'M35 0C15.67 0 0 15.6703 0 35C0 54.3299 15.67 70 35 70C54.3299 70 70 54.3299 70 35C70 15.6703 54.33 0 35 0V0Z',
      color: '#C9D1D3',
    },
    title: 'Личное',
    active: false
  },
];

const itemAll = [
  {
    icon: {
      path: 'M14 7.77778C14 12.0733 10.866 15.5556 7 15.5556C3.13401 15.5556 0 12.0733 0 7.77778C0 3.48223 3.13401 0 7 0C10.866 0 14 3.48223 14 7.77778ZM14 34.9949C14 39.2905 10.866 42.7727 7 42.7727C3.13401 42.7727 0 39.2905 0 34.9949C0 30.6994 3.13401 27.2171 7 27.2171C10.866 27.2171 14 30.6994 14 34.9949ZM7 69.9989C10.866 69.9989 14 66.5167 14 62.2212C14 57.9256 10.866 54.4434 7 54.4434C3.13401 54.4434 0 57.9256 0 62.2212C0 66.5167 3.13401 69.9989 7 69.9989ZM66.5 11.6646H28C27.0717 11.6646 26.1815 11.2548 25.5251 10.5255C24.8687 9.79623 24.5 8.80707 24.5 7.77567C24.5 6.74428 24.8687 5.75512 25.5251 5.02582C26.1815 4.29651 27.0717 3.88679 28 3.88679H66.5C67.4283 3.88679 68.3185 4.29651 68.9749 5.02582C69.6312 5.75512 70 6.74428 70 7.77567C70 8.80707 69.6312 9.79623 68.9749 10.5255C68.3185 11.2548 67.4283 11.6646 66.5 11.6646ZM66.5 31.1132H28C27.0717 31.1132 26.1815 31.5229 25.5251 32.2522C24.8687 32.9816 24.5 33.9707 24.5 35.0021C24.5 36.0335 24.8687 37.0227 25.5251 37.752C26.1815 38.4813 27.0717 38.891 28 38.891H66.5C67.4283 38.891 68.3185 38.4813 68.9749 37.752C69.6312 37.0227 70 36.0335 70 35.0021C70 33.9707 69.6312 32.9816 68.9749 32.2522C68.3185 31.5229 67.4283 31.1132 66.5 31.1132ZM28 58.3395H66.5C67.4283 58.3395 68.3185 58.7492 68.9749 59.4785C69.6312 60.2078 70 61.197 70 62.2284C70 63.2598 69.6312 64.2489 68.9749 64.9782C68.3185 65.7075 67.4283 66.1173 66.5 66.1173H28C27.0717 66.1173 26.1815 65.7075 25.5251 64.9782C24.8687 64.2489 24.5 63.2598 24.5 62.2284C24.5 61.197 24.8687 60.2078 25.5251 59.4785C26.1815 58.7492 27.0717 58.3395 28 58.3395Z',
      color: '#222',
    },
    title: 'Все задачи',
    active: true
  },
];

const itemAdd = [
  {
    icon: {
      path: 'M35 0C32.4565 0 30.3947 2.06187 30.3947 4.60526V30.3948H4.60526C2.06187 30.3948 0 32.4566 0 35.0001C0 37.5436 2.06187 39.6054 4.60526 39.6054H30.3947V65.3947C30.3947 67.9381 32.4565 70 35 70C37.5435 70 39.6053 67.9381 39.6053 65.3947V39.6054H65.3947C67.9381 39.6054 70 37.5436 70 35.0001C70 32.4566 67.9381 30.3948 65.3947 30.3948H39.6053V4.60526C39.6053 2.06187 37.5435 0 35 0V0Z',
      color: '#222',
    },
    title: 'Добавить задачу',
    active: false
  },
];

const colors = [
  {id: '1', color: '#C9D1D3', isChecked: true},
  {id: '2', color: '#42B883', isChecked: false},
  {id: '3', color: '#64C4ED', isChecked: false},
  {id: '4', color: '#FFBBCC', isChecked: false},
  {id: '5', color: '#B6E6BD', isChecked: false},
  {id: '6', color: '#C355F5', isChecked: false},
  {id: '7', color: '#5200ff', isChecked: false},
  {id: '8', color: '#FF6464', isChecked: false}
];

export {
  items,
  itemAll,
  itemAdd,
  colors
}
