import React, {Component} from 'react';
import List from '../List';
import items from '../../data';
import './app.scss';

type AppType = {}

class App extends Component<{}, AppType> {

  state = {};

  render() {
    return (
      <div className='app'>
        <div className="app__sidebar">
          <List items={[{title: 'Все задачи', active: true}]}/>

          <List items={items}/>
        </div>

        <div className="app__tasks">

        </div>
      </div>
    );
  }
}

export default App;
