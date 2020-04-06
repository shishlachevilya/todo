import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import List from '../List';
import Tasks from '../Tasks';
import Popup from '../Popup';
import Title from '../Title';
import AddTask from '../AddTask';
import NotFound from "../NotFound";
import './app.scss';

export type TaskType = {
  id: string
  itemId: string
  text: string
  completed: boolean
}

type IconType = {
  path: string
  color: string
}

export type ItemType = {
  id: string
  title: string
  active: boolean
  icon: IconType
  tasks: Array<TaskType>
}

interface IApp {
  items: Array<ItemType>
  isLoading: boolean
  isVisible: boolean
}

class App extends Component<{}, IApp> {

  state = {
    items: [],
    isLoading: true,
    isVisible: false
  };

  componentDidMount() {
    axios.get('http://localhost:3001/db')
    .then(({data}: any) => {
      this.setState(() => {
        return {
          items: data.items
        }
      })
    });
  }

  onRemoveTask = (id: string) => {
    if (window.confirm('Удалить задачу?')) {
      axios.delete(`http://localhost:3001/items/${id}`)
      .then(() => {
        const filteredItems = this.state.items.filter((item: ItemType) => item.id !== id);
        this.setState({items: filteredItems})
      })
    }
  };

  onTogglePopup = () => {
    this.setState({isVisible: !this.state.isVisible})
  };

  onSubmitHandler = (obj: { value: string, color: string }) => {
    this.setState({isLoading: false});

    axios.post('http://localhost:3001/items', {
      icon: {
        path: 'M35 0C15.67 0 0 15.6703 0 35C0 54.3299 15.67 70 35 70C54.3299 70 70 54.3299 70 35C70 15.6703 54.33 0 35 0V0Z',
        color: obj.color,
      },
      title: obj.value,
      tasks: []
    })
    .then(({data}) => {
      const newItems = [
        ...this.state.items,
        data
      ];

      this.setState( {items: newItems});
    })
    .catch(() => {
      alert('Произошла ошибка');
    })
    .finally(() => {
      this.setState({isLoading: true});
    });
  };

  onChangeTitle = (title: string, itemId: string) => {
    const newItems = this.state.items.filter((item: ItemType) => {
      if (item.id === itemId) {
        item.title = title;
      }
      return item;
    });

    this.setState( {items: newItems})
  };

  onAddNewTask = (id: string, obj: TaskType) => {
    const newList = this.state.items.map((item: ItemType) => {
      if (item.id === obj.itemId) {
        item.tasks = [...item.tasks, obj];
      }

      return item;
    });

    const activeItem = this.state.items.find((item:ItemType) => item.id === id);

    axios.patch(`http://localhost:3001/items/${id}`, activeItem)
    .catch(() => {
      alert('Произошла ошибка!')
    });

    this.setState({items: newList});
  };

  render() {
    const {items, isVisible, isLoading} = this.state;

    return (
      <div className='app'>
        <div className='app__sidebar'>
          <Title/>

          <List
            clickRemoveHandler={this.onRemoveTask}
            items={items}
          />

          <AddTask
            clickHandler={this.onTogglePopup}
          />

          {isVisible && <Popup
            isLoading={isLoading}
            closePopup={this.onTogglePopup}
            onSubmitHandler={this.onSubmitHandler}
          />}
        </div>

        <div className='app__content'>
          <Switch>
            <Route exact path='/' render={({match}) =>
              <Tasks
                match={match}
                onChangeTitle={this.onChangeTitle}
                onAddNewTask={this.onAddNewTask}
                items={items}
              />
            }>
            </Route>

            <Route exact path='/task/:id' render={({match}) =>
              <Tasks
                match={match}
                onChangeTitle={this.onChangeTitle}
                onAddNewTask={this.onAddNewTask}
                items={items}
              />
            }>
            </Route>

            <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
