import React, {Component} from 'react';
import List from '../List';
import {items, itemAdd, itemAll, colors} from '../../data';
import Radio from '../Radio';
import './app.scss';

type AppType = {}

class App extends Component<{}, AppType> {

  state = {

  };

  handlerOne = () => {
    console.log('handlerOne');
  };

  handlerTwo = () => {
    console.log('handlerTwo');
  };

  handlerTree = () => {
    console.log('handlerTree');
  };

  render() {
    console.log(colors);
    return (
      <div className='app'>
        <div className='app__sidebar'>
          <List clickHandler={this.handlerOne} items={itemAll} />

          <List clickHandler={this.handlerTwo} items={items} />

          <List clickHandler={this.handlerTree} items={itemAdd} />

          <div className='popup'>
            <form className='form'>
              <input className='form__field' type='text' placeholder='Название папки'/>

              <div className='form__group'>
                {colors.map((item: {id: string, color:string, isChecked: boolean}) => {
                  const {id, color, isChecked} = item;

                  return (
                    <Radio
                      key={id}
                      bgColor={color}
                      isChecked={isChecked}
                    />
                  )
                })}
              </div>

              <button className='form__btn' type='submit'>Добавить задачу</button>
            </form>
          </div>
        </div>

        <div className='app__tasks'>

        </div>
      </div>
    );
  }
}

export default App;
